import { Bot } from "./bot.js";
import { MessageData } from "./messageData.js";
import { GroupData } from "./groupData.js";
import { ChatMetadata } from "./chatMetadata.js";


class Entrypoint {
    prefix?: string;
    ownerNumber?: string;
    botNumber?: string;
    commandsFilename?: string;
    botName?: string;
    language?: string;

    constructor(){}

    async chatHandlers(bot: Bot, message: string, context: MessageData, group: GroupData, metadata: ChatMetadata) {
    }

    async commandHandlers(bot: Bot, command: string, args: string[], context: MessageData, group: GroupData, metadata: ChatMetadata) {
    }
}

export {
    Entrypoint
};
