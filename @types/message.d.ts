import { WAMessage } from "@whiskeysockets/baileys";
import { IBot, Media } from "./bot";

export interface IMetadata {
    messageSender: string,
    senderName: string,
    messageIsFrom: string,
    senderIsBotOwner: boolean,
    chatIsGroup: boolean
}

export interface IGroup {
    name: string,
    description: string,
    groupId: string,
    members: Array<any>,
    admins: Array<any>,
    locked: boolean,
    welcomeOn?: boolean
}

export interface Author {
    jid: string;
    isAdmin: boolean;
    isBotOwner: boolean;
    isGroupOwner: boolean;
    isBot: boolean;
}

export interface IMessage {
    bot: IBot;
    originalMessage: WAMessage;
    type: string;
    body: string;
    mentionedUsers: string[];
    author: Author;
    group: IGroup;
    metadata: IMetadata
    isMedia: boolean;
    hasQuotedMessage: boolean;
    quotedMessageType: any;
    quotedMessage: any;
    isReactionMessage: boolean;
    reactionMessage: any;

    replyText(text: string, options?: {}): Promise<IMessage | undefined>;

    replyMedia(
        media: string | Media,
        messageType: string,
        mimeType?: string | undefined,
        mediaCaption?: string | undefined,
        options?: {}): Promise<IMessage | undefined>;
}

