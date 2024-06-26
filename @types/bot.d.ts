import { GroupMetadata, makeWASocket, proto } from "@whiskeysockets/baileys";
import { WAMessage, WAMessageKey } from "@whiskeysockets/baileys";
import { IMessage, IReactionMessage } from "./message.js";
import { IGroup } from './types.js';
import Translations from "../libs/lang/interface.js";


interface GroupsData {
    [groupId: string]: {
        lastFetchDate: number;
        groupData: IGroup
    }
}

export interface Media {
    media: Buffer | string;
    messageType: string;
    mimeType: string;
    error: Error | undefined;
}

export interface EntryPoint {
    botName: string;
    prefix: string;
    ownerNumber: string;
    language: string | undefined;
    commandHandlers: (ctx: IBot,
        command: string,
        args: string[],
        messageData: IMessage) => void;
    chatHandlers: (ctx: IBot,
        messageBody: string,
        messageData: IMessage) => void;
}

export interface Module {
    Entrypoint: EntryPoint
}

export interface IMessageHandler {
    handle: (message: WAMessage, bot: IBot) => Promise<void>
    handleUpdate: (key: WAMessageKey, updates: Partial<WAMessage>, ctx: IBot) => Promise<void>
}

export interface IBot {
    connection?: ReturnType<typeof makeWASocket>;

    readonly name: string;
    readonly prefix: string;
    botNumber?: string;
    readonly ownerNumber: string;
    readonly language: string;
    readonly lang: Translations;
    reconnectOnClose: boolean;
    groupsData: GroupsData // This is for caching purpose

    init(messageHandler: IMessageHandler): Promise<void>;

    getMessage(key: proto.IMessageKey): Promise<proto.IMessage | undefined>

    replyText(ctx: IMessage, text: string, options: any): Promise<IMessage | undefined>;
    replyMedia(
        ctx: IMessage,
        media: string | Media,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options?: any
    ): Promise<IMessage | undefined>;

    sendTextMessage(ctx: IMessage | string, text: string, options?: {}): Promise<IMessage | undefined>;
    reactMessage(ctx: IMessage | string, reactionMessage: IReactionMessage, options?: any): Promise<IMessage | undefined>
    getGroups(): Promise<{
        [_: string]: GroupMetadata;
    } | undefined>

    loadMessage(ctx: IMessage | WAMessageKey): Promise<IMessage | WAMessage | undefined>;
    loadMessageById(originJid: string, stanzaId: string): Promise<proto.IWebMessageInfo | undefined>;
    createPoll(ctx: IMessage, poolName: string, options: Array<string>): Promise<boolean>;
}
