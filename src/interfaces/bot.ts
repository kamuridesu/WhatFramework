import { makeWASocket } from "@whiskeysockets/baileys";
import { WAMessage, WAMessageKey } from "@whiskeysockets/baileys";
import { IMessageData } from "./messageData.js";
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
    commandHandlers: (ctx: Bot,
        command: string,
        args: string[],
        messageData: IMessageData,
        groupData: GroupData | undefined,
        chatMetadata: ChatMetadata) => void;
    chatHandlers: (ctx: Bot,
        messageBody: string,
        messageData: IMessageData,
        groupData: GroupData | undefined,
        chatMetadata: ChatMetadata) => void;
}

interface Module {
    Entrypoint: EntryPoint
}

interface MessageHandler {
    handle: (message: WAMessage, bot: Bot) => void
    handleUpdate: (key: WAMessageKey, updates: Partial<WAMessage>, ctx: Bot) => void
}

interface Bot {
    connection?: ReturnType<typeof makeWASocket>;

    readonly botName: string;
    readonly prefix: string;
    readonly botNumber: string;
    readonly ownerNumber: string;
    readonly commandsFilename: string;
    readonly language: string;
    readonly lang: Language;
    reconnectOnClose: boolean;
    groupsData: GroupsData // This is for caching purpose

    init(messageHandler: MessageHandler): Promise<void>;

    replyText(ctx: IMessageData, text: string, options: any): Promise<void>;
    replyMedia(
        ctx: IMessageData,
        media: string | Media,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options?: any
    ): Promise<void>;

    sendTextMessage(ctx: IMessageData | string, text: string, options: any): Promise<void>;

    loadMessage(ctx: IMessageData | WAMessageKey): Promise<IMessageData | WAMessage | undefined>;
    createPoll(ctx: IMessageData, poolName: string, options: Array<string>): Promise<boolean>;
}

export {
    Bot,
    Media,
    GroupsData,
    Module,
    MessageHandler,
    EntryPoint
}