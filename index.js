import { Bot } from "./src/modules/bot.js";
import { MessageHandler } from "./src/modules/messageHandler.js";
import fs from "fs";
fs.mkdirSync("./temp", { recursive: true })

const bot = new Bot();
const messageHandler = new MessageHandler();
await bot.init(messageHandler);
