
import { Bot } from "../src/modules/bot.js";
import { IBot } from "../@types/types.js";
import { EntryPoint } from "../@types/types.js";

export function botFactory(entryPointClass: EntryPoint, commandsFilename: string): IBot {
    return new Bot(entryPointClass.botName,
        entryPointClass.prefix,
        entryPointClass.botNumber,
        entryPointClass.ownerNumber,
        commandsFilename,
        entryPointClass.language ? entryPointClass.language : "en-us"
    );
}

export async function getTotalVideoBufferLengthInSeconds(buffer: Buffer) {
    const start = buffer.indexOf(Buffer.from("mvhd")) + 16;
    const timeScale = buffer.readUInt32BE(start);
    const duration = buffer.readUInt32BE(start + 4);
    const lengthInSeconds = Math.floor(duration / timeScale);
    return lengthInSeconds;
}
