/**
 * Class to hold group data
 */
class GroupData {
    /**
     * @param {string} name group name
     * @param {string} description group description
     * @param {string} groupId group ID
     * @param {Array} members group members
     * @param {Array} admins group admins
     * @param {string} groupOwner group owner
     * @param {boolean} senderIsOwner sender is group owner
     * @param {boolean} botIsAdmin bot is group admin
     * @param {boolean} senderIsAdmin sender is group admin
     * @param {boolean} locked group is locked for members message
     */
    constructor(name, description, groupId, members, admins, groupOwner, senderIsOwner, botIsAdmin, senderIsAdmin, locked, welcomeOn) {
        this.name = name;
        this.description = description;
        this.groupId = groupId;
        this.members = members;
        this.admins = admins;
        this.groupOwner = groupOwner;
        this.senderIsOwner = senderIsOwner;
        this.botIsAdmin = botIsAdmin;
        this.senderIsAdmin = senderIsAdmin;
        this.locked = locked;
    }
}

export {
    GroupData
};