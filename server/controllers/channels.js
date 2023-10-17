const userService =  require("../services/users");
const channelService =  require("../services/channels");



const getChannelsByGroupId = async(groupId) => { //WORKING MONGO
  try{
    const result = await channelService.getChannelsByGroupId(groupId);
    return result;
   
  }catch(err){
    console.log(err);
    throw err;
  }
}

const addChannelToGroup = async(newChannel) => {
  try{ 
    const result = await channelService.createChannel(newChannel);
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeUserFromChannel = async(group, db) => {
  try{ 
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
          const user = userService.getUsers(req.body.removeUserInChannelEmail, 'email'); //search user by 'email'
          if(user){
            // const channelUpdate = channelService.removeUserFromChannel(req.body.channelIdSelected, user.id);
            const channelUpdate = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 
            if(channelUpdate){
              
              // let userChannel = userService.getUsers(channelUpdate.usersIdChannel, 'id');
              const userChannel = await db.collection('products2').find({}).sort({name: 1}).toArray();
              return userChannel
            }else{
              return{status: 404, message: 'User could not be removed from channel'};
            }
            
          }else{
            return{status: 404, message: 'User was not found'};
          }
      
    }else{
      return 'This user can not delete user in channels';
    }    
     
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeChannel = async(channelId) => {
  try{
    const result = await channelService.removeChannel(channelId);
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

module.exports = {
  addChannelToGroup,
  removeUserFromChannel,
  getChannelsByGroupId,
  removeChannel,
};