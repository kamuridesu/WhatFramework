import { WAMessage, proto } from "baileys";
import { IBot, Media } from "./bot";

import { GroupParticipant } from "baileys";

export interface IQuotedMessageUnparsed {
  stanzaId: string;
  participant: string;
  message: {
    conversation: string;
  };
}

export interface IQuotedMessageParsed {
  stanzaId: string;
  author: IAuthor;
  body: string;
}

export interface IGroup {
  name: Promise<string>;
  description: Promise<string | undefined>;
  groupId: Promise<string>;
  members: Promise<GroupParticipant[]>;
  admins: Promise<GroupParticipant[]>;
  locked: Promise<boolean>;
  botIsAdmin?: Promise<boolean>;
}

export interface IAuthor {
  jid: string;
  name: string;
  chatJid: string;
  isAdmin: Promise<boolean>;
  isBotOwner: boolean;
  isGroupOwner: Promise<boolean>;
  isBot: boolean;
}

export interface IMessage {
  bot: IBot;
  originalMessage: WAMessage;
  type: string;
  body: string;
  mentionedUsers: string[];
  author: IAuthor;
  group?: IGroup;
  chatIsGroup: boolean;
  isMedia: boolean;
  hasQuotedMessage: boolean;
  quotedMessageType: any;
  quotedMessage: IMessage | undefined | IQuotedMessageParsed;
  isReactionMessage: boolean;
  reactionMessage: any;

  replyText(text: string, options?: {}): Promise<IMessage | undefined>;

  replyMedia(
    media: string | Media,
    messageType: string,
    mimeType?: string | undefined,
    mediaCaption?: string | undefined,
    options?: {},
  ): Promise<IMessage | undefined>;

  react(reaction: string, options?: {}): Promise<IMessage | undefined>;

  edit(text: string, options?: {}): Promise<IMessage | undefined>;

  downloadMedia(): Promise<Media>;
}

export interface IReactionMessage {
  react: {
    text: string;
    key: proto.IMessageKey;
  };
}
