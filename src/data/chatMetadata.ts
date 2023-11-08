import { IChatMetadata } from "../../@types/types.js";

export class ChatMetadata implements IChatMetadata {
    constructor(
        public messageSender: string,
        public senderName: string,
        public messageIsFrom: string,
        public senderIsBotOwner: boolean,
        public chatIsGroup: boolean
    ) { }
}
