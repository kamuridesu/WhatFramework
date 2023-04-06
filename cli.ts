#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Bot } from './src/modules/bot.js';
import { load } from './src/modules/dynamicModules.js';
import { wasCalledAsScript } from './src/funcs/util.js';
import { MessageHandler } from './src/modules/messageHandler.js';

const SUPPORTED_LANGUAGES = ["en-us", "pt-br"];

async function initializeFramework(): Promise<void> {
    const rootPath = process.cwd();
    const modulesPath = process.env.DEBUG
        ? path.join(rootPath, 'test_modules')
        : path.join(rootPath, 'modules');

    fs.mkdirSync('./temp', { recursive: true });

    const entryPoint = path.join(modulesPath, 'entrypoint.js');
    const entryPointModule = await load(entryPoint);
    const entryPointClass: any = new entryPointModule.Entrypoint();
    const messageHandler = new MessageHandler(entryPointClass);
    if (entryPointClass.language) {
        if (!SUPPORTED_LANGUAGES.includes(entryPointClass.language)) {
            throw new Error("Language is not supported!");
        }
    }
    const commandsFilename = path.join(modulesPath, entryPointClass.commandsFilename);
    const bot = new Bot(entryPointClass.botName, entryPointClass.prefix, entryPointClass.botNumber, entryPointClass.ownerNumber, commandsFilename, entryPointClass.language ? entryPointClass.language : "en-us");
    await bot.init(messageHandler);
}
if (wasCalledAsScript()) {
    initializeFramework();
}

export default initializeFramework;
