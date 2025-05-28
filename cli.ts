#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { botFactory } from './libs/util.js';
import { MessageHandler } from './src/modules/messageHandler.js';
import { EntryPoint } from './@types/types.js';

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
    const entryPoint: EntryPoint = new ((await import(path.join(entrypointFile))).Entrypoint as any)();

    if (entryPoint.language) {
        if (!SUPPORTED_LANGUAGES.includes(entryPoint.language)) {
            throw new Error("Language is not supported!");
        }
    } else {
        entryPoint.language = "en-us";
    }

    const messageHandler = new MessageHandler(entryPoint);
    const bot = botFactory(entryPoint);

    await bot.init(messageHandler);
}

initializeFramework(process.argv[2]);

export { initializeFramework };
