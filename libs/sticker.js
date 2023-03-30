import { exec } from "child_process";
import pkgff from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { Bot } from "../src/modules/bot.js";
import { MessageData } from "../src/types/messageData.js";
import { saveTempFile } from "../src/funcs/networking.js";
import { downloadMediaMessage } from "@adiwajshing/baileys";
const ffmpeg = pkgff;

/**
 Creates a sticker from an image or video message.
    @param {string} message - The command message sent by the user.
    @param {object} context - The message context object.
    @param {object} bot - The WhatsApp bot instance.
    @returns {Promise<string>} - A Promise that resolves with the sticker URL, or rejects with an error.
*/
async function createSticker(context, bot, author, packname) {
    const isStickerMedia = (["imageMessage", "videoMessage"].includes(context.type) || ["imageMessage", "videoMessage"].includes(context.quotedMessageType));
    if (isStickerMedia){
        const messageMedia = context.hasQuotedMessage ? JSON.parse(JSON.stringify(context.originalMessage).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : context.originalMessage;
        const mediaBuffer = await downloadMediaMessage(messageMedia, "buffer");
        const tempFile = await saveTempFile(mediaBuffer);
        return createStickerFromMedia(tempFile, bot, context, packname, author);
    }
}

/**
 * 
 * @param {string} media media filename
 * @param {Bot} ctx bot instance
 * @param {MessageData} messageData 
 * @param {string | undefined} packName 
 * @param {string | undefined} author 
 */
async function createStickerFromMedia(media, ctx, messageData, packName, author) {
    const randomFilename = "temp/sticker" + (Math.random() * 1000) + ".png";
    ffmpeg(`${media}`)
        .input(media)
        .on('start', (cmd) => {
            console.info(cmd);
        })
        .on('error', async (err) => {
            console.error(err);
            fs.unlinkSync(media);
        })
        .on('end', async () => {
            exec(`webpmux -set exif \"${await stickerMetadata(author, packName)}\" ${randomFilename} -o ${randomFilename}`, async (error) => {
                if (error) {
                    console.error(error);
                    fs.unlinkSync(media);
                    fs.unlinkSync(randomFilename);
                    return {
                        error: error
                    };
                }
                await ctx.replyMedia(messageData, randomFilename, "sticker");
                fs.unlinkSync(media);
                fs.unlinkSync(randomFilename);
            });
        })
        .addOutputOptions(["-vcodec",
            "libwebp",
            "-vf",
            "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
        ])
        .toFormat("webp")
        .save(randomFilename);
}

/**
 * @param {string} author 
 * @param {string} packName 
 * @returns {Promise<string>} Promise
 */
async function stickerMetadata(author, packName) {
    const packageName = packName ? packName : "bot";
    const authorName = author ? author.replace(/[^a-zA-Z0-9]/g, '') : "bot";
    const filename = path.join(process.cwd(), "temp", `${authorName}_${packageName}.exif`);
    if (fs.existsSync(filename)) {
        return filename;
    }

    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
    const exifHeader = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];
    const jsonPayload = JSON.stringify({
        "sticker-pack-name": packageName,
        "sticker-pack-publisher": authorName,
    });
    let lastJsonByteHex = undefined;

    let jsonSize = jsonPayload.length;

    if (jsonSize > 256) {
        jsonSize = 256;
        exifHeader.unshift(0x01);
    } else {
        exifHeader.unshift(0x00);
    }

    lastJsonByteHex = jsonSize.toString(16);
    if (jsonSize < 16) {
        lastJsonByteHex = "0" + jsonSize;
    }

    const lastJsonByteHexBuffer = Buffer.from(lastJsonByteHex, "hex");
    const exifHeaderBuffer = Buffer.from(exifHeader);
    const jsonPayloadBuffer = Buffer.from(jsonPayload);
    const exifDataBuffer = Buffer.concat([littleEndian, lastJsonByteHexBuffer, exifHeaderBuffer, jsonPayloadBuffer]);

    fs.writeFileSync(filename, exifDataBuffer, (error) => {
        if (error) {
            console.error(error);
        }
    });
    return filename;
}

export {
    createSticker,
    createStickerFromMedia
};
