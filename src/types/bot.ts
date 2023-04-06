import makeWASocket from "@adiwajshing/baileys";
import { WAMessage } from "@adiwajshing/baileys";
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

    init(messageHandler: { handle: (message: WAMessage, bot: Bot) => void }): Promise<void>;

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

    loadMessage(ctx: MessageData): Promise<MessageData|undefined>;
}

export {
    Bot,
    Media, GroupsData
}