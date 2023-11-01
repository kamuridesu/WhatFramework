
import { Bot } from "../src/modules/bot.js";
import { IBot } from "../src/@types/types.js";
import { EntryPoint } from "../src/@types/types.js";

function botFactory(entryPointClass: EntryPoint, commandsFilename: string): IBot {
    return new Bot(entryPointClass.name,
        entryPointClass.prefix,
        entryPointClass.botNumber,
        entryPointClass.ownerNumber,
        commandsFilename,
        entryPointClass.language ? entryPointClass.language : "en-us"
    );
}

export { botFactory };
