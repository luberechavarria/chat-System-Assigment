
const channelService = require('../services/channelService');

const getChannels = (req, res) => {
  console.log("getting server top getChannels", req.body)


  const channels = channelService.getChannels(); // Call the getChannels function from the userService module

  if (!req.body) {
    return res.sendStatus(400);
  }

  const arrayChannels = [];

  for (let i=0; i<channels.length; i++){
   if (req.body.groupId == channels[i].group) {// if groupId match group in channel, bring that channel
    arrayChannels.push(channels[i])
   }
  };

  res.send(arrayChannels);
}

module.exports = {getChannels};