import Pino from 'pino';
import { Boom } from '@hapi/boom'

import { makeWASocket,
    DisconnectReason,
    makeInMemoryStore,
    useMultiFileAuthState,
    WAMessage,
    makeCacheableSignalKeyStore,
    WAMessageContent,
    WAMessageKey } from '@whiskeysockets/baileys'
import { IBot,
    GroupsData,
    Media,
    IMessageHandler } from "../@types/types.js";

import { Language } from "../../libs/lang/language.js";
import { IMessageData } from '../@types/messageData.js';
import { parseMedia } from '../funcs/mediaParsers.js';
import { checkJidInTextAndConvert } from '../../libs/text.js';
import { checkMessageData } from '../funcs/messageParsers.js';
import { MessageData } from '../data/messageData.js';


const logger = Pino().child({
    level: 'error',
    stream: 'store',
});

const storage = makeInMemoryStore({ logger });
storage.readFromFile("./states/baileys_storage_dump.json");
setInterval(() => {
    storage.writeToFile("./states/baileys_storage_dump.json");
}, 10_000);

const {
    state,
    saveCreds,
} = await useMultiFileAuthState('./states');

class WABot implements IBot {
    public connection?: ReturnType<typeof makeWASocket>;
    reconnectOnClose: boolean;

    public readonly name: string;
    public readonly prefix: string;
    public readonly botNumber: string;
    public readonly ownerNumber: string;
    public readonly commandsFilename: string;
    public readonly language: string;
    public readonly lang: Language;
    public groupsData: GroupsData;

    constructor(
        name = 'bot',
        prefix = '!',
        botNumber = '',
        ownerNumber = '',
        commandsFilename = '',
        language = '',
    ) {
        this.connection = undefined;
        this.name = name;
        this.prefix = prefix;
        this.botNumber = botNumber;
        this.ownerNumber = ownerNumber;
        this.commandsFilename = commandsFilename;
        this.language = language;
        this.reconnectOnClose = true;
        this.lang = new Language(this);
        this.groupsData = {} // This is for caching purpose, details @ src/funcs/messageParsers.ts#65
    }

    async getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
        if (storage) {
            const msg = await storage.loadMessage(key.remoteJid!,
                key.id!)
            return msg?.message || undefined
        }
    
        // only if store is present
        return undefined;
    }

    /**
     * Initiates the bot and starts to handle connections
     * @param {CallableFunction} messageHandler function to handle incoming messages
     */
    async init(messageHandler: IMessageHandler): Promise<void> {
        this.connection = makeWASocket({
            printQRInTerminal: true,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger)
            },
            getMessage: this.getMessage
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
            for (let message of handle.messages) {
                if (!message.key.fromMe && handle.type === "notify") {
                    messageHandler.handle(message, this);
                }
            }
        });
    }

    async replyText(ctx: IMessageData, text: string, options: any = {}): Promise<void> {
        options.quoted = ctx.originalMessage;
        await this.sendTextMessage(ctx, text, options);
    }

    async replyMedia(
        ctx: IMessageData,
        media: string | Media | Buffer,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options: any = {}
    ): Promise<void> {
        try {
            await this.connection?.presenceSubscribe(ctx.origin);
            await this.connection?.sendPresenceUpdate('recording', ctx.origin);

            const params = parseMedia(media, messageType, mimeType, mediaCaption);
            await this.connection?.sendMessage(ctx.origin, params, {
                quoted: ctx.originalMessage,
                ...options,
            });
            await this.connection?.sendPresenceUpdate("paused", ctx.origin);
        } catch (e) {
            console.error(e);
            await this.replyText(ctx, this.lang.get().sendingMediaError);
        }
    }

    async sendTextMessage(ctx: IMessageData | string, text: string, options: any): Promise<void> {
        let recipient: string;
        if (typeof ctx != "string" && ctx.originalMessage) {
            recipient = ctx.origin;
        } else {
            recipient = ctx.toString();
        }
        try {
            const textData = checkJidInTextAndConvert(text);
            if (options && options.mentions) {
                textData.mentions = textData.mentions.concat(options.mentions);
            }
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

    async createPoll(ctx: IMessageData, pollName: string, options: Array<string>): Promise<boolean> {
        console.log(pollName)
        console.log(options)
        try {
            console.log("creting poll");
            console.log(await this.connection?.sendMessage(ctx.origin, {
                poll: {
                    name: pollName,
                    values: options,
                    selectableCount: options.length
                },
            }));
            console.log("done")
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async loadMessage(ctx: MessageData | WAMessageKey): Promise<IMessageData | WAMessage | undefined> {
        let originJid: string;
        let stanzaId: string;
        if (ctx instanceof MessageData) {
            if (!ctx.hasQuotedMessage || ctx.quotedMessageType != "conversation") {
                return undefined;
            }
            originJid = ctx.origin;
            stanzaId = ctx.quotedMessage.stanzaId;
        } else {
            if (!ctx.remoteJid || !ctx.id) {
                return undefined;
            }
            originJid = ctx.remoteJid;
            stanzaId = ctx.id;
        }
        const messageInformation = await storage.loadMessage(originJid, stanzaId);
        if (messageInformation) {
            return (ctx instanceof MessageData ? checkMessageData(messageInformation, this) : messageInformation);
        }
        return undefined;
    }
}

export { WABot as Bot, Media };
