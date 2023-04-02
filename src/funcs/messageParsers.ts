import { WAMessage } from "@adiwajshing/baileys";
import { MessageData } from "../types/messageData.js";
import { GroupData } from "../types/groupData.js";
import { ChatMetadata } from "../types/chatMetadata.js";
import { Bot } from "../modules/bot.js";

const messageTypes: string[] = [
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
 * @param {Message} message message instance to check data
 * @returns {MessageData} message_data with all retrieved information
 */
function checkMessageData(message: WAMessage): MessageData | undefined {
  const key = message.message;
  if (!key) {
    return undefined;
  }
  const type: string | undefined = messageTypes.find(type => Object.keys(key).includes(type));
  const isMedia: boolean = ["imageMessage", "videoMessage"].includes(type as string);

  let body: string | undefined | null;
  let mentionedUsers: string[] | undefined | null = [];
  let hasQuotedMessage: boolean = false;
  let quotedMessageType: string | undefined;
  let quotedMessage: string | undefined;
  let isReactionMessage: boolean = false;
  let reactionMessage: any = undefined;

  switch (type) {
    case "conversation":
      body = message.message?.conversation;
      break;
    case "imageMessage":
      body = message.message?.imageMessage?.caption;
      break;
    case "videoMessage":
      body = message.message?.videoMessage?.caption;
      break;
    case "extendedTextMessage":
      body = message.message?.extendedTextMessage?.text;
      hasQuotedMessage = true;
      quotedMessageType = messageTypes.find(type => JSON.stringify(message.message).includes(type));
      if (quotedMessageType === "conversation") {
        mentionedUsers = message.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        quotedMessage = JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo;
      }
      break;
    case "reactionMessage":
      isReactionMessage = true;
      reactionMessage = message.message?.reactionMessage;
      break;
  }
  body = body ? body : "";
  mentionedUsers = mentionedUsers ? mentionedUsers : [];
  const origin = message.key.remoteJid ? message.key.remoteJid : "";
  quotedMessageType = quotedMessageType ? quotedMessageType : "";
  return new MessageData(message, type as string, body, mentionedUsers, origin, isMedia, hasQuotedMessage, quotedMessageType, quotedMessage, isReactionMessage, reactionMessage);
}


async function checkGroupData(messageData: MessageData, chatMetadata: ChatMetadata, ctx: Bot): Promise<GroupData | undefined> {
  const groupMetadata = await ctx.connection?.groupMetadata(messageData.origin);
  if (!groupMetadata) {
    return undefined;
  }
  let { subject: name, id: groupId, desc: description, participants: members, owner: groupOwner, announce } = groupMetadata;
  const admins = members.filter((element) => element.admin === "admin" || element.admin === "superadmin");
  const senderIsGroupOwner = members.some((element) => element.admin === "superadmin");
  const senderIsAdmin = members.some((element) => element.id === chatMetadata.messageSender && (element.admin === "admin" || element.admin === "superadmin"));
  const botIsAdmin = members.some((element) => element.id === ctx.botNumber && (element.admin === "admin" || element.admin === "superadmin"));
  const isLocked = announce !== undefined ? JSON.parse(JSON.stringify(announce).replace(/"/g, "")) : false;

  description = description ? description : "";
  groupOwner = groupOwner ? groupOwner : "";
  return new GroupData(name, description, groupId, members, admins, groupOwner, senderIsGroupOwner, botIsAdmin, senderIsAdmin, isLocked);
}


function checkChatMetaData(messageData: MessageData, ctx: Bot): ChatMetadata {
  const messageIsFrom = messageData.origin;
  const senderName = messageData.originalMessage.pushName ? messageData.originalMessage.pushName : "";
  const isGroup = messageIsFrom.includes('@g.us');
  let messageSender = messageIsFrom ? messageIsFrom : "";
  if (isGroup) {
    messageSender = messageData.originalMessage.key.participant ? messageData.originalMessage.key.participant : "";
  }
  const senderIsOwner = ctx.ownerNumber === messageSender?.split('@')[0];

  return new ChatMetadata(messageSender, senderName, messageIsFrom, senderIsOwner, isGroup);
}

function convertNumberToMention(text: string): string[] | string {
  const regex = /@[0-9]{12}/g;
  if (regex.test(text)) {
    return text.match(regex)?.map(number => `${number.replace("@", "")}@s.whatsapp.net`) ?? "";
  }
  return "";
}


export {
  checkMessageData,
  checkGroupData,
  checkChatMetaData,
  convertNumberToMention
};

