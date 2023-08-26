
const channelService = require('../services/channelService');

const createChannel = (req, res) => {
  console.log("getting server top createChannel")


  const groups = channelService.getChannels(); // Call the getChannels function from the userService module

  if (!req.body) {
    return res.sendStatus(400);
  }

  let user;
  
  for (let i=0; i<channels.length; i++){
   if (req.body.email == channels[i].email && req.body.upwd == channels[i].pwd) {
    channels[i].login = true;
    user = channels[i];
   }
  };

  if(!user){
    user = {'username':'', 'email': '', 'pwd': '', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []}
  }
  
  res.send(user);
}

module.exports = {createChannel};