#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { load } from './src/modules/dynamicModules.js';
import { wasCalledAsScript, botFactory } from './src/funcs/util.js';
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
    const bot = botFactory(entryPointClass, commandsFilename);
    await bot.init(messageHandler);
}
if (!wasCalledAsScript()) {
    initializeFramework();
}

export default initializeFramework;
