interface IGroupData {
    name: string,
    description: string,
    groupId: string,
    members: Array<any>,
    admins: Array<any>,
    groupOwner: string,
    senderIsOwner: boolean,
    botIsAdmin: boolean,
    senderIsAdmin: boolean,
    locked: boolean,
    welcomeOn?: boolean
}

export { IGroupData };
