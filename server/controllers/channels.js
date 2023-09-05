
const channelService = require('../services/channelService');

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

module.exports = {getChannels, addChannelToGroup};