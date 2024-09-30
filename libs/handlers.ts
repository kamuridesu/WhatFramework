import { IMessage, IBot } from "../@types/types.js";
import { ICommands } from "../@types/commands.js";
import { Language } from "./lang/language.js";
import { stringFormat } from "./text.js";

export class CommandHandler {

    private commands: ICommands[] = [];

    public register(...commands: ICommands[]) {
        const allCommands: string[] = [];
        commands
            .flatMap(command => command.commands)
            .forEach(cmd => {
                [...cmd.aliases, cmd.name].forEach(aliasOrName => {
                    if (allCommands.includes(aliasOrName)) {
                        throw new Error("Alias or command already exists!");
                    }
                    allCommands.push(aliasOrName);
                });
            });
        this.commands = this.commands.concat(commands);
    }

    public handle(command: string, bot: IBot, message: IMessage, args: string[]) {
        for (let c of this.commands) {
            const func = c.commands.filter(com => (com.name == command || com.aliases.includes(command)))[0];
            if (func) return func.func(bot, message, args);
        }
    }

    public getCommandDescription(bot: IBot, command: string) {
        for (let c of this.commands) {
            for (let com of c.commands) {
                if (com.name === command || com.aliases.includes(command)) {
                    const text = stringFormat(com.description, { prefix: bot.prefix, command: command });
                    return `${command}\n\n${text}` + (com.aliases.length > 0 ?
                        `\n\n[Aliases]:\n${com.aliases.join("\n")}` :
                        "");
                }
            }
        }
        return new Language(bot).get().commandNotFoundError;
    }

    public getCommandsMenu(bot: IBot) {
        const lang = new Language(bot).get();
        let text = `--==${bot.name}==--\n\n${lang.commands}:\n\n`;
        for (let c of this.commands) {
            text += `${c.category}:\n`;
            for (let com of c.commands) {
                text += "/" + com.name + "\n";
            }
            text += "\n"
        }

        return text.trim();
    }

    public getCommandsByCategory(bot: IBot, category: string) {
        const filtered = this.commands.find(c => c.category = category);
        if (!filtered) {
            return null;
        }
        const lang = new Language(bot).get();
        let text = `--=={${bot.name}}==--\n\n${lang.category}: ${filtered.category}:\n\n`;
        for (let c of filtered.commands) {
            text += "/" + c.name + "\n";
        }
        return text.trim();

    }

    public getHelp(bot: IBot, command: string | undefined) {
        return (command == undefined ||
            command.trim() == "" || this.commands
                .find(c => c.commands
                    .find(s => s.aliases.includes(command) ||
                        s.name == command) == undefined) == undefined) ?
            this.getCommandsMenu(bot) :
            this.commands.find(c => c.category == command) ?
                this.getCommandsByCategory(bot, command) :
                this.getCommandDescription(bot, command);
    }
}
