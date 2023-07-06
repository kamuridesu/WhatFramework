import { WAMessage } from "@whiskeysockets/baileys";

class MessageData {
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
