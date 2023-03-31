import Pino from 'pino';
import { default as makeWASocket, DisconnectReason, makeInMemoryStore, useMultiFileAuthState, WAMessage } from '@adiwajshing/baileys'
import { Boom } from '@hapi/boom'
import { MessageData } from '../types/messageData.js';
import { parseMedia } from '../funcs/mediaParsers.js';
import { checkJidInTextAndConvert } from '../../libs/text.js';
import { Bot } from "../types/bot.js";



interface Media {
    media: Buffer | string;
    messageType: string;
    mimeType: string;
    error: Error;
}

const logger = Pino().child({
    level: 'error',
    stream: 'store',
});

const storage = makeInMemoryStore({ logger });

const {
    state,
    saveCreds,
} = await useMultiFileAuthState('./states');

/**
 * Bot class to create a Bot object to handle all the WhatsApp IO.
 */
class WABot implements Bot {
    public connection?: ReturnType<typeof makeWASocket>;
    reconnectOnClose: boolean;

    public readonly botName: string;
    public readonly prefix: string;
    public readonly botNumber: string;
    public readonly ownerNumber: string;
    public readonly commandsFilename: string;
    public readonly language: string;

    constructor(
        botName = 'bot',
        prefix = '!',
        botNumber = '',
        ownerNumber = '',
        commandsFilename = '',
        language = '',
    ) {
        this.connection = undefined;
        this.botName = botName;
        this.prefix = prefix;
        this.botNumber = botNumber;
        this.ownerNumber = ownerNumber;
        this.commandsFilename = commandsFilename;
        this.language = language;
        this.reconnectOnClose = true;
    }

    /**
     * Initiates the bot and starts to handle connections
     * @param {CallableFunction} messageHandler function to handle incoming messages
     */
    async init(messageHandler: { handle: (message: WAMessage, bot: Bot) => void }): Promise<void> {
        this.connection = makeWASocket({
            printQRInTerminal: true,
            auth: state,
        });

        this.connection.ev.on('creds.update', saveCreds);

        this.connection.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
                console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
                // reconnect if not logged out
                if (shouldReconnect) {
                    this.init(messageHandler);
                }
            } else if (connection === 'open') {
                console.log('opened connection')
            }
        })

        storage.bind(this.connection.ev);

        this.connection.ev.on('messages.upsert', async (handle) => {
            const message = handle.messages[0];
            if (!message.key.fromMe && handle.type === "notify") {
                messageHandler.handle(message, this);
            }
        });
    }

    async replyText(ctx: MessageData, text: string, options: any = {}): Promise<void> {
        options.quoted = ctx.originalMessage;
        await this.sendTextMessage(ctx, text, options);
    }

    async replyMedia(
        ctx: MessageData,
        media: string | Media,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options: any = {}
    ): Promise<void> {
        try {
            await this.connection?.presenceSubscribe(ctx.origin);
            await this.connection?.sendPresenceUpdate("composing", ctx.origin);

            const params = parseMedia(media, messageType, mimeType, mediaCaption);
            await this.connection?.sendMessage(ctx.origin, params, {
                quoted: ctx.originalMessage,
                ...options,
            });
            await this.connection?.sendPresenceUpdate("paused", ctx.origin);
        } catch (e) {
            console.error(e);
            await this.replyText(ctx, "Ocorreu um erro ao enviar a mídia!");
        }
    }

    async sendTextMessage(ctx: MessageData | string, text: string, options: any): Promise<void> {
        let recipient: string;
        if (typeof ctx != "string" && ctx.originalMessage) {
            recipient = ctx.origin;
        } else {
            recipient = ctx.toString();
        }
        try {
            const textData = checkJidInTextAndConvert(text);
            await this.connection?.presenceSubscribe(recipient);
            await this.connection?.sendPresenceUpdate("composing", recipient);
            await this.connection?.sendMessage(recipient, {
                text: textData.text,
                mentions: textData.mentions,
                linkPreview: { "canonical-url": "", "matched-text": "", title: "" },
            }, options);
            await this.connection?.sendPresenceUpdate("paused", recipient);
        } catch (e) {
            console.error(e);
        }
    }
}

export { WABot as Bot, Media };
