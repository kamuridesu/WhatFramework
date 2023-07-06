class ChatMetadata {
    constructor(
        public messageSender: string,
        public senderName: string,
        public messageIsFrom: string,
        public senderIsBotOwner: boolean,
        public chatIsGroup: boolean
    ) { }
}

export { ChatMetadata };
