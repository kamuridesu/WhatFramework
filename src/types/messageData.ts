import { WAMessage } from "@adiwajshing/baileys";

/**
 * Class to hold the message information
 */
class MessageData {
    /**
     * @param {WAMessage} originalMessage original message for context
     * @param {string} type type of the message
     * @param {string} body body of the message
     * @param {Array<string>} mentionedUsers users mentioned the message
     * @param {string} origin sender jid
     * @param {boolean} isMedia message is media
     * @param {boolean} hasQuotedMessage message is quoting message
     * @param {string} quotedMessageType if hasQuotedMessage, is quoting what
     * @param {any} quotedMessage
     * @param {boolean} isReactionMessage the message is a reaction message
     * @param {*} reactionMessage reactin to the message
     */
    constructor(
        public originalMessage: WAMessage,
        public type: string,
        public body: string,
        public mentionedUsers: string[],
        public origin: string,
        public isMedia: boolean,
        public hasQuotedMessage: boolean,
        public quotedMessageType: any,
        public quotedMessage: any,
        public isReactionMessage: boolean,
        public reactionMessage: any,
    ) {}
}

export { MessageData };
