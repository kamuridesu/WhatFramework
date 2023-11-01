#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { load } from './src/modules/dynamicModules.js';
import { botFactory } from './libs/util.js';
import { MessageHandler } from './src/modules/messageHandler.js';
import { EntryPoint } from 'src/@types/types.js';

const SUPPORTED_LANGUAGES = ["en-us", "pt-br"];

async function initializeFramework(entrypointFile: string | undefined = undefined): Promise<void> {
    const rootPath = process.cwd();
    const modulesPath = process.env.DEBUG
        ? path.join(rootPath, 'test_modules')
        : path.join(rootPath, 'modules');

    fs.mkdirSync('./temp', { recursive: true });

    if (entrypointFile == undefined) {
        entrypointFile = path.join(modulesPath, "entrypoint.js");
    } else {
        entrypointFile = path.resolve(entrypointFile);
    }
    const entryPoint = path.join(entrypointFile);
    const entryPointModule = await load(entryPoint);
    const entryPointClass: EntryPoint = new (entryPointModule.Entrypoint as any)();

    if (entryPointClass.language) {
        if (!SUPPORTED_LANGUAGES.includes(entryPointClass.language)) {
            throw new Error("Language is not supported!");
        }
    } else {
        entryPointClass.language = "en-us";
    }

    const messageHandler = new MessageHandler(entryPointClass);
    const commandsFilename = path.join(modulesPath, 
        entryPointClass.commandsFilename
        ? entryPointClass.commandsFilename 
        : "");
    const bot = botFactory(entryPointClass, commandsFilename);

    await bot.init(messageHandler);
}

initializeFramework(process.argv[2]);

export { initializeFramework };
