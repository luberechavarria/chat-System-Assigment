const groupService = require('../services/groupService');

const createGroup = (req, res) => {
  console.log("getting server top channel")



  const groups = groupService.getGroups(); // Call the getGroups function from the userService module


  if (!req.body) {
    return res.sendStatus(400);
  }

  let user;
  
  for (let i=0; i<users.length; i++){
   if (req.body.email == users[i].email && req.body.upwd == users[i].pwd) {
    users[i].login = true;
    user = users[i];
   }
  };

  if(!user){
    user = {'username':'', 'email': '', 'pwd': '', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []}
  }
  
  res.send(user);
}

module.exports = {login};