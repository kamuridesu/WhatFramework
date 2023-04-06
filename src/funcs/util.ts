import { realpathSync } from "fs";
import { Bot } from "../modules/bot.js";
import { pathToFileURL } from "url";

function wasCalledAsScript(): boolean {
    const realPath = realpathSync(process.argv[1]);
    const realPathAsUrl = pathToFileURL(realPath).href;
    return import.meta.url === realPathAsUrl;
}

function botFactory(entryPointClass: any, commandsFilename: string): Bot {
    return new Bot(entryPointClass.botName, entryPointClass.prefix, entryPointClass.botNumber, entryPointClass.ownerNumber, commandsFilename, entryPointClass.language ? entryPointClass.language : "en-us");
}


export { wasCalledAsScript,
    botFactory };