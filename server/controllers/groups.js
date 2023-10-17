const groupService = require('../services/groups');
const userService = require('../services/users');

/**
 * Retrieves a list of all groups from the database.
 *
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of all group objects in the database.
 * @throws {Error} An error object is thrown if an exception occurs during the retrieval process.
 */
const getAllGroups = async() => {//WORKING MONGO
  try{
    const groups = await groupService.getAllGroups();
    return groups;
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Retrieves a list of groups associated with a user based on their unique userId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user for whom associated groups are to be retrieved.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of group objects associated with the user.
 * @throws {Error} An error object is thrown if an exception occurs during the group retrieval process.
 */
const getGroupsByUserId = async(userId) => {//WORKING MONGO
  try{
    const user = await userService.getUserById(userId);
    const userGroups = user.groups || [];
    const groups = await groupService.getGroupsByIds(userGroups);
    return groups;
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Creates a new group with the provided group data.
 *
 * @async
 * @param {Object} newGroup - The group data to be used for creating the new group.
 * @returns {Promise<Object>} A promise that resolves to the newly created group object.
 * @throws {Error} An error object is thrown if an exception occurs during the group creation process.
 */
const createGroup = async(newGroup) => {
  try{
    const group = await groupService.createGroup(newGroup);
    return group;
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Removes a group from the database based on its unique groupId.
 *
 * @async
 * @param {string} groupId - The unique identifier of the group to be removed.
 * @returns {Promise<Object>} A promise that resolves to the result of the group removal operation.
 * @throws {Error} An error object is thrown if an exception occurs during the group removal process.
 */
const removeGroup = async(groupId) => {//WORKING MONGO
  try{
    const result = await groupService.removeGroup(groupId);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllGroups,
  createGroup,
  removeGroup,
  getGroupsByUserId
}