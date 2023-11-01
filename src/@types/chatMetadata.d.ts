interface IChatMetadata {
    messageSender: string,
    senderName: string,
    messageIsFrom: string,
    senderIsBotOwner: boolean,
    chatIsGroup: boolean
}

export { IChatMetadata };
