
import { Bot } from "../src/modules/bot.js";
import { EntryPoint } from "../src/types/bot.js";

function botFactory(entryPointClass: EntryPoint, commandsFilename: string): Bot {
    return new Bot(entryPointClass.botName,
        entryPointClass.prefix,
        entryPointClass.botNumber,
        entryPointClass.ownerNumber,
        commandsFilename,
        entryPointClass.language ? entryPointClass.language : "en-us"
    );
}

export { botFactory };
