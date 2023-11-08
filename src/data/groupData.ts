import { IGroupData } from "../../@types/types.js";

export class GroupData implements IGroupData {
    constructor(
        public name: string,
        public description: string,
        public groupId: string,
        public members: Array<any>,
        public admins: Array<any>,
        public groupOwner: string,
        public senderIsOwner: boolean,
        public botIsAdmin: boolean,
        public senderIsAdmin: boolean,
        public locked: boolean,
        public welcomeOn?: boolean
    ) { }
}
