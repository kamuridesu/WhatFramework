import {
    IBot,
    IMessage,
    IGroupData,
    IChatMetadata
} from "./types.js";

interface ICommand {
    name: string;
    aliases: string[];
    func: (
        bot: IBot,
        message: IMessage,
        args: string[],
        group: IGroupData,
        chat: IChatMetadata) => Promise<void>;
    description: string;
}


interface ICommands {
    category: string;
    commands: ICommand[]
}
