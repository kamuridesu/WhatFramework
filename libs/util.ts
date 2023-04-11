
import { Bot } from "../src/modules/bot.js";

function botFactory(entryPointClass: any, commandsFilename: string): Bot {
    return new Bot(entryPointClass.botName, entryPointClass.prefix, entryPointClass.botNumber, entryPointClass.ownerNumber, commandsFilename, entryPointClass.language ? entryPointClass.language : "en-us");
}


export { botFactory };
