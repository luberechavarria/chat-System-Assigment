
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
    const success = channelService.addChannelToGroup(req.body.groupId, req.body.newChannelName);  

    if(success){
      res.send({status: 200, message: 'Channel was successful added to Group'});
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
      const userRemoved = channelService.removeUserFromChannel(req.body.channelIdSelected, user.id);
      if(userRemoved){
        res.send({status: 200, message: 'User was remove from channel'});
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

module.exports = {getChannels, addChannelToGroup, removeUserFromChannel};