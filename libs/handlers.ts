import { IMessage, IBot } from "../@types/types.js";
import { ICommands } from "../@types/commands.js";
import { Language } from "./lang/language.js";
import { stringFormat } from "./text.js";

export class CommandHandler {

    private commands: ICommands[] = [];

    public register(...commands: ICommands[]) {
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
        return "";
    }

    public getCommandsMenu(bot: IBot) {
        const lang = new Language(bot).get();
        let text = `--==${bot.name}==--\n\n${lang.commands}:\n\n`;
        for (let c of this.commands) {
            text += `${c.category}:\n`;
            for (let com of c.commands) {
                text += "-|" + com.name + "\n";
            }
            text += "\n"
        }

        return text.trim();
    }

    public getCommandsByCategory(bot: IBot, category: string) {
        /**
         * TODO: Create function body
         */
    }

    public getHelp(bot: IBot, command: string | undefined) {
        return (command == undefined || command.trim() == "") ?
            this.getCommandsMenu(bot) :
            this.getCommandDescription(bot, command);
    }
}
