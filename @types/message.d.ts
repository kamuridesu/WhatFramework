import { WAMessage, proto } from "@whiskeysockets/baileys";
import { IBot } from "./bot";

import { GroupParticipant } from "@whiskeysockets/baileys";

export interface Media {
    media: Buffer;
    messageType: string;
    mimeType: string;
    caption?: string;
    error?: Error;
}

export interface IQuotedMessageUnparsed {
    stanzaId: string;
    participant: string;
    message: {
        conversation: string;
    }
}

export interface IQuotedMessageParsed {
    stanzaId: string;
    author: IAuthor;
    body: string;
}

export interface IGroup {
    name: Promise<string>;
    description: Promise<string | undefined>;
    groupId: Promise<string>;
    members: Promise<GroupParticipant[]>;
    admins: Promise<GroupParticipant[]>;
    locked: Promise<boolean>;
    botIsAdmin?: Promise<boolean>;
}

export interface IAuthor {
    jid: string;
    name: string;
    chatJid: string;
    isAdmin: Promise<boolean>;
    isBotOwner: boolean;
    isGroupOwner: Promise<boolean>;
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
    chatIsGroup: boolean;
    isMedia: boolean;
    hasQuotedMessage: boolean;
    quotedMessageType: any;
    quotedMessage: IMessage | undefined | IQuotedMessageParsed;
    isReactionMessage: boolean;
    reactionMessage: any;

    reply(text?: string, media?: Media, options?: {}): Promise<IMessage | undefined>;

    react(reaction: string, options?: {}): Promise<IMessage | undefined>;

    edit(text: string, options?: {}): Promise<IMessage | undefined>;

    downloadMedia(): Promise<Media>;
}

export interface IReactionMessage {
    react: {
        text: string;
        key: proto.IMessageKey
    }

}
