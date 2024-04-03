import { IBot, IMessage, IAuthor, IGroup, IQuotedMessageUnparsed,  } from "../../@types/types.js";
import { WAMessage, proto } from "@whiskeysockets/baileys";
import { Message, Group, Author, QuotedMessageParsed,  } from "../data/message.js";
import { IQuotedMessageParsed } from "../../@types/message.js";

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

    const originJid = message.key.remoteJid ? message.key.remoteJid : "";

    let body: string | undefined | null;
    let mentionedUsers: string[] | undefined | null = [];
    let hasQuotedMessage: boolean = false;
    let quotedMessageType: string | undefined;
    let unparsedQuotedMessage: IQuotedMessageUnparsed | undefined;
    let quotedMessage: IMessage | undefined | IQuotedMessageParsed;
    let isReactionMessage: boolean = false;
    let reactionMessage: any = undefined;

    const type = messageTypes.find(type => Object.keys(key).includes(type));
    const isMedia = ["imageMessage", "videoMessage"].includes(type as string);
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
            if (quotedMessageType != undefined) {
                mentionedUsers = message.message?.extendedTextMessage?.contextInfo?.mentionedJid;
                unparsedQuotedMessage = JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo;
                // const unparsedMessage = await bot.loadMessageById(originJid, unparsedQuotedMessage?.stanzaId!);
                // await parseMessage(unparsedQuotedMessage);
                // if (unparsedMessage) quotedMessage = (await parseMessage(unparsedMessage, bot));

            }
            break;
        case "reactionMessage":
            isReactionMessage = true;
            reactionMessage = message.message?.reactionMessage;
            break;
    }
    body = body ? body : "";
    mentionedUsers = mentionedUsers ? mentionedUsers : [];
    quotedMessageType = quotedMessageType ? quotedMessageType : "";

    const {
        messageSender,
        senderName,
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
        bot.ownerNumber == messageSender.split("@")[0],
        false,
        bot.botNumber + "@s.whatsapp.net" == messageSender,
    );

    if (isGroup) {
        ({ groupInfo } = await parseGroup(
            originJid,
            bot,
        ));
        const senderIsGroupOwner = groupInfo?.members.some((element) => element.admin === "superadmin");
        const senderIsAdmin = groupInfo?.members.some((element) => element.id === messageSender && (element.admin === "admin" || element.admin === "superadmin"));
        const botIsAdmin = groupInfo?.members.some((element) => element.id === bot.botNumber && (element.admin === "admin" || element.admin === "superadmin"));
        if (groupInfo) groupInfo.botIsAdmin = botIsAdmin;
        author = author = new Author(
            author.jid,
            author.name,
            author.chatJid,
            senderIsAdmin ? senderIsAdmin : false,
            author.isBotOwner,
            senderIsGroupOwner ? senderIsGroupOwner : false,
            author.isBot
        )
    }
    if (unparsedQuotedMessage)
    quotedMessage = new QuotedMessageParsed(unparsedQuotedMessage, author.chatJid);

    return new Message(
        bot,
        message,
        type as string,
        body,
        mentionedUsers,
        author as IAuthor,
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

async function parseGroup(originJid: string, bot: IBot) {
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
            bot.groupsData[groupCacheId] = { lastFetchDate: Date.now(), groupData: groupInfo }
        }
    }
    return {
        groupInfo,

    }
}

export function convertNumberToMention(text: string): string[] | string {
    const regex = /@[0-9]{12}/g;
    if (regex.test(text)) {
        return text.match(regex)?.map(number => `${number.replace("@", "")}@s.whatsapp.net`) ?? "";
    }
    return "";
}
