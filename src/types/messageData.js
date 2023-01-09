/**
 * Class to hold the message information
 */
class MessageData {
    /**
     * @param {Object} originalMessage original message for context
     * @param {string} type type of the message
     * @param {string} body body of the message
     * @param {string} origin sender jid
     * @param {boolean} isMedia message is media
     * @param {boolean} hasQuotedMessage message is quoting message
     * @param {string} quotedMessageType if hasQuotedMessage, is quoting what
     */
    constructor(originalMessage, type, body, origin, isMedia, hasQuotedMessage, quotedMessageType) {
        this.originalMessage = originalMessage;
        this.type = type;
        this.body = body;
        this.origin = origin;
        this.isMedia = isMedia;
        this.hasQuotedMessage = hasQuotedMessage;
        this.quotedMessageType = quotedMessageType;
    }
}

export {
    MessageData
}