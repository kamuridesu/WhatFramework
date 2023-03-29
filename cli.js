#!/usr/bin/env node
import _path from 'path';

import { Bot } from "./src/modules/bot.js";
import { load } from './src/modules/dynamicModules.js'
import { MessageHandler } from "./src/modules/messageHandler.js";
import fs from "fs";

async function main() {
    const path = _path;
    fs.mkdirSync("./temp", { recursive: true })
    const ROOT_PATH = process.cwd();
    let MODULES_PATH = path.join(ROOT_PATH, "modules");
    if (process.env.DEBUG) {
        MODULES_PATH = path.join(ROOT_PATH, "test_modules");
    }
    const ENTRYPOINT = path.join(MODULES_PATH, "entrypoint.js")
    const ENTRYPOINT_MODULE = await load(ENTRYPOINT);
    const messageHandler = new MessageHandler(new ENTRYPOINT_MODULE.Entrypoint());

    const bot = new Bot();
    await bot.init(messageHandler);
}

main()