import { GroupParticipant, WAMessage, downloadMediaMessage, reduceBinaryNodeToDictionary } from "@whiskeysockets/baileys";
import { IBot, Media, IMessage, IAuthor, IGroup, IQuotedMessageUnparsed } from "../../@types/types.js";
import internal from "stream";
import { IQuotedMessageParsed } from "../../@types/message.js";

export class Author implements IAuthor {
    private group: IGroup | undefined;

    constructor(
        public jid: string,
        public name: string,
        public chatJid: string,
        public isBotOwner: boolean,
        public isBot: boolean,
        group: IGroup | undefined
    ) {
        this.jid = jid;
        this.isBotOwner = isBotOwner;
        this.isBot = isBot;
        this.group = group;
    }

    get isGroupOwner(): Promise<boolean> {
        return (async () => {
            if (this.group != undefined) return (await this.group.members).filter(x => x.isSuperAdmin).map(x => x.id).includes(this.jid);
            return false;
        })();
    }

    get isAdmin(): Promise<boolean> {
        return (async () => {
            if (this.group) return (await this.group.admins).map(x => x.id).includes(this.jid);
            return false;
        })();
    }
}

export class QuotedMessageParsed implements IQuotedMessageParsed {
    author: Author;
    stanzaId: string;
    body: string;
    constructor(
        unparsedQuotedMessage: IQuotedMessageUnparsed,
        chatJid: string,
    ) {
        this.stanzaId = unparsedQuotedMessage.stanzaId;
        this.author = new Author(unparsedQuotedMessage.participant, "unknown", chatJid, false, false, undefined);
        this.body = this.parseBody(unparsedQuotedMessage.message);
    }

    parseBody(body: any): string {
        if (body == undefined) return "";
        if (body.conversation) {
            return body.conversation;
        }
        if (body.imageMessage) {
            return body.imageMessage.caption;
        }
        if (body.videoMessage) {
            return body.videoMessage.caption;
        }
        return "";
    }

}

export class Group implements IGroup {
    private bot: IBot;
    private context: string;

    private __name: string | undefined;
    private __description: string | undefined;
    private __groupId: string | undefined;
    private __members: GroupParticipant[] | undefined;
    private __admins: GroupParticipant[] | undefined;
    private __locked: boolean | undefined;
    private __botIsAdmin: boolean | undefined;

    constructor(
       bot: IBot,
       originJid: string
    ) {
        this.bot = bot;
        this.context = originJid;
    }

    get name(): Promise<string> {
        return (async () => {
            if (this.__name != undefined) {
                return this.__name;
            }
            const x = (await this.bot.connection!.groupMetadata(this.context)).subject;
            this.__name = x;
            return x;
        })();
    }

    set name(n: string) {
        this.name = n;
    }

    get description(): Promise<string | undefined> {
        return (async () => {
            if (this.__description != undefined) {
                return this.__description
            }
            const desc = (await this.bot.connection!.groupMetadata(this.context)).desc;
            this.__description = desc;
            return desc;
        })();
    }

    set description(d: string | undefined) {
        this.__description = d;
    }

    get groupId(): Promise<string> {
        return (async () => {
            if (this.__groupId != undefined) return this.__groupId;
            const id = (await this.bot.connection!.groupMetadata(this.context)).id;
            this.__groupId = id;
            return id;
        })();
    }

    set groupId(g: string) {
        this.__groupId = g;
    }

    get members(): Promise<GroupParticipant[]> {
        return (async () => {
            if (this.__members != undefined) return this.__members;
            const members = (await this.bot.connection!.groupMetadata(this.context)).participants;
            this.__members = members;
            return members;
        })();
    }

    set members(m: GroupParticipant[]) {
        this.__members = m;
    }
    
    get admins(): Promise<GroupParticipant[]> {
        return (async () => {
            if (this.__admins != undefined) return this.__admins;
            const a = (await this.bot.connection!.groupMetadata(this.context))
                    .participants
                    .filter((element) => element.admin === "admin" || element.admin === "superadmin");
            this.__admins = a;
            return a;
        })();
    }

    set admins(m: GroupParticipant[]) {
        this.__admins = m;
    }
    
    get locked(): Promise<boolean> {
        return (async () => {
            const announce = (await this.bot.connection!.groupMetadata(this.context)).announce;
            return announce !== undefined ? JSON.parse(JSON.stringify(announce).replace(/"/g, "")) : false;
        })();
    }

    set locked(l: boolean) {
        this.__locked = l;
    }

    get botIsAdmin(): Promise<boolean> {
        return (async () => {
            if (this.__botIsAdmin != undefined) return this.botIsAdmin;
            const b = (await this.admins).map(x => x.id).includes(this.bot.botNumber!);
            this.__botIsAdmin = b;
            return b;
        })();
    }

    set botIsAdmin(l: boolean) {
        this.__botIsAdmin = l;
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
        public quotedMessage: IMessage | undefined | IQuotedMessageParsed,
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
