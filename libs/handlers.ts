import { IMessage, IBot, IChatMetadata, IGroupData } from "../@types/types.js";
import { ICommands } from "../@types/commands.js";
import Translations from "./lang/interface.js";
import { Language } from "./lang/language.js";
import { stringFormat } from "./text.js";


export class CommandHandler {

    private commands: ICommands[] = [];
    private bot: IBot;
    private lang: Translations;

    public constructor(bot: IBot) {
        this.bot = bot;
        this.lang = new Language(bot).get();
    }

    public register(...commands: ICommands[]) {
        this.commands = this.commands.concat(commands);
    }

    public handle(command: string, bot: IBot, message: IMessage, args: string[], group: IGroupData, chat: IChatMetadata) {
        for (let c of this.commands) {
            const func = c.commands.filter(com => (com.name == command || com.aliases.includes(command)))[0];
            if (func != undefined) {
                func.func(bot, message, args, group, chat);
                return true;
            }  
        }
    }

    public getCommandDescription(command: string) {
        for (let c of this.commands) {
            for (let com of c.commands) {
                if (com.name === command || com.aliases.includes(command)) {
                    return stringFormat(com.description, {prefix: this.bot.prefix, command: command});
                }
            }
        }
        return "";
    }

    public getCommandsMenu() {
        let text = `--==${this.bot.name}==--\n\n${this.lang.commands}:\n\n`;
        for (let c of this.commands) {
            text += `${c.category}:\n`;
            for (let com of c.commands) {
                text += "-|" + com.name + "\n";
            }
            text += "\n"
        }

        return text.trim();
    }

    public getHelp(command: string | undefined) {
        return (command == undefined || command.trim() == "") ? this.getCommandsMenu() : this.getCommandDescription(command);
    }

}
