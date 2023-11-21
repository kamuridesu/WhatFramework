import { GroupParticipant, WAMessage } from "@whiskeysockets/baileys";
import { IBot, Media, IMessage, IAuthor, IGroup } from "../../@types/types.js";

export class Author implements IAuthor {
    constructor(
        public jid: string,
        public name: string,
        public chatJid: string,
        public isAdmin: boolean,
        public isBotOwner: boolean,
        public isGroupOwner: boolean,
        public isBot: boolean
    ) {
        this.jid = jid;
        this.isAdmin = isAdmin;
        this.isBotOwner = isBotOwner;
        this.isGroupOwner = isGroupOwner;
        this.isBot = isBot;
    }
}

export class Group implements IGroup {
    constructor(
        public name: string,
        public description: string,
        public groupId: string,
        public members: GroupParticipant[],
        public admins: GroupParticipant[],
        public locked: boolean,
        public welcomeOn?: boolean,
    ) {
        this.name = name;
        this.description = description;
        this.groupId = groupId;
        this.members = members;
        this.admins = admins;
        this.locked = locked;
        this.welcomeOn = welcomeOn;
    }
}

export class Message implements IMessage {
    constructor(
        public bot: IBot,
        public originalMessage: WAMessage,
        public type: string,
        public body: string,
        public mentionedUsers: string[],
        public author: IAuthor,
        public messageSender: string,
        public senderName: string,
        public messageIsFrom: string,
        public senderIsBotOwner: boolean,
        public chatIsGroup: boolean,
        public isMedia: boolean,
        public hasQuotedMessage: boolean,
        public quotedMessageType: any,
        public quotedMessage: any,
        public isReactionMessage: boolean,
        public reactionMessage: any,
        public group?: IGroup,
    ) {
        this.bot = bot;
        this.originalMessage = originalMessage;
        this.type = type;
        this.body = body;
        this.mentionedUsers;
        this.author = author;
        this.group = group;
        this.messageSender = messageSender;
        this.senderName = senderName;
        this.messageIsFrom = messageIsFrom;
        this.senderIsBotOwner = senderIsBotOwner;
        this.chatIsGroup = chatIsGroup;
        this.isMedia = isMedia;
        this.hasQuotedMessage = hasQuotedMessage;
        this.quotedMessageType = quotedMessageType;
        this.quotedMessage = quotedMessage;
        this.isReactionMessage = isReactionMessage;
        this.reactionMessage = reactionMessage;
    }

    replyText(text: string, options?: {}): Promise<IMessage | undefined> {
        return this.bot.replyText(this, text, options);
    }

    replyMedia(
        media: string | Media,
        messageType: string,
        mimeType?: string | undefined,
        mediaCaption?: string | undefined,
        options?: {}
    ): Promise<IMessage | undefined> {
        return this.bot.replyMedia(this, media, messageType, mimeType, mediaCaption, options);
    }

    react(reaction: string): Promise<IMessage | undefined> {
        const reactionMessage = {
            react: {
                text: reaction,
                key: this.originalMessage.key
            }
        };
        return this.bot.reactMessage(this, reactionMessage);
    }
}
