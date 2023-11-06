import { WAMessage } from "@whiskeysockets/baileys";
import { IBot, Media, IMessage } from "../@types/types.js";

class MessageData implements IMessage {
    constructor(
        public bot: IBot,
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
    ) {
        this.bot = bot;
        this.originalMessage = originalMessage;
        this.type = type;
        this.body = body;
        this.mentionedUsers = mentionedUsers;
        this.origin = origin;
        this.isMedia = isMedia;
        this.hasQuotedMessage = hasQuotedMessage;
        this.quotedMessage = quotedMessage;
        this.quotedMessageType = quotedMessageType;
        this.isReactionMessage = isReactionMessage;
        this.reactionMessage = reactionMessage
    }

    async replyText(text: string, options: {}): Promise<void> {
        this.bot.replyText(this, text, options);
    }

    async replyMedia(media: string | Media, messageType: string, mimeType?: string | undefined, mediaCaption?: string | undefined, options?: any): Promise<void> {
        this.bot.replyMedia(this, media, messageType, mimeType, mediaCaption, options);
    }
}

export { MessageData };
