import { IChatMetadata } from "src/@types/types.js";

class ChatMetadata implements IChatMetadata {
    constructor(
        public messageSender: string,
        public senderName: string,
        public messageIsFrom: string,
        public senderIsBotOwner: boolean,
        public chatIsGroup: boolean
    ) { }
}

export { ChatMetadata };
