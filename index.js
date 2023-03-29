import { Bot } from "./src/modules/bot.js";
import { messageHandler } from "./src/modules/messageHandler.js";
import fs from "fs";
fs.mkdirSync("./temp", { recursive: true })

const bot = new Bot();

await bot.init(messageHandler);
