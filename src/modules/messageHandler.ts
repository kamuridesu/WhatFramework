import { Bot } from './bot.js';
import { checkChatMetaData, checkGroupData, checkMessageData } from '../funcs/messageParsers.js';
import { ChatMetadata } from "../types/chatMetadata.js"
import { GroupData } from '../types/groupData.js';
import { MessageData } from '../types/messageData.js';
import { pollParser } from '../funcs/updatesParsers.js';
import { MessageHandler, EntryPoint } from '../types/bot.js';
import { colors } from '../../libs/std.js';

import { WAMessage, WAMessageKey } from '@whiskeysockets/baileys';

class WAMessageHandler implements MessageHandler {
    private isModule: boolean;
    private commandHandlers?: (ctx: Bot,
        command: string,
        args: string[],
        messageData: MessageData,
        groupData: GroupData | undefined,
        chatMetadata: ChatMetadata) => void;
    private chatHandlers?: (ctx: Bot,
        messageBody: string,
        messageData: MessageData,
        groupData: GroupData | undefined,
        chatMetadata: ChatMetadata) => void;

    constructor(entrypoint?: EntryPoint) {
        this.isModule = !!entrypoint;
        if (this.isModule) {
            this.commandHandlers = entrypoint!.commandHandlers;
            this.chatHandlers = entrypoint!.chatHandlers;
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
        const messageData: MessageData | undefined = checkMessageData(message, ctx);
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
                colors.paint(`Message from ${chatMetadata.messageSender.split('@')[0]}: ${messageBody}`, colors.FgCyan, undefined, colors.Bright);
                const command = messageBody.split('/')[1].split(' ')[0].toLowerCase();
                if (command.length === 0) return;
                const args = messageBody.split(' ').slice(1);
                this.commandHandlers!(ctx, command, args, messageData, groupData, chatMetadata);
            } else {
                this.chatHandlers!(ctx, messageBody, messageData, groupData, chatMetadata);
            }
        }
    }

    async handleUpdate(key: WAMessageKey, updates: Partial<WAMessage>, ctx: Bot) {
        if (key) {
            if (updates.pollUpdates) {
                const pollData = await pollParser(key, updates, ctx);
            }
        }
    }
}

export { WAMessageHandler as MessageHandler };
