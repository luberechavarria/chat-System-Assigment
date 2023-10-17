const userService =  require("../services/users");
const channelsService =  require("../services/channels");
/**
 * Authenticates a user by verifying the provided username and password.
 *
 * @async
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password associated with the username.
 * @returns {Promise<Object|null>} A promise that resolves to the authenticated user object if successful, or null if authentication fails.
 * @throws {Error} An error object is thrown if an exception occurs during the authentication process.
 */

const login = async(username, password) => {
  try {
    const userFound = await userService.getUserByUsernameAndPassword(username, password);
    
    if (userFound) {
      await userService.updateUser(userFound._id, {$set:{login: true}});
      
      return userFound;
    } else {
        return null;getUsersFromChannel
    }
   
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

/**
 * Retrieves a list of users associated with a specific channel by its unique channelId.
 *
 * @async
 * @param {string} channelId - The unique identifier of the channel for which users are being retrieved.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects associated with the specified channel.
 * @throws {Error} An error object is thrown if an exception occurs during the retrieval process.
 */
const getUsersFromChannel = async(channelId) => {
  try{
    const channelClicked = await channelsService.getChannelById(channelId);
   
    let channelUserIds = channelClicked.usersIdChannel || [];
  
    let usersChannel = [];

    for (let i=0; i<channelUserIds.length; i++){
      const user = await userService.getUserById(channelUserIds[i]);
      usersChannel.push(user);
    };
    
    return usersChannel;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

/**
 * Updates the role of a user identified by their unique userId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user whose role is to be updated.
 * @param {string} newRole - The new role to assign to the user.
 * @returns {Promise<Object>} A promise that resolves to the result of the role update operation.
 * @throws {Error} An error object is thrown if an exception occurs during the role update process.
 */
const updateRole = async(userId, newRole) => {
  try{
    const result = await userService.updateRole(userId, newRole)
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

/**
 * Retrieves a user's information based on their unique userId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user to be retrieved.
 * @returns {Promise<Object>} A promise that resolves to the user object with the specified userId.
 * @throws {Error} An error object is thrown if an exception occurs during the user retrieval process.
 */
const getUserById = async(userId) => {
  try{
    const result = await userService.getUserById(userId)
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

/**
 * Removes a user from the system using their unique userId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user to be removed from the system.
 * @returns {Promise<Object>} A promise that resolves to the result of the user removal operation.
 * @throws {Error} An error object is thrown if an exception occurs during the user removal process.
 */
const removeUser = async(userId) => {
  try{
    const result = await userService.removeUser(userId);
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}
/**
  * Creates a new user with the provided user data or checks if a user with the same username already exists.
  *
  * @async
  * @param {Object} newUser - The user data used for creating the new user.
  * @property {string} username - The username of the new user.
  * @property {string} password - The password of the new user.
  * @returns {Promise<Object|{userExists: true}>} A promise that resolves to the newly created user object if successful or an object with `{userExists: true}` if a user with the same username already exists.
  * @throws {Error} An error object is thrown if an exception occurs during user creation or when checking for user existence.
* */
const createNewUser = async(newUser) => {
  try{
    const userExists = await userService.getUserByUsername(newUser.username);
    if (userExists) {
      return { userExists: true };
    }
    const user = await userService.createNewUser({
      ...newUser,
      roles: ['user'], // By default set 'user' role
    });
    return user;
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Retrieves a list of users based on the role of the specified user identified by their unique userId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user whose role is used to filter other users.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects based on the user's role.
 * @throws {Error} An error object is thrown if an exception occurs during the user retrieval process.
 */
const getUsersByRole = async (userId) => {
  const user = await userService.getUserById(userId);
  if (user) {
    const isGroupAdmin = user?.roles?.includes('groupAdmin');
    const isSuperAdmin = user?.roles?.includes('superAdmin');
    if(isSuperAdmin){
      return await userService.getAllUsers();
    }else if(isGroupAdmin) { 
      return [];
    } else {
      return [];
    }
  }
  return [];

}

/**
 * Adds a user to a specified group identified by their unique userId and groupId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user to be added to the group.
 * @param {string} groupId - The unique identifier of the group to which the user will be added.
 * @returns {Promise<Object>} A promise that resolves to the result of the user addition to the group operation.
 * @throws {Error} An error object is thrown if an exception occurs during the user addition process.
 */
const addUserToGroup = async(userId, groupId) => {
  try{
    const result = await userService.addUserToGroup(userId, groupId);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Removes a user from a specified group identified by their unique userId and groupId.
 *
 * @async
 * @param {string} userId - The unique identifier of the user to be removed from the group.
 * @param {string} groupId - The unique identifier of the group from which the user will be removed.
 * @returns {Promise<Object>} A promise that resolves to the result of the user removal from the group operation.
 * @throws {Error} An error object is thrown if an exception occurs during the user removal process.
 */
const removeUserFromGroup = async(userId, groupId) => {
  try{
    const result = await userService.removeUserFromGroup(userId, groupId);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}


module.exports = {
  login,
  getUsersFromChannel,
  updateRole,
  removeUser,
  createNewUser,
  getUsersByRole,
  getUsersFromChannel,
  addUserToGroup,
  removeUserFromGroup,
  getUserById
};

