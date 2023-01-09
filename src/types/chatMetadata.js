/**
 * Class to store chat metadata
 */
class ChatMetadata {
    /**
     * @param {string} messageSender id of who sent the message
     * @param {string} senderName name of who sent the message
     * @param {string} messageIsFrom chat id from who sent
     * @param {boolean} senderIsBotOwner who sent the message is the owner of the bot?
     * @param {boolean} chatIsGroup the chat is a group?
     */
    constructor(messageSender, senderName, messageIsFrom, senderIsBotOwner, chatIsGroup) {
        this.messageSender = messageSender;
        this.senderName = senderName;
        this.messageIsFrom = messageIsFrom;
        this.senderIsBotOwner = senderIsBotOwner;
        this.chatIsGroup = chatIsGroup;
    }
}

export {
    ChatMetadata
}