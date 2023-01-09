import { MessageData } from "../types/messageData.js"
import { GroupData } from "../types/groupData.js";
import { ChatMetadata } from "../types/chatMetadata.js";

/**
 * Checks the message data and populate a data object
 * @param {Object} message message instance to check data
 * @returns {MessageData} message_data with all retrieved information
*/
function checkMessageData(message) {
    const type = Object.keys(message.message).at(-1);  // get message type (text, image, video, audio, sticker, location, contact, etc)
    const isMedia = (type === 'imageMessage' || type === 'videoMessage');

    const quotedMessageTypes = {
        audio: "audioMessage",
        video: "videoMessage",
        text: "conversation",
        image: "imageMessage",
        sticker: "stickerMessage"
    }

    let body = undefined;
    let hasQuotedMessage = false;
    let quotedMessageType = undefined;

    switch (type) {
        case "conversation":
            body = message.message.conversation;
            break;
        case "imageMessage":
            body = message.message.imageMessage.caption;
            break;
        case "videoMessage":
            body = message.message.videoMessage.caption;
            break;
        case "extendedTextMessage":
            body = message.message.extendedTextMessage.text;
            hasQuotedMessage = true;
            for (let key in quotedMessageTypes) {
                if (JSON.stringify(message.message).includes(quotedMessageTypes[key])) {
                    quotedMessageType = quotedMessageTypes[key];
                }
            }
            break;
        default:
            body = undefined;
    }
    return new MessageData(message, type, body, message.key.remoteJid, isMedia, hasQuotedMessage, quotedMessageType);
}

/**
 * Checks the message data and populate a data object
 * @param {MessageData} messageData message instance to check data
 * @param {Bot} ctx bot context to use some functions to retrieve info
 * @returns {GroupData} message_data with all retrieved information
*/
async function checkGroupData(messageData, messageMetadata, ctx) {
    const groupMetadata = await ctx.connection.groupMetadata(messageData.origin)
    const name = groupMetadata.subject;
    const groupId = groupMetadata.id;
    const description = groupMetadata.desc;
    const members = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;
    const isLocked = groupMetadata.announce !== undefined ? JSON.parse(JSON.stringify(groupMetadata.announce).replace(/"/g, '')) : false
    const admins = [];
    let senderIsGroupOwner = false;
    let senderIsAdmin = false;
    let botIsAdmin = false;
    members.forEach(element => {
        if (element.admin == "admin" || element.admin == "superadmin") {
            admins.push(element);
        }
        if (element.admin == "superadmin") {
            senderIsGroupOwner = true;
        }
        if (element.id == messageMetadata.sender && (element.admin == "admin" || element.admin == "superadmin")) {
            senderIsAdmin = true;
        }
        if (element.id == ctx.botData.botNumber && (element.admin == "admin" || element.admin == "superadmin")) {
            botIsAdmin = true;
        }
    });
    return new GroupData(name, description, groupId, members, admins, groupOwner, senderIsGroupOwner, botIsAdmin, senderIsAdmin, isLocked);
}

/**
 * Checks the message data and populate a data object
 * @param {MessageData} messageData message instance to check data
 * @param {Bot} ctx bot context to use some functions to retrieve info
 * @returns {ChatMetadata} message_data with all retrieved information
*/
function checkChatMetaData(messageData, ctx) {
    const messageIsFrom = messageData.origin;
    const senderName = messageData.originalMessage.pushName;
    const isGroup = messageIsFrom.includes("@g.us");
    let messageSender = messageIsFrom;
    let senderIsOwner = false;
    if(isGroup) {
        messageSender = messageData.originalMessage.key.participant;
    }
    if(ctx.botData.ownerJid == messageSender || ctx.botData.ownerJid == messageIsFrom) {
        senderIsOwner = true;
    }
    return new ChatMetadata(messageSender, senderName, messageIsFrom, senderIsOwner, isGroup);
}

export {
    checkMessageData,
    checkGroupData,
    checkChatMetaData
}