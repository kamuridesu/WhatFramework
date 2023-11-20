import { IBot, IMessage, IAuthor, IGroup } from "../../@types/types.js";
import { WAMessage, proto } from "@whiskeysockets/baileys";
import { Message, Group, Author } from "../data/message.js";

const messageTypes = [
    "audioMessage",
    "videoMessage",
    "conversation",
    "imageMessage",
    "stickerMessage",
    "extendedTextMessage",
    "reactionMessage"
];

export async function parseMessage(message: WAMessage, bot: IBot): Promise<IMessage | undefined> {
    const key = message.message;
    if (!key) {
        return;
    }

    const type = messageTypes.find(type => Object.keys(key).includes(type));
    const isMedia = ["imageMessage", "videoMessage"].includes(type as string);

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
    const originJid = message.key.remoteJid ? message.key.remoteJid : "";
    quotedMessageType = quotedMessageType ? quotedMessageType : "";

    const {
        messageSender,
        senderName,
        messageIsFrom,
        senderIsOwner,
        isGroup
    } = parseMetadata({
        originJid,
        originalMessage: message
    }, bot)

    let groupInfo: IGroup | undefined;
    let author: IAuthor = new Author(
        messageSender,
        senderName,
        originJid,
        false,
        false,
        false,
        false,
    );

    if (isGroup) {
        ({ groupInfo, author } = await parseGroup(
            originJid,
            bot,
            messageSender,
            author
        ));
    }

    return new Message(
        bot,
        message,
        type as string,
        body,
        mentionedUsers,
        author as IAuthor,
        messageSender,
        senderName,
        messageIsFrom,
        senderIsOwner,
        groupInfo != undefined,
        isMedia,
        hasQuotedMessage,
        quotedMessageType,
        quotedMessage,
        isReactionMessage,
        reactionMessage,
        groupInfo
    )

}

export function parseMetadata(context: { originJid: string, originalMessage: proto.IWebMessageInfo }, bot: IBot) {
    const messageIsFrom = context.originJid;
    const senderName = context.originalMessage.pushName ? context.originalMessage.pushName : "";
    const isGroup = messageIsFrom.includes('@g.us');
    let messageSender = messageIsFrom ? messageIsFrom : "";
    if (isGroup) {
        messageSender = context.originalMessage.key.participant ? context.originalMessage.key.participant : "";
    }
    const senderIsOwner = bot.ownerNumber === messageSender?.split('@')[0];

    return { messageSender, senderName, messageIsFrom, senderIsOwner, isGroup };
}

async function parseGroup(originJid: string, bot: IBot, messageSender: string, author: IAuthor) {
    let groupInfo: IGroup | undefined;
    let groupCacheId = originJid.split("@g.us")[1];
    const cachedGroupData = bot.groupsData[groupCacheId];
    if (cachedGroupData && ((Date.now() - cachedGroupData.lastFetchDate) / 1000) <= 10) {
        groupInfo = cachedGroupData.groupData;
    } else {
        const groupMetadata = await bot.connection?.groupMetadata(originJid);
        if (groupMetadata === undefined) {
            groupInfo = undefined;
        } else {
            let { subject: name, id: groupId, desc: description, participants: members, owner: groupOwner, announce } = groupMetadata;
            const admins = members.filter((element) => element.admin === "admin" || element.admin === "superadmin");
            const senderIsGroupOwner = members.some((element) => element.admin === "superadmin");
            const senderIsAdmin = members.some((element) => element.id === messageSender && (element.admin === "admin" || element.admin === "superadmin"));
            const botIsAdmin = members.some((element) => element.id === bot.botNumber && (element.admin === "admin" || element.admin === "superadmin"));
            const isLocked = announce !== undefined ? JSON.parse(JSON.stringify(announce).replace(/"/g, "")) : false;

            description = description ? description : "";
            groupOwner = groupOwner ? groupOwner : "";
            groupId = groupId.split("-")[1];
            groupInfo = new Group(
                name,
                description,
                groupId,
                members,
                admins,
                isLocked
            );
            author = new Author(
                author.jid,
                author.name,
                author.chatJid,
                senderIsAdmin,
                undefined as any,
                senderIsGroupOwner,
                false
            )
            bot.groupsData[groupCacheId] = { lastFetchDate: Date.now(), groupData: groupInfo }
        }
    }
    return {
        groupInfo,
        author
    }
}

export function convertNumberToMention(text: string): string[] | string {
    const regex = /@[0-9]{12}/g;
    if (regex.test(text)) {
        return text.match(regex)?.map(number => `${number.replace("@", "")}@s.whatsapp.net`) ?? "";
    }
    return "";
}
