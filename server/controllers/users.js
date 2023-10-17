const userService =  require("../services/users");
const channelsService =  require("../services/channels");

const login = async(username, password) => {
  try {
    const userFound = await userService.getUserByUsernameAndPassword(username, password);
    
    if (userFound) {
      await userService.updateUser(userFound._id, {$set:{login: true}});
      
      return userFound;
    } else {
        return null;
    }
   
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getUsersFromChannel = async(channelId) => {//WORKING MONGO
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

const updateRole = async(userId, newRole) => {
  try{
    const result = await userService.updateRole(userId, newRole)
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getUserById = async(userId) => {
  try{
    const result = await userService.getUserById(userId)
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeUser = async(userId) => {
  try{
    const result = await userService.removeUser(userId);
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

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

const addUserToGroup = async(userId, groupId) => {
  try{
    const result = await userService.addUserToGroup(userId, groupId);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}

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

