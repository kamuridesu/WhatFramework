import { Bot } from './bot.js';
import { checkChatMetaData, checkGroupData, checkMessageData } from '../funcs/messageParsers.js';
import { pollParser } from '../funcs/updatesParsers.js';
import { IMessageHandler, EntryPoint, IMessage, IGroupData, IChatMetadata, IBot } from '../@types/types.js';
import { colors } from '../../libs/std.js';

import { WAMessage, WAMessageKey } from '@whiskeysockets/baileys';

class WAMessageHandler implements IMessageHandler {
    private isModule: boolean;
    private commandHandlers?: (ctx: IBot,
        command: string,
        args: string[],
        messageData: IMessage,
        groupData: IGroupData | undefined,
        chatMetadata: IChatMetadata) => void;
    private chatHandlers?: (ctx: IBot,
        messageBody: string,
        messageData: IMessage,
        groupData: IGroupData | undefined,
        chatMetadata: IChatMetadata) => void;

    constructor(entrypoint?: EntryPoint) {
        this.isModule = !!entrypoint;
        if (this.isModule) {
            this.commandHandlers = entrypoint!.commandHandlers;
            this.chatHandlers = entrypoint!.chatHandlers;
        }
    }

    async handle(message: WAMessage, bot: IBot): Promise<void> {
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
        const messageData: IMessage | undefined = checkMessageData(message, bot);
        if (!messageData) {
            return;
        }
        const chatMetadata: IChatMetadata = checkChatMetaData(messageData, bot);
        let groupData: IGroupData | undefined;
        if (chatMetadata.chatIsGroup) {
            groupData = await checkGroupData(messageData, chatMetadata, bot);
        }

        if (this.isModule && messageData.body) {
            const messageBody = messageData.body;
            if (messageBody.startsWith(bot.prefix)) {
                colors.paint(`Message from ${chatMetadata.messageSender.split('@')[0]}: ${messageBody}`, colors.FgCyan, undefined, colors.Bright);
                const command = messageBody.split(bot.prefix)[1].split(' ')[0].toLowerCase();
                if (command.length === 0) return;
                const args = messageBody.split(' ').slice(1);
                this.commandHandlers!(bot, command, args, messageData, groupData, chatMetadata);
            } else {
                this.chatHandlers!(bot, messageBody, messageData, groupData, chatMetadata);
            }
        }
    }

    async handleUpdate(key: WAMessageKey, updates: Partial<WAMessage>, bot: IBot) {
        if (key) {
            if (updates.pollUpdates) {
                const pollData = await pollParser(key, updates, bot);
            }
        }
    }
}

export { WAMessageHandler as MessageHandler };
