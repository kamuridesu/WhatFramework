import { parseMessage } from "../funcs/parser.js";
import { pollParser } from "../funcs/updatesParsers.js";
import {
  IMessageHandler,
  EntryPoint,
  IMessage,
  IBot,
} from "../../@types/types.js";
import { colors } from "../../libs/std.js";

import { ParticipantAction, WAMessage, WAMessageKey } from "baileys";

class WAMessageHandler implements IMessageHandler {
  private isModule: boolean;
  private entryPointHandler?: EntryPoint;

  constructor(entrypoint?: EntryPoint) {
    this.isModule = !!entrypoint;
    if (this.isModule) {
      this.entryPointHandler = entrypoint;
    }
  }

  async handle(message: WAMessage, bot: IBot): Promise<void> {
    if (
      !message.message ||
      (message.key && message.key.remoteJid === "status@broadcast") ||
      (message.key &&
        message.key.id?.startsWith("BAE5") &&
        message.key.id?.length === 16)
    )
      return;

    message.message =
      Object.keys(message.message)[0] === "ephemeralMessage"
        ? message.message.ephemeralMessage?.message
        : message.message;
    const messageData: IMessage | undefined = await parseMessage(message, bot);
    if (!messageData) {
      return;
    }
    if (this.isModule) {
      const messageBody = messageData.body ? messageData.body : "";
      if (messageBody.startsWith(bot.prefix)) {
        const command = messageBody
          .split(bot.prefix)[1]
          .split(" ")[0]
          .toLowerCase();
        colors.paint(
          `Command ${command} from ${messageData.author.name}`,
          colors.FgCyan,
          undefined,
          colors.Bright,
        );
        if (command.length === 0) return;
        const args = messageBody.split(" ").slice(1);
        this.entryPointHandler?.commandHandlers!(
          bot,
          command,
          args,
          messageData,
        );
      } else {
        this.entryPointHandler?.chatHandlers!(bot, messageBody, messageData);
      }
    }
  }

  async handleUpdate(
    key: WAMessageKey,
    updates: Partial<WAMessage>,
    bot: IBot,
  ) {
    if (key) {
      if (updates.pollUpdates) {
        const pollData = await pollParser(key, updates, bot);
      }
    }
  }

  async handleNewMember(
    data: {
      id: string;
      author: string;
      participants: string[];
      action: ParticipantAction;
    },
    bot: IBot,
  ) {
    const newData = {
      id: data.id,
      author: data.author,
      participants: data.participants,
    };
    if (this.entryPointHandler?.addMemberHandlers)
      this.entryPointHandler?.addMemberHandlers(bot, newData);
  }

  async handleRemoveMember(
    data: {
      id: string;
      author: string;
      participants: string[];
      action: ParticipantAction;
    },
    bot: IBot,
  ) {
    const newData = {
      id: data.id,
      author: data.author,
      participants: data.participants,
    };
    if (this.entryPointHandler?.removeMemberHandlers)
      this.entryPointHandler?.removeMemberHandlers(bot, newData);
  }
}

export { WAMessageHandler as MessageHandler };
