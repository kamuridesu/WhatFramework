import makeWASocket from "@adiwajshing/baileys";
import { WAMessage } from "@adiwajshing/baileys";
import { Media } from "../modules/bot.js";
import { MessageData } from "./messageData.js";


interface Bot {
    connection?: ReturnType<typeof makeWASocket>;

    readonly botName: string;
    readonly prefix: string;
    readonly botNumber: string;
    readonly ownerNumber: string;
    readonly commandsFilename: string;
    readonly language: string;
    reconnectOnClose: boolean;

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
}

export {
    Bot,
    Media
}