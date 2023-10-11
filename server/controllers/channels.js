const userService =  require("../services/users");



const getChannels = async(groupId, db) => { //WORKING MONGO
  try{
    const channelsInGroup = await db.collection('channels').find({group: groupId}).sort({name: 1}).toArray();
    return channelsInGroup;
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const addChannelToGroup = async(group, db) => {
  try{ 
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
      // const channels = channelService.addChannelToGroup(req.body.groupId, req.body.newChannelName);  
      const channelsInGroup = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 
      if(channelsInGroup){
        return channelsInGroup;
      } 
    }else{
      return 'This user can not add chanel to group';
    }
   
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

const removeChannel = async(channel, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
      // const updatedChannels = channelService.removeChannel(req.body.channelname, req.body.groupId);
      const channelRemoved = await db.collection('products2').deleteOne({name: name});
      return channelRemoved;
    }else{
      return 'This user can not promote users to admin';
    }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

module.exports = {
  getChannels,
  addChannelToGroup,
  removeUserFromChannel,
  removeChannel,
};