import { checkChatMetaData, checkGroupData, checkMessageData } from "../funcs/messageParsers.js";
import { createStickerFromMedia } from "../libs/sticker.js";
import { saveTempFile } from "../funcs/networking.js";
import { downloadMediaMessage } from "@adiwajshing/baileys";


/**
 * Send a message to the target.
 * @param {Object} message received message
 * @param {Bot} ctx Bot instance to send messages
*/
async function messageHandler(message, ctx) {
    if (!message.message ||
        message.key && message.key.remoteJid === 'status@broadcast' ||
        message.key.id.startsWith('BAE5') && message.key.id.length === 16) return

    message.message = (Object.keys(message.message)[0] === 'ephemeralMessage') ? message.message.ephemeralMessage.message : message.message
    const messageData = checkMessageData(message);

    const messageMetadata = checkChatMetaData(messageData, ctx);
    let groupData = undefined;
    if (messageMetadata.chatIsGroup) {
        groupData = await checkGroupData(messageData, messageMetadata, ctx);
    }

    if (messageData.hasQuotedMessage) {
        console.log(messageData.originalMessage.message.extendedTextMessage.contextInfo);
    }

    if (messageData.originalMessage.pushName == "Yarlen Lima" && Math.floor(Math.random() * 3) == 2) {
        ctx.replyText(messageData, "GOSTOSA");
    }

    if (messageData.originalMessage.pushName == '➖Chris' && Math.floor(Math.random() * 2) == 1) {
        ctx.replyText(messageData, "GOSTOSA");
    }

    if (messageData.body != undefined) {
        if (messageData.body === "test") {
            return ctx.replyText(messageData, "textando");
        } else if (messageData.body.startsWith("kb")) {
            return ctx.replyMedia(messageData, "https://images.kabum.com.br/produtos/fotos/114587/teclado-mecanico-gamer-husky-blizzard-rgb-switch-gateron-red-abnt2-branco-tc-hbl-br_1619467058_gg.jpg", "image", "image/jpg", messageData.body.split('kb')[1]);
        }
        if(messageData.body.startsWith("/sticker") && (["imageMessage", "videoMessage"].includes(messageData.type) || ["imageMessage", "videoMessage"].includes(messageData.quotedMessageType))) {
            const messageMedia = messageData.hasQuotedMessage ? JSON.parse(JSON.stringify(messageData.originalMessage).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : messageData.originalMessage;
            console.log(messageMedia)
            const mediaBuffer = await downloadMediaMessage(messageMedia, "buffer");
            const tempFile = saveTempFile(mediaBuffer);
            console.log(tempFile);
            return createStickerFromMedia(tempFile, ctx, messageData);
        }
    }

}

export {
    messageHandler
};