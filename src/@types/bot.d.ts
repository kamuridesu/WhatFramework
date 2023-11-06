import { makeWASocket, proto } from "@whiskeysockets/baileys";
import { WAMessage, WAMessageKey } from "@whiskeysockets/baileys";
import { IMessage } from "./message.js";
import { Language } from "../../libs/lang/language.js";
import { GroupData } from '../data/groupData.js';
import { ChatMetadata } from "../data/chatMetadata.js";


interface GroupsData {
    [groupId: string]: {
        lastFetchDate: number;
        groupData: GroupData
    }
}

interface Media {
    media: Buffer | string;
    messageType: string;
    mimeType: string;
    error: Error;
}

interface EntryPoint {
    botName: string;
    prefix: string;
    botNumber: string;
    ownerNumber: string;
    language: string | undefined;
    commandsFilename: string | undefined;
    commandHandlers: (ctx: IBot,
        command: string,
        args: string[],
        messageData: IMessage,
        groupData: GroupData | undefined,
        chatMetadata: ChatMetadata) => void;
    chatHandlers: (ctx: IBot,
        messageBody: string,
        messageData: IMessage,
        groupData: GroupData | undefined,
        chatMetadata: ChatMetadata) => void;
}

interface Module {
    Entrypoint: EntryPoint
}

interface IMessageHandler {
    handle: (message: WAMessage, bot: IBot) => void
    handleUpdate: (key: WAMessageKey, updates: Partial<WAMessage>, ctx: IBot) => void
}

interface IBot {
    connection?: ReturnType<typeof makeWASocket>;

    readonly name: string;
    readonly prefix: string;
    readonly botNumber: string;
    readonly ownerNumber: string;
    readonly commandsFilename: string;
    readonly language: string;
    readonly lang: Language;
    reconnectOnClose: boolean;
    groupsData: GroupsData // This is for caching purpose

    init(messageHandler: IMessageHandler): Promise<void>;

    getMessage(key: proto.IMessageKey): Promise<proto.IMessage | undefined>

    replyText(ctx: IMessage, text: string, options: any): Promise<void>;
    replyMedia(
        ctx: IMessage,
        media: string | Media,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options?: any
    ): Promise<void>;

    sendTextMessage(ctx: IMessage | string, text: string, options: any): Promise<void>;

    loadMessage(ctx: IMessage | WAMessageKey): Promise<IMessage | WAMessage | undefined>;
    createPoll(ctx: IMessage, poolName: string, options: Array<string>): Promise<boolean>;
}

export {
    IBot,
    Media,
    GroupsData,
    Module,
    IMessageHandler,
    EntryPoint
}