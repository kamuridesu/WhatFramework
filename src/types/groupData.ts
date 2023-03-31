/**
 * Class to hold group data
 */
class GroupData {
  /**
   * @param name group name
   * @param description group description
   * @param groupId group ID
   * @param members group members
   * @param admins group admins
   * @param groupOwner group owner
   * @param senderIsOwner sender is group owner
   * @param botIsAdmin bot is group admin
   * @param senderIsAdmin sender is group admin
   * @param locked group is locked for members message
   * @param welcomeOn group has welcome message enabled
   */
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

export { GroupData };
