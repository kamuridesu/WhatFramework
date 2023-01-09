import { checkChatMetaData, checkGroupData, checkMessageData } from "../funcs/messageParsers.js";


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

    console.log(groupData)

    // console.log(messageMetadata);

    if (messageData.originalMessage.pushName == "Yarlen Lima" && Math.floor(Math.random() * 3) == 2) {
        return ctx.replyText(messageData, "VAI TOMAR NO CU");
    }

    if (messageData.body === "test") {
        return ctx.replyText(messageData, "textando");
    } else {
        console.log(messageData);
    }
}

export {
    messageHandler
}