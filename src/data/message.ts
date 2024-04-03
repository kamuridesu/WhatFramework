import { GroupParticipant, WAMessage, downloadMediaMessage } from "@whiskeysockets/baileys";
import { IBot, Media, IMessage, IAuthor, IGroup, IQuotedMessageUnparsed } from "../../@types/types.js";
import internal from "stream";

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
        public chatIsGroup: boolean,
        public isMedia: boolean,
        public hasQuotedMessage: boolean,
        public quotedMessageType: any,
        public quotedMessage: IMessage | undefined | IQuotedMessageUnparsed,
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

    edit(text: string, options?: {}): Promise<IMessage | undefined> {
        return this.bot.sendTextMessage(this, text, { edit: this.originalMessage.key, ...options });
    }

    async downloadMedia(): Promise<Media> {
        const messageMedia = this.hasQuotedMessage ? JSON.parse(JSON.stringify(this.originalMessage).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : this.originalMessage;
        const media = await downloadMediaMessage(messageMedia, "buffer", {});
        return {
            media: media as Buffer,
            messageType: this.type,
            mimeType: "",
            error: undefined
        }
    }
}
