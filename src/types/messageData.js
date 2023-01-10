/**
 * Class to hold the message information
 */
class MessageData {
    /**
     * @param {Object} originalMessage original message for context
     * @param {string} type type of the message
     * @param {string} body body of the message
     * @param {Array<string>} mentionedUsers users mentioned the message
     * @param {string} origin sender jid
     * @param {boolean} isMedia message is media
     * @param {boolean} hasQuotedMessage message is quoting message
     * @param {string} quotedMessageType if hasQuotedMessage, is quoting what
     * @param {boolean} isReactionMessage the message is a reaction message
     * @param {*} reactionMessage reactin to the message
     */
    constructor(originalMessage, type, body, mentionedUsers, origin, isMedia, hasQuotedMessage, quotedMessageType, isReactionMessage, reactionMessage) {
        this.originalMessage = originalMessage;
        this.type = type;
        this.body = body;
        this.mentionedUsers = mentionedUsers;
        this.origin = origin;
        this.isMedia = isMedia;
        this.hasQuotedMessage = hasQuotedMessage;
        this.quotedMessageType = quotedMessageType;
        this.isReactionMessage = isReactionMessage;
        this.reactionMessage = reactionMessage;
    }
}

export {
    MessageData
};