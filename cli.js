#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Bot } from './src/modules/bot.js';
import { load } from './src/modules/dynamicModules.js';
import { MessageHandler } from './src/modules/messageHandler.js';

async function initializeFramework() {
  const rootPath = process.cwd();
  const modulesPath = process.env.DEBUG
    ? path.join(rootPath, 'test_modules')
    : path.join(rootPath, 'modules');

  fs.mkdirSync('./temp', { recursive: true });

  const entryPoint = path.join(modulesPath, 'entrypoint.js');
  const entryPointModule = await load(entryPoint);
  const entryPointClass = new entryPointModule.Entrypoint();
  const messageHandler = new MessageHandler(entryPointClass);

  const bot = new Bot(entryPointClass.prefix, entryPointClass.botNumber, entryPointClass.ownerNumber);
  await bot.init(messageHandler);
}

initializeFramework();

export default initializeFramework;
