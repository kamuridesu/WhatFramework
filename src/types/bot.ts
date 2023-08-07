import makeWASocket from "@whiskeysockets/baileys";
import { WAMessage, WAMessageKey } from "@whiskeysockets/baileys";
import { MessageData } from "./messageData.js";
import Language from "../../libs/lang/language.js";
import { GroupData } from './groupData.js';


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
    botName: string,
    prefix: string,
    botNumber: string,
    ownerNumber: string,
    language: string | undefined
    commandHandlers: Function;
    chatHandlers: Function;
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
    groupsData: GroupsData

    init(messageHandler: MessageHandler): Promise<void>;

    replyText(ctx: MessageData, text: string, options: any): Promise<void>;
    replyMedia(
        ctx: MessageData,
        media: string | Media,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options?: any
    ): Promise<void>;

    sendTextMessage(ctx: MessageData | string, text: string, options: any): Promise<void>;

    loadMessage(ctx: MessageData | WAMessageKey): Promise<MessageData | WAMessage | undefined>;
    createPoll(ctx: MessageData, poolName: string, options: Array<string>): Promise<boolean>;
}

export {
    Bot,
    Media,
    GroupsData,
    Module,
    MessageHandler,
    EntryPoint
}