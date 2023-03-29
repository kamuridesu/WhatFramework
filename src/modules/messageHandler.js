import { checkChatMetaData, checkGroupData, checkMessageData } from "../funcs/messageParsers.js";

/**
    * A class for handling incoming messages in a chat.
    @param {Object} entrypoint - The entrypoint object containing the commandHandlers and chatHandlers functions.
    @prop {Boolean} isModule - Indicates whether the message handler is initialized with an entrypoint object.
    @prop {Function} commandHandlers - The function that handles commands.
    @prop {Function} chatHandlers - The function that handles chat messages.
*/
class MessageHandler {
    constructor(entrypoint) {
        this.isModule = false;
        if (entrypoint) {
            this.isModule = true;
            this.commandHandlers = entrypoint.commandHandlers;
            this.chatHandlers = entrypoint.chatHandlers;
        }
    }

    /**
     * Send a message to the target.
     * @param {Object} message received message
     * @param {Bot} ctx Bot instance to send messages
    */
    async handle(message, ctx) {
        if (!message.message ||
            message.key && message.key.remoteJid === 'status@broadcast' ||
            message.key.id.startsWith('BAE5') && message.key.id.length === 16) return

        message.message = (Object.keys(message.message)[0] === 'ephemeralMessage') ? message.message.ephemeralMessage.message : message.message
        const messageData = checkMessageData(message);

        const messageMetadata = checkChatMetaData(messageData, ctx);
        let groupData = undefined;
        if (messageMetadata.chatIsGroup) {
            groupData = await checkGroupData(messageData, messageMetadata, ctx);
        }

        if (this.isModule) {
            if (messageData.body.startsWith("/")) {
                return await this.commandHandlers(ctx, messageData.body, messageData, groupData, messageMetadata);
            }
            return await this.chatHandlers(ctx, messageData.body, messageData, groupData, messageMetadata);
        }
    }
}

export {
    MessageHandler
};
