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
   
    let channelUserIds = channelClicked.usersIdChannel;
  
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

const promoteUserAsAdmin = async(user, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin')){
      // const userPromotedAsAdmin = userService.promoteUserAsAdmin(req.body.promoteUserEmail, req.body.groupIdSelected); // Call the getGroups function from the userService module
      const userPromotedAsAdmin = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 

      return userPromotedAsAdmin;
    }else{
      return 'This user can not promote users to admin';
    }
      
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeUser = async(user, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin')){
      // const userWasRemoved = userService.removeUser(req.body.removeUserEmail);
      const userWasRemoved = await db.collection('products2').deleteOne({name: name});

      return userWasRemoved;
    }else{
      return 'This user can not promote users to admin';
    }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const createNewUser = async(newUser) => {
  try{
    const user = await userService.createNewUser(newUser);
    return user;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getUsersByRole = async (userId) => {
  const user = await userService.getUserById(userId);
  if (user) {
    const isGroupAdmin = user.roles.includes('groupAdmin');
    const isSuperAdmin = user.roles.includes('superAdmin');
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


module.exports = {
  login,
  getUsersFromChannel,
  promoteUserAsAdmin,
  removeUser,
  createNewUser,
  getUsersByRole,
  getUsersFromChannel
};

