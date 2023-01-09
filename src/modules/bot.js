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
    constructor() {
        this.connection = undefined;
        this.botData = {
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
     * @param {String} text text message to be sent
    */
    async replyText(ctx, text) {
        try {
            await this.connection.presenceSubscribe(ctx.origin);
            await this.connection.sendPresenceUpdate(ctx.origin);
            await this.connection.sendMessage(ctx.origin, {
                text: text,
            }, {
                quoted: ctx.originalMessage
            });
            await this.connection.sendPresenceUpdate('paused', ctx.origin);
        } catch (e) {
            console.log(e);
        }
    }
}

export {
    Bot
};