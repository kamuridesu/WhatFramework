import { WAMessage, proto } from "@whiskeysockets/baileys";
import { IBot, Media } from "./bot";

import { GroupParticipant } from "@whiskeysockets/baileys";

export interface IQuotedMessageUnparsed {
    stanzaId: string;
    participant: string;
    message: {
        conversation: string;
    }
}

export interface IGroup {
    name: string;
    description: string;
    groupId: string;
    members: GroupParticipant[];
    admins: GroupParticipant[];
    locked: boolean;
    botIsAdmin?: boolean;
    welcomeOn?: boolean;
}

export interface IAuthor {
    jid: string;
    name: string;
    chatJid: string;
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
    author: IAuthor;
    group?: IGroup;
    messageSender: string;
    senderName: string;
    messageIsFrom: string;
    senderIsBotOwner: boolean;
    chatIsGroup: boolean;
    isMedia: boolean;
    hasQuotedMessage: boolean;
    quotedMessageType: any;
    quotedMessage: IMessage | undefined;
    isReactionMessage: boolean;
    reactionMessage: any;

    replyText(text: string, options?: {}): Promise<IMessage | undefined>;

    replyMedia(
        media: string | Media,
        messageType: string,
        mimeType?: string | undefined,
        mediaCaption?: string | undefined,
        options?: {}): Promise<IMessage | undefined>;

    react(reaction: string, options?: {}): Promise<IMessage | undefined>;

    edit(text: string, options?: {}): Promise<IMessage | undefined>;
}

export interface IReactionMessage {
    react: {
        text: string;
        key: proto.IMessageKey
    }
    
}
