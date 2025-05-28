
import { Bot } from "../src/modules/bot.js";
import { IBot } from "../@types/types.js";
import { EntryPoint } from "../@types/types.js";

export function botFactory(entryPointClass: EntryPoint): IBot {
    return new Bot(entryPointClass.botName,
        entryPointClass.prefix,
        entryPointClass.ownerNumber,
        entryPointClass.language ? entryPointClass.language : "en-us",
        entryPointClass.postgresConfig ? entryPointClass.postgresConfig : undefined
    );
}

export async function getTotalVideoBufferLengthInSeconds(buffer: Buffer) {
    const start = buffer.indexOf(Buffer.from("mvhd")) + 16;
    const timeScale = buffer.readUInt32BE(start);
    const duration = buffer.readUInt32BE(start + 4);
    const lengthInSeconds = Math.floor(duration / timeScale);
    return lengthInSeconds;
}
