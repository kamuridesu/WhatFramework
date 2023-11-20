import {
    IBot,
    IMessage,
} from "./types.js";

export interface ICommand {
    name: string;
    aliases: string[];
    func: (
        bot: IBot,
        message: IMessage,
        args: string[]) => Promise<void> | void;
    description: string;
}

export interface ICommands {
    category: string;
    commands: ICommand[]
}
