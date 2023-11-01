import { AuthenticationState } from "@whiskeysockets/baileys";
import BaileysBottle from "baileys-bottle-new";
import AuthHandle from "baileys-bottle-new/lib/bottle/AuthHandle";
import StoreHandle from "baileys-bottle-new/lib/bottle/StoreHandle";


export class Database {
    public auth!: AuthHandle;
    public store!: StoreHandle;
    public state!: AuthenticationState
    public saveState!: () => Promise<any>

    public constructor() {
        this.createBottle().catch(e => {console.log(e)});
    }

    async createBottle() {
        const bottle = await BaileysBottle.init({
            type: "sqlite",
            database: "db.sqlite",
        });

        const { auth, store } = await bottle.createStore("clientName");
        const { state, saveState } = await auth.useAuthHandle();
        console.log(state)
        this.auth = auth;
        this.store = store;
        this.state = state;
        this.saveState = saveState;
    }
}
