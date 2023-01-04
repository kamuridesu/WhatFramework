import { Bot } from "./src/modules/bot.js";

const bot = new Bot();

/**
 * Checks the message data and populate a data object
 * @param {object} message message instance to check data
 * @returns {object} message_data with all retrieved information
*/
async function checkMessageData(message) {
    // checks the message data and populate a data object
    let messageData = {
        message: undefined,
        type: undefined,
        body: undefined,
        origin: message.key.remoteJid,
        is_media: false,
        is_quoted_text: false,
        is_quoted_video: false,
        is_quoted_image: false,
        is_quoted_audio: false,
        is_quoted_sticker: false,
    }
    const type = Object.keys(message.message)[0];  // get message type (text, image, video, audio, sticker, location, contact, etc)
    messageData.type = type;
    messageData.context = message;
    messageData.is_media = (type === 'imageMessage' || type === 'videoMessage');

    let body = '';

    // get message body
    if (type == 'conversation') {
        body = message.message.conversation;
    } else if (type == "imageMessage") {
        body = message.message.imageMessage.caption;
    } else if (type == "videoMessage") {
        body = message.message.videoMessage.caption;
    } else if(type == "extendedTextMessage") {
        body = message.message.extendedTextMessage.text;
    }
    messageData.body = body;

    // check if message is a quoted message
    if (type === "extendedTextMessage") {
        const message_string = JSON.stringify(message.message);
        messageData.is_quoted_text = message_string.includes("conversation");
        messageData.is_quoted_audio = message_string.includes("audioMessage");
        messageData.is_quoted_image = message_string.includes("imageMessage");
        messageData.is_quoted_video = message_string.includes("videoMessage");
        messageData.is_quoted_sticker = message_string.includes("stickerMessage");
    }
    return messageData;
}

/**
 * Send a message to the target.
 * @param {Object} message received message
 * @param {Bot} ctx Bot instance to send messages
*/
async function messageHandler(message, ctx) {
    if (!message.message) return
    message.message = (Object.keys(message.message)[0] === 'ephemeralMessage') ? message.message.ephemeralMessage.message : message.message
    if (message.key && message.key.remoteJid === 'status@broadcast') return
    if (message.key.id.startsWith('BAE5') && message.key.id.length === 16) return

    const messageData = await checkMessageData(message);

    if (messageData.body === "test") {
        return ctx.replyText(messageData, "textando");
    } else {
        console.log(messageData.body);
    }

}

await bot.init(messageHandler);
