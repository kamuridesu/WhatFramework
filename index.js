import { Bot } from "./src/modules/bot.js";
import { messageHandler } from "./src/modules/messageHander.js";

const bot = new Bot();

await bot.init(messageHandler);
