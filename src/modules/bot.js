import P from 'pino';
import pkg from '@adiwajshing/baileys';
const {
    default: makeWASocket,
    DisconnectReason, 
    makeInMemoryStore,
    useMultiFileAuthState,
} = pkg;
import fs from 'fs';

const storage = makeInMemoryStore({
    logger: P().child({
        level: 'info',
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
    constructor() {
        this.connection = undefined;
        this.bot_data = {
            token: "!",
            bot_number: "",
        }
        this.reconnect_on_close = true;
    }

    /**
     * Initiates the bot and starts to handle connections
     * @param {CallableFunction} messageHandler message instance to check data
    */
    async init(messageHandler) {
        this.connection = makeWASocket({
            printQRInTerminal: true,
            auth: state
        });

        this.connection.ev.on('creds.update', saveCreds);

        this.connection.ev.on('connection.update', (update) => {
            const {
                connection,
                lastDisconnect
            } = update;

            if (connection === 'close') {
                if (!this.reconnect_on_close) {
                    this.init(messageHandler);
                } else if ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
                    this.init(messageHandler);
                } else {
                    console.warn("Connection closed!");
                }
            }
        })

        storage.bind(this.connection.ev);

        this.connection.ev.on('messages.upsert', async handle => {
            const message = handle.messages[0];
            if (!message.key.fromMe && handle.type === 'notify') {
                messageHandler(message, this);
            }
        })
    }

    /**
     * Send a message to the target.
     * @param {Object} ctx message context
     * @param {Object} text text message to be sent
     * @param {Object} mentions users to be mentioned in the message
    */
    async replyText(ctx, text, mentions) {
        const recipient = ctx.origin;
        const message = ctx.message;
        try {
            await this.connection.presenceSubscribe(recipient);
            await this.connection.sendPresenceUpdate(recipient);
            await this.connection.sendMessage(recipient, {
                text: text,
                mentions: mentions,
                quoted: message
            });
            await this.connection.sendPresenceUpdate('paused', recipient);
        } catch (e) {
            console.log(e);
        }
    }
}

export {
    Bot
};