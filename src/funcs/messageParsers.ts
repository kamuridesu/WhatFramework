import { WAMessage } from "@whiskeysockets/baileys";
import { MessageData } from "../data/messageData.js";
import { GroupData } from "../data/groupData.js";
import { ChatMetadata } from "../data/chatMetadata.js";
import { IBot, IMessage, IGroupData, IChatMetadata } from "../../@types/types.js";

const messageTypes: string[] = [
    "audioMessage",
    "videoMessage",
    "conversation",
    "imageMessage",
    "stickerMessage",
    "extendedTextMessage",
    "reactionMessage"
];

export function checkMessageData(message: WAMessage, bot: IBot): IMessage | undefined {
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
            if (quotedMessageType != undefined && ["conversation", "extendedTextMessage"].includes(quotedMessageType)) {
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
    return new MessageData(bot, message, type as string, body, mentionedUsers, origin, isMedia, hasQuotedMessage, quotedMessageType, quotedMessage, isReactionMessage, reactionMessage);
}

/**
* This function has a caching mechanism that saves the group metadata into the bot instance and invalidates it after 10s
*/
export async function checkGroupData(messageData: IMessage, chatMetadata: IChatMetadata, ctx: IBot): Promise<IGroupData | undefined> {
    let groupCacheId = messageData.origin.split("@g.us")[1];
    const cachedGroupData = ctx.groupsData[groupCacheId];
    if (cachedGroupData && ((Date.now() - cachedGroupData.lastFetchDate) / 1000) <= 10) {
        return cachedGroupData.groupData;
    }
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
    groupId = groupId.split("-")[1];
    const groupData = new GroupData(name, description, groupId, members, admins, groupOwner, senderIsGroupOwner, botIsAdmin, senderIsAdmin, isLocked);
    ctx.groupsData[groupCacheId] = { lastFetchDate: Date.now(), groupData: groupData }
    return groupData;
}


export function checkChatMetaData(messageData: IMessage, ctx: IBot): IChatMetadata {
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

export function convertNumberToMention(text: string): string[] | string {
    const regex = /@[0-9]{12}/g;
    if (regex.test(text)) {
        return text.match(regex)?.map(number => `${number.replace("@", "")}@s.whatsapp.net`) ?? "";
    }
    return "";
}
