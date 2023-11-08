import { WAMessage } from "@whiskeysockets/baileys";
import { IBot, Media } from "./bot";

interface IMessage {
    bot: IBot,
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

    replyText(text: string, options: {}): Promise<IMessage | undefined>;

    replyMedia(media: string | Media, messageType: string, mimeType?: string | undefined, mediaCaption?: string | undefined, options?: any): Promise<IMessage | undefined>;
}

export { IMessage };
