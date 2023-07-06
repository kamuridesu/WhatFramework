import { Bot } from './bot.js';
import { checkChatMetaData, checkGroupData, checkMessageData } from '../funcs/messageParsers.js';
import { ChatMetadata } from "../types/chatMetadata.js"
import { GroupData } from '../types/groupData.js';
import { MessageData } from '../types/messageData.js';

import { WAMessage } from '@whiskeysockets/baileys';

interface EntryPoints {
    commandHandlers: Function;
    chatHandlers: Function;
}

class MessageHandler {
    private isModule: boolean;
    private commandHandlers?: Function;
    private chatHandlers?: Function;

    constructor(entrypoint?: EntryPoints) {
        this.isModule = !!entrypoint;
        if (this.isModule) {
            this.commandHandlers = entrypoint?.commandHandlers;
            this.chatHandlers = entrypoint?.chatHandlers;
        }
    }


    async handle(message: WAMessage, ctx: Bot): Promise<void> {
        if (
            !message.message ||
            (message.key && message.key.remoteJid === 'status@broadcast') ||
            (message.key && message.key.id?.startsWith('BAE5') && message.key.id?.length === 16)
        )
            return;

        message.message =
            Object.keys(message.message)[0] === 'ephemeralMessage'
                ? message.message.ephemeralMessage?.message
                : message.message;
        const messageData: MessageData | undefined = checkMessageData(message);
        if (!messageData) {
            return;
        }
        const chatMetadata: ChatMetadata = checkChatMetaData(messageData, ctx);
        let groupData: GroupData | undefined;
        if (chatMetadata.chatIsGroup) {
            groupData = await checkGroupData(messageData, chatMetadata, ctx);
        }

        if (this.isModule && messageData.body) {
            const messageBody = messageData.body;
            if (messageBody.startsWith(ctx.prefix)) {
                const command = messageBody.split('/')[1].split(' ')[0].toLowerCase();
                if (command.length === 0) return;
                const args = messageBody.split(' ').slice(1);
                await this.commandHandlers!(ctx, command, args, messageData, groupData, chatMetadata);
            } else {
                await this.chatHandlers!(ctx, messageBody, messageData, groupData, chatMetadata);
            }
        }
    }
}

export { MessageHandler };
