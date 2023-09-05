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

  if (!req.body) {
    return res.sendStatus(400);
  }

  const channels = channelService.getAllChannels(); // Call the getChannels function from the userService module

  let channelClicked;
  
  for (let i=0; i<channels.length; i++){//get the chanel which was clicked
   if (req.body.channelId == channels[i].id ) {
    channelClicked = channels[i];
   }
  };
  
  let userChannel = userService.getUsers(channelClicked.usersIdChannel, 'id');//bring all user from the channel clicked

  res.send(userChannel);
}

const promoteUserAsAdmin = (req, res) => {
  console.log("promoteUserAsAdmin", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }


  if ( req.body.user.roles.includes('superAdmin')){
    const userPromotedAsAdmin = userService.promoteUserAsAdmin(req.body.promoteUserEmail, req.body.groupIdSelected); // Call the getGroups function from the userService module
    res.send(userPromotedAsAdmin);
  }else{
    res.send('This user can not promote users to admin');
  }
}

const removeUser = (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  if ( req.body.user.roles.includes('superAdmin')){
    const userWasRemoved = userService.removeUser(req.body.removeUserEmail);
    console.log("user was removed", userWasRemoved)
    res.send(userWasRemoved);
  }else{
    res.send('This user can not promote users to admin');
  }
}

const createNewUser = (req, res) => {
  console.log("createNewUser", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }


  if ( req.body.user.roles.includes('superAdmin')){
    const newUser = userService.createNewUser(req.body.createNewUserEmail, req.body.password, req.body.username);
    
    res.send(newUser);
  }else{
    res.send('This user can not promote users to admin');
  }
}



module.exports = { login, getUsersChannel, promoteUserAsAdmin, removeUser, createNewUser };