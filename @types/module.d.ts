import { PostgreSQLConfig } from "./database";
import { IBot } from "./bot";
import { IMessage } from "./message";

export interface EntryPoint {
    botName: string;
    prefix: string;
    ownerNumber: string;
    language?: string;
    postgresConfig?: PostgreSQLConfig;
    commandHandlers: (ctx: IBot,
        command: string,
        args: string[],
        messageData: IMessage) => void;
    chatHandlers: (ctx: IBot,
        messageBody: string,
        messageData: IMessage) => void;
    addMemberHandlers?: (ctx: IBot,
        data: {
            id: string;
            author: string;
            participants: string[];
        }) => void;
    removeMemberHandlers?: (ctx: IBot,
        data: {
            id: string;
            author: string;
            participants: string[];
        }) => void;
}
