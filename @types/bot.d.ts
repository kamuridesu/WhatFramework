import { GroupMetadata, makeWASocket, ParticipantAction, proto } from "@whiskeysockets/baileys";
import { WAMessage, WAMessageKey } from "@whiskeysockets/baileys";
import { IMessage, IReactionMessage } from "./message.js";
import { IGroup, Media } from './types.js';
import Translations from "../libs/lang/interface.js";

interface GroupsData {
    [groupId: string]: {
        lastFetchDate: number;
        groupData: IGroup
    }
}

export interface IMessageHandler {
    handle: (message: WAMessage, bot: IBot) => Promise<void>
    handleRemoveMember(data: {
        id: string;
        author: string;
        participants: string[];
        action: ParticipantAction;
    }, bot: IBot): Promise<void>
    handleNewMember(data: {
        id: string;
        author: string;
        participants: string[];
        action: ParticipantAction;
    }, bot: IBot): Promise<void>
}

export interface IBot {
    connection?: ReturnType<typeof makeWASocket>;

    readonly name: string;
    readonly prefix: string;
    botNumber?: string;
    readonly ownerNumber: string;
    readonly language: string;
    readonly lang: Translations;
    reconnectOnClose: boolean;

    init(messageHandler: IMessageHandler): Promise<void>;

    getMessage(key: proto.IMessageKey): Promise<proto.IMessage | undefined>;

    reply(ctx: IMessage, text?: string, media?: Media, options?: any): Promise<IMessage | undefined>;

    sendTextMessage(ctx: IMessage | string, text: string, options?: {}): Promise<IMessage | undefined>;
    reactMessage(ctx: IMessage | string, reactionMessage: IReactionMessage, options?: any): Promise<IMessage | undefined>
    getGroups(): Promise<{
        [_: string]: GroupMetadata;
    } | undefined>

    loadMessage(ctx: IMessage | WAMessageKey): Promise<IMessage | WAMessage | undefined>;
    loadMessageById(originJid: string, stanzaId: string): Promise<proto.IWebMessageInfo | undefined>;
}
