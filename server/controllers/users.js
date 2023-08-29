const userService = require('../services/userService');
const channelService = require('../services/channelService');

const login = (req, res) => {
  console.log("getting server top login", req.body)

  // const users = userService.getUsers('all'); // Call the getUsers function from the userService module

  if (!req.body) {
    return res.sendStatus(400);
  }

  let user = userService.getUsers([req.body.email], 'email'); // Call the getUsers function to return user or users from the userService module

  // User exist in database
  if(user){
      user[0].login = true;
      user[0].pwd = '';
  }
  res.send(user[0]);
}

const getUsersChannel = (req, res) => {
  console.log("getting server top getUsersChannel", req.body)

  const channels = channelService.getChannels(); // Call the getChannels function from the userService module

  if (!req.body) {
    return res.sendStatus(400);
  }

  let channelClicked;
  
  for (let i=0; i<channels.length; i++){
   if (req.body.channelId == channels[i].id ) {
    channelClicked = channels[i];
   }
  };
  
  let userChannel = userService.getUsers(channelClicked.usersIdChannel, 'id');

  res.send(userChannel);
}

module.exports = { login, getUsersChannel };