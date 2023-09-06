
const channelService = require('../services/channelService');
const userService = require('../services/userService');

const getChannels = (req, res) => {
  // console.log("getting server top getChannels", req.body)

  if (!req.body) {
    return res.sendStatus(400);
  }

  const channels = channelService.getChannels(req.body.groupId); // Call the getChannels function from the userService module

  res.send(channels);
}

const addChannelToGroup = (req, res) => {
  // console.log("getting server top addChannelToGroup", req.body)

  if (!req.body) {
    return res.sendStatus(400);
  }

 
  if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
    const channels = channelService.addChannelToGroup(req.body.groupId, req.body.newChannelName);  

    if(channels){
      res.send(channels);
    } 
  }else{
    res.send('This user can not add chanel to group');
  }
}

const removeUserFromChannel = (req, res) => {
  console.log("removeUserFromGroup", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }
  
  if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
    const user = userService.getUsers(req.body.removeUserInChannelEmail, 'email'); //search user by 'email'
    if(user){
      const channelUpdate = channelService.removeUserFromChannel(req.body.channelIdSelected, user.id);
      if(channelUpdate){
        
        let userChannel = userService.getUsers(channelUpdate.usersIdChannel, 'id');//bring all user from the channel based in this array
        res.send(userChannel); // return channel with the user removed 
      }else{
        res.send({status: 404, message: 'User could not be removed from channel'});
      }
      
    }else{
      res.send({status: 404, message: 'User was not found'});
    }

    
  }else{
    res.send('This user can not delete user in channels');
  }
}

const removeChannel = (req, res) => {
  console.log("removeChannel", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }

  if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
    const updatedChannels = channelService.removeChannel(req.body.channelname, req.body.groupId);
  
    res.send(updatedChannels);
  }else{
    res.send('This user can not promote users to admin');
  
  }
}

module.exports = {getChannels, addChannelToGroup, removeUserFromChannel, removeChannel};