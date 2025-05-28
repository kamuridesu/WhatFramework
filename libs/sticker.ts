import { Sticker, StickerTypes } from "wa-sticker-formatter";

import { Bot } from "../src/modules/bot.js";
import * as fs from "fs";
import { IBot, IMessage } from "../@types/types.js";
import { saveTempFile } from "../src/funcs/networking.js";
import { downloadMediaMessage } from "baileys";
import { Language } from "./lang/language.js";
import { parseMessage } from "../src/funcs/parser.js";

import pkgff from "fluent-ffmpeg";
const ffmpeg = pkgff;

async function createSticker(
  context: IMessage,
  bot: Bot,
  author: string,
  packname: string,
): Promise<IMessage | undefined> {
  const language = new Language(bot).get();
  const isStickerMedia =
    ["imageMessage", "videoMessage"].includes(context.type) ||
    ["imageMessage", "videoMessage"].includes(context.quotedMessageType);
  if (isStickerMedia) {
    const messageMedia = context.hasQuotedMessage
      ? JSON.parse(
          JSON.stringify(context.originalMessage).replace("quotedM", "m"),
        ).message.extendedTextMessage.contextInfo
      : context.originalMessage;
    const mediaBuffer = await downloadMediaMessage(messageMedia, "buffer", {});
    let tempFile = await saveTempFile(mediaBuffer);
    if (
      context.type == "videoMessage" ||
      context.quotedMessageType == "videoMessage"
    ) {
      return await scaleAnimatedMedia(tempFile, bot, context, packname, author);
    } else {
      return createStickerFromMedia(tempFile, bot, context, packname, author);
    }
  }
  return bot.replyText(context, language.missingStickerMedia);
}

async function scaleAnimatedMedia(
  tempFile: string,
  bot: IBot,
  context: IMessage,
  author: string,
  packname: string,
) {
  const randomFilename = `${tempFile}_${Math.random() * 1000}`;
  let msg: IMessage | undefined = undefined;
  ffmpeg(`${tempFile}`)
    .input(tempFile)
    .on("start", (cmd: string) => {
      console.info(cmd);
    })
    .on("error", async (err: Error) => {
      console.error(err);
      // fs.unlinkSync(tempFile);
    })
    .on("end", async () => {
      msg = await createStickerFromMedia(
        randomFilename,
        bot,
        context,
        packname,
        author,
      );
      fs.unlinkSync(tempFile);
    })
    .addOutputOptions([
      "-vcodec",
      "libwebp",
      "-vf",
      "scale='min(160,iw)':min'(160,ih)':force_original_aspect_ratio=decrease,fps=10, pad=160:160:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
    ])
    .toFormat("webp")
    .save(randomFilename);
  return msg;
}

async function createStickerFromMedia(
  tempFile: string,
  bot: IBot,
  context: IMessage,
  packname: string,
  author: string,
): Promise<IMessage | undefined> {
  const sticker = new Sticker(tempFile, {
    pack: packname,
    author: author,
    type: StickerTypes.DEFAULT,
    quality: 100,
    background: "#00FFFFFF",
  });
  const message = await bot.connection?.sendMessage(
    context.author.chatJid,
    await sticker.toMessage(),
  );
  fs.unlinkSync(tempFile);
  if (message) return await parseMessage(message, bot);
  return undefined;
}

export { createSticker, createStickerFromMedia };
