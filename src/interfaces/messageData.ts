import { WAMessage } from "@whiskeysockets/baileys";
import { Bot, Media } from "../interfaces/bot";

interface IMessageData {
    bot: Bot,
    originalMessage: WAMessage,
    type: string,
    body: string,
    mentionedUsers: string[],
    origin: string,
    isMedia: boolean,
    hasQuotedMessage: boolean,
    quotedMessageType: any,
    quotedMessage: any,
    isReactionMessage: boolean,
    reactionMessage: any,

    replyText(text: string, options: {}): Promise<void>;

    replyMedia(media: string | Media, messageType: string, mimeType?: string | undefined, mediaCaption?: string | undefined, options?: any): Promise<void>;
}

export { IMessageData };
