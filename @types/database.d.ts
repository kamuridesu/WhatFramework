import { AuthenticationCreds, AuthenticationState } from "@whiskeysockets/baileys";

export interface PostgreSQLConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl?: boolean | any;
}
export interface PostgresState {
    creds: AuthenticationCreds;
    keys: {
        get: (type: string, ids: string[]) => Promise<Record<string, any>>;
        set: (data: Record<string, Record<string, any>>) => Promise<void>;
    };
}

export type State = PostgresState | AuthenticationState;
