import P from 'pino';
import pkg from '@adiwajshing/baileys';
const {
    default: makeWASocket,
    DisconnectReason,
    makeInMemoryStore,
    useMultiFileAuthState,
} = pkg;
import fs from 'fs';
import { sendRequest } from '../funcs/networking.js';
import { MessageData } from '../types/messageData.js';
import { parseMedia } from '../funcs/mediaParsers.js';
import { checkJidInTextAndConvert } from '../../libs/text.js';

const storage = makeInMemoryStore({
    logger: P().child({
        level: 'error',
        'stream': 'store'
    })
})

const {
    state,
    saveCreds
} = await useMultiFileAuthState('./states')

/**
 * Bot class to create a Bot object to handle all the WhatsApp IO.
 * @returns {Bot} A instance of bot with a working connetion.
*/
class Bot {
    constructor(botName = "bot", prefix = "!", botNumber = "", ownerNumber = "", commandsFilename = "", language = "") {
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
    async init(messageHandler) {
        this.connection = makeWASocket({
            printQRInTerminal: true,
            auth: state
        });

        this.connection.ev.on('creds.update', saveCreds);

        this.connection.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === 'close') {
                if (this.reconnectOnClose || ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut)) {
                    await this.init(messageHandler);
                } else {
                    console.warn("Connection closed!");
                }
            }
        });

        storage.bind(this.connection.ev);

        this.connection.ev.on('messages.upsert', async (handle) => {
            const message = handle.messages[0];
            if (!message.key.fromMe && handle.type === 'notify') {
                messageHandler.handle(message, this);
            }
        });
    }


    /**
     * Send a message to the target.
     * @param {MessageData} ctx message context
     * @param {String} text text message to be sent
     * @param {Object} options additional options for sending message (optional)
    */
    async replyText(ctx, text, options = {}) {
        options.quoted = ctx.originalMessage;
        this.sendTextMessage(ctx, text, options);
    }

    /**
     * @param {MessageData} ctx 
     * @param {Object|string} media 
     * @param {string} messageType 
     * @param {string} mimeType 
     * @param {string} mediaCaption 
     * @param {Object} options additional options for sending message (optional)
     */
    async replyMedia(ctx, media, messageType, mimeType, mediaCaption, options = {}) {
        try {
            await this.connection.presenceSubscribe(ctx.origin);
            await this.connection.sendPresenceUpdate(ctx.origin);
            if (fs.existsSync(media)) {
                media = fs.readFileSync(media);
            } else if (typeof (media) == "string") {
                media = await sendRequest(media);
                if (media.error) {
                    caption = media.error.code;
                    media = media.media;
                    messageType = "image";
                    mimeType = "image/png";
                }
            }
            const params = parseMedia(media, messageType, mimeType, mediaCaption);
            await this.connection.sendMessage(ctx.origin, params, {
                quoted: ctx.originalMessage,
                ...options
            });
            await this.connection.sendPresenceUpdate('paused', ctx.origin);
        } catch (e) {
            console.error(e);
            await this.replyText(ctx, "Ocorreu um erro ao enviar a midia!");
        }
    }

    /**
     * @param {MessageData | string} ctx
     * @param {string} text
     * @param {Object} options
    */
    async sendTextMessage(ctx, text, options) {
        const recipient = ctx.originalMessage ? ctx.origin : ctx;
        try {
            const textData = checkJidInTextAndConvert(text);
            await this.connection.presenceSubscribe(recipient);
            await this.connection.sendPresenceUpdate(recipient);
            await this.connection.sendMessage(recipient, {
                text: textData.text,
                mentions: textData.mentions,
                linkPreview: { 'canonical-url': '', 'matched-text': '', title: '', }
            }, options);
            await this.connection.sendPresenceUpdate('paused', recipient);
        } catch (e) {
            console.log(e);
        }
    }
}

export {
    Bot
};
