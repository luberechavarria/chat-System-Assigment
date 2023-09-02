const userService = require('../services/userService');
const channelService = require('../services/channelService');

const login = (req, res) => {
  // console.log("getting server top login", req.body)

  if (!req.body) {
    return res.sendStatus(400);
  }

  let user = userService.login(req.body.email, req.body.upwd); // Call the getUsers function to return user or users from the userService module

  // User exist in database
  if(user){
    user.login = true;
    user.pwd = '';

    res.send(user);
  }else{
    res.send({login: false});
  }
 
}

const getUsersChannel = (req, res) => {

  const channels = channelService.getChannels(); // Call the getChannels function from the userService module

  if (!req.body) {
    return res.sendStatus(400);
  }

  let channelClicked;
  
  for (let i=0; i<channels.length; i++){//get the chanel which was clicked
   if (req.body.channelId == channels[i].id ) {
    channelClicked = channels[i];
   }
  };
  
  let userChannel = userService.getUsers(channelClicked.usersIdChannel, 'id');//bring all user from the channel clicked

  res.send(userChannel);
}

module.exports = { login, getUsersChannel };