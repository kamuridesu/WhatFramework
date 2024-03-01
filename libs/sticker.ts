import { createSticker as mcreateSticker, Sticker, StickerTypes } from "wa-sticker-formatter";

import { Bot } from "../src/modules/bot.js";
import * as fs from "fs";
import { IBot, IMessage, Media } from "../@types/types.js";
import { saveTempFile } from "../src/funcs/networking.js";
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import { Language } from "./lang/language.js";
import { parseMessage } from "../src/funcs/parser.js";

async function createSticker(context: IMessage, bot: Bot, author: string, packname: string): Promise<IMessage | undefined> {
    const language = new Language(bot).get();
    const isStickerMedia = (["imageMessage", "videoMessage"].includes(context.type) || ["imageMessage", "videoMessage"].includes(context.quotedMessageType));
    if (isStickerMedia) {
        const messageMedia = context.hasQuotedMessage ? JSON.parse(JSON.stringify(context.originalMessage).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : context.originalMessage;
        const mediaBuffer = await downloadMediaMessage(messageMedia, "buffer", {});
        const tempFile = await saveTempFile(mediaBuffer);
        return createStickerFromMedia(tempFile, bot, context, packname, author);
    }
    return bot.replyText(context, language.missingStickerMedia);
}

async function createStickerFromMedia(tempFile: string, bot: IBot, context: IMessage, packname: string, author: string): Promise<IMessage | undefined> {
    const sticker = new Sticker(tempFile, {
        pack: packname,
        author: author,
        type: StickerTypes.CROPPED,
        quality: 100,
        background: "#00FFFFFF"
    });
    const message = await bot.connection?.sendMessage(context.author.chatJid, await sticker.toMessage());
    fs.unlinkSync(tempFile);
    if (message) return await parseMessage(message, bot);
    return undefined;
}

export {
    createSticker,
    createStickerFromMedia
}
