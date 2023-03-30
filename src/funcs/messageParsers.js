import { MessageData } from "../types/messageData.js"
import { GroupData } from "../types/groupData.js";
import { ChatMetadata } from "../types/chatMetadata.js";
import { Bot } from "../modules/bot.js";

const messageTypes = [
  "audioMessage",
  "videoMessage",
  "conversation",
  "imageMessage",
  "stickerMessage",
  "extendedTextMessage",
  "reactionMessage"
];

/**
 * Checks the message data and populate a data object
 * @param {Object} message message instance to check data
 * @returns {MessageData} message_data with all retrieved information
*/
function checkMessageData(message) {
  let type = messageTypes.find(type => Object.keys(message.message).includes(type));
  let isMedia = ["imageMessage", "videoMessage"].includes(type);

  let body = undefined;
  let mentionedUsers = [];
  let hasQuotedMessage = false;
  let quotedMessageType = undefined;
  let isReactionMessage = false;
  let reactionMessage = undefined;

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
      quotedMessageType = messageTypes.find(type => JSON.stringify(message.message).includes(type));
      if (quotedMessageType === "conversation") {
        mentionedUsers = message.message.extendedTextMessage.contextInfo.mentionedJid;
      }
      break;
    case "reactionMessage":
      isReactionMessage = true
      reactionMessage = message.message.reactionMessage;
      break;
  }
  return new MessageData(message, type, body, mentionedUsers, message.key.remoteJid, isMedia, hasQuotedMessage, quotedMessageType, isReactionMessage, reactionMessage);
}

/**
 * Checks the message data and populates a GroupData object with retrieved information
 * @param {MessageData} messageData - The message instance to check data
 * @param {ChatMetadata} chatMetadata - The chat metadata
 * @param {Bot} ctx - The bot context to use some functions to retrieve info
 * @returns {GroupData} - The GroupData object with all retrieved information
*/
async function checkGroupData(messageData, chatMetadata, ctx) {
    const groupMetadata = await ctx.connection.groupMetadata(messageData.origin);
    const { subject: name, id: groupId, desc: description, participants: members, owner: groupOwner, announce } = groupMetadata;
    const admins = members.filter(element => element.admin === "admin" || element.admin === "superadmin");
    const senderIsGroupOwner = members.some(element => element.admin === "superadmin");
    const senderIsAdmin = members.some(element => element.id === chatMetadata.sender && (element.admin === "admin" || element.admin === "superadmin"));
    const botIsAdmin = members.some(element => element.id === ctx.botNumber && (element.admin === "admin" || element.admin === "superadmin"));
    const isLocked = announce !== undefined ? JSON.parse(JSON.stringify(announce).replace(/"/g, '')) : false;
    
    return new GroupData(name, description, groupId, members, admins, groupOwner, senderIsGroupOwner, botIsAdmin, senderIsAdmin, isLocked);
}

/**
 * Checks the message data and populates a data object
 * @param {MessageData} messageData - message instance to check data
 * @param {Bot} ctx - bot context to use some functions to retrieve info
 * @returns {ChatMetadata} - message_data with all retrieved information
 */
function checkChatMetaData(messageData, ctx) {
    const messageIsFrom = messageData.origin;
    const senderName = messageData.originalMessage.pushName;
    const isGroup = messageIsFrom.includes("@g.us");
    let messageSender = messageIsFrom;
    if (isGroup) {
      messageSender = messageData.originalMessage.key.participant;
    }
    let senderIsOwner = (ctx.ownerNumber == messageSender.split("@")[0]);
  
    return new ChatMetadata(
      messageSender,
      senderName,
      messageIsFrom,
      senderIsOwner,
      isGroup
    );
  }

/**
 * 
 * @param {string} text 
 * @returns string with number replaced with mention
 */
function convertNumberToMention(text) {
    const regex = /@[0-9]{12}/g;
    if(regex.test(text)) {
        return text.match(regex).map(number => number.replace("@", "") + "@s.whatsapp.net");
    }
    return "";
}


export {
    checkMessageData,
    checkGroupData,
    checkChatMetaData,
    convertNumberToMention
};
