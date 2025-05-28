import { Boom } from '@hapi/boom';
import Pino from 'pino';
import {
    DisconnectReason,
    makeCacheableSignalKeyStore,
    makeWASocket,
    proto,
    useMultiFileAuthState,
    WAMessage,
    WAMessageContent,
    WAMessageKey
} from '@whiskeysockets/baileys';
import {
    IBot,
    IMessageHandler,
    Media,
    PostgreSQLConfig,
    State
} from "../../@types/types.js";
import { IMessage, IReactionMessage } from '../../@types/message.js';
import Translations from '../../libs/lang/interface.js';
import { Language } from "../../libs/lang/language.js";
import { checkJidInTextAndConvert } from '../../libs/text.js';
import { Message } from '../data/message.js';
import { parseMedia } from '../funcs/mediaParsers.js';
import { parseMessage } from '../funcs/parser.js';

import { usePostgreSQLAuthState } from 'postgres-baileys';


const logger = Pino().child({
    level: 'trace',
    stream: 'store',
});

class WABot implements IBot {
    connection?: ReturnType<typeof makeWASocket>;
    reconnectOnClose: boolean;

    public readonly name: string;
    public readonly prefix: string;
    public botNumber?: string;
    public readonly ownerNumber: string;
    public readonly language: string;
    public readonly lang: Translations;

    private postgresConfig?: PostgreSQLConfig;

    private state?: State;
    private saveCreds?: () => Promise<void>;

    constructor(
        name = 'bot',
        prefix = '!',
        ownerNumber = '',
        language = '',
        postgresConfig?: PostgreSQLConfig
    ) {
        this.connection = undefined;
        this.name = name;
        this.prefix = prefix;
        this.botNumber = undefined;
        this.ownerNumber = ownerNumber;
        this.language = language;
        this.reconnectOnClose = true;
        this.lang = new Language(this).get();
        this.postgresConfig = postgresConfig;
    }

    async getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
        // if (storage) {
        //     const msg = await storage.loadMessage(key.remoteJid!,
        //         key.id!)
        //     return msg?.message || undefined
        // }

        // only if store is present
        return undefined;
    }

    async setStateHandler() {
        if (this.state == undefined || this.saveCreds == undefined) {
            if (this.postgresConfig) {
                const { state, saveCreds } = await usePostgreSQLAuthState(this.postgresConfig, this.name);
                this.state = state;
                this.saveCreds = saveCreds;
                return;
            }
            const { state, saveCreds } = await useMultiFileAuthState(this.name);
            this.state = state;
            this.saveCreds = saveCreds;
        }
    }

    async init(messageHandler: IMessageHandler): Promise<void> {

        await this.setStateHandler();

        this.connection = makeWASocket({
            printQRInTerminal: true,
            auth: {
                creds: this.state!.creds,
                keys: makeCacheableSignalKeyStore(this.state!.keys, logger)
            },
            getMessage: this.getMessage,
            version: [2, 3000, 1015901307],
        });

        this.connection.ev.on('creds.update', this.saveCreds!);

        this.connection.ev.on('connection.update', (update) => {
            this.botNumber = this.state?.creds.me?.id.replace(/:\d+/, "");
            const { connection, lastDisconnect } = update
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
                console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
                if (shouldReconnect) {
                    this.init(messageHandler);
                }
            } else if (connection === 'open') {
                console.log('opened connection')
            }
        });

        // storage.bind(this.connection.ev);

        this.connection.ev.on('messages.upsert', async (handle: { messages: any; type: string; }) => {
            for (let message of handle.messages) {
                if (!message.key.fromMe && handle.type === "notify") {
                    messageHandler.handle(message, this);
                }
            }
        });

        this.connection.ev.on("messages.reaction", async (handle) => {
            for (let reaction of handle) {
                // console.log((reaction));
            }
        });

        this.connection.ev.on("group-participants.update", async (handle) => {
            if (handle.action == "add") {
                return messageHandler.handleNewMember(handle, this);
            }
            if (handle.action == "remove") {
                return messageHandler.handleRemoveMember(handle, this);
            }
        })
    }

    async getGroups() {
        return (await this.connection?.groupFetchAllParticipating());
    }

    async reply(ctx: IMessage, text: string = "", media?: Media, options?: any): Promise<IMessage | undefined> {
        if (media) {
            return await this.replyMedia(ctx, media.media, media.messageType, media.mimeType, media.caption, options);
        }
        return await this.replyText(ctx, text, options);
    }

    private async replyText(ctx: IMessage, text: string, options: any = {}): Promise<IMessage | undefined> {
        options.quoted = ctx.originalMessage;
        return await this.sendTextMessage(ctx, text, options);
    }

    private async replyMedia(
        ctx: IMessage,
        media: ArrayBuffer,
        messageType: string,
        mimeType?: string,
        mediaCaption?: string,
        options: any = {}
    ): Promise<IMessage | undefined> {
        let sentMessage: IMessage | undefined = undefined;
        try {
            await this.connection?.presenceSubscribe(ctx.author.chatJid);
            await this.connection?.sendPresenceUpdate('recording', ctx.author.chatJid);

            const params = await parseMedia(media, messageType, mimeType, mediaCaption);
            const response = await this.connection?.sendMessage(ctx.author.chatJid, params, {
                quoted: ctx.originalMessage,
                ...options,
            });
            if (response) sentMessage = await parseMessage(response, this);
            await this.connection?.sendPresenceUpdate("paused", ctx.author.chatJid);
        } catch (e) {
            console.error(e);
            sentMessage = await this.replyText(ctx, this.lang.sendingMediaError);
        }
        finally {
            return sentMessage;
        }
    }

    async sendTextMessage(ctx: IMessage | string, text: string, options?: any): Promise<IMessage | undefined> {
        let recipient: string;
        if (typeof ctx != "string" && ctx.originalMessage) {
            recipient = ctx.author.chatJid;
        } else {
            recipient = ctx.toString();
        }
        let sentMessage: IMessage | undefined = undefined;
        try {
            const textData = checkJidInTextAndConvert(text);
            if (options != undefined && options.mentions) {
                textData.mentions = textData.mentions.concat(options.mentions);
            }

            type MessageData = { text: string, mentions: string[], edit?: any }
            let messageData: MessageData = {
                text: textData.text,
                mentions: textData.mentions,
            }
            if (options.edit != undefined) {
                messageData.edit = options.edit;
                delete options.edit;
            }

            await this.connection?.presenceSubscribe(recipient);
            await this.connection?.sendPresenceUpdate("composing", recipient);
            const response = await this.connection?.sendMessage(recipient, messageData, options)
            if (response) sentMessage = await parseMessage(response, this);
            await this.connection?.sendPresenceUpdate("paused", recipient);
        } catch (e) {
            console.error(e);
        }
        finally {
            return sentMessage;
        }
    }

    async reactMessage(ctx: IMessage | string, reactionMessage: IReactionMessage, options?: any) {
        let recipient: string;
        if (typeof ctx != "string" && ctx.originalMessage) {
            recipient = ctx.author.chatJid;
        } else {
            recipient = ctx.toString();
        }
        let sentMessage: IMessage | undefined = undefined;
        try {
            await this.connection?.presenceSubscribe(recipient);
            const response = await this.connection?.sendMessage(recipient, reactionMessage, options == undefined ? {} : options)
            if (response) sentMessage = await parseMessage(response, this);
            await this.connection?.sendPresenceUpdate("paused", recipient);
        } catch (e) {
            console.error(e);
        }
        finally {
            return sentMessage;
        }
    }

    async loadMessage(ctx: Message | WAMessageKey): Promise<IMessage | WAMessage | undefined> {
        // let originJid: string;
        // let stanzaId: string;
        // if (ctx instanceof Message) {
        //     if (!ctx.hasQuotedMessage || ctx.quotedMessageType != "conversation") {
        //         return undefined;
        //     }
        //     originJid = ctx.author.chatJid;
        //     stanzaId = ctx.quotedMessage?.originalMessage.key?.id!;
        // } else {
        //     if (!ctx.remoteJid || !ctx.id) {
        //         return undefined;
        //     }
        //     originJid = ctx.remoteJid;
        //     stanzaId = ctx.id;
        // }
        // const messageInformation = await this.loadMessageById(originJid, stanzaId);
        // return messageInformation != undefined ? (ctx instanceof Message ? parseMessage(messageInformation, this) : messageInformation) : undefined;
        return undefined;
    }

    async loadMessageById(originJid: string, stanzaId: string): Promise<proto.IWebMessageInfo | undefined> {
        // const messageInformation = await storage.loadMessage(originJid, stanzaId);
        // if (messageInformation) {
        //     return messageInformation;
        // }
        return undefined;
    }
}

export { WABot as Bot, Media };
