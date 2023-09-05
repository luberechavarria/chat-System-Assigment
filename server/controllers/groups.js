const groupService = require('../services/groupService');
const userService = require('../services/userService');

const getGroups = (req, res) => {
  // console.log("getting server top getGroups", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }

  let userRole = '';
  let userRolesArray = req.body.user.roles;

  if (userRolesArray.includes('superAdmin')){
    userRole = 'superAdmin';
  }

  if (userRolesArray.includes('groupAdmin')){
    userRole = 'groupAdmin';
  }

  if (userRolesArray.includes('user')){
    userRole = 'user';
  }

  const groups = groupService.getGroups(userRole, req.body.user.groups); // Call the getGroups function from the userService module
 
  res.send(groups);
}

const createGroup = (req, res) => {
  // console.log("getting server top getGroups", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }

 
  if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin') ){
    const newGroup = groupService.createGroup(req.body.newGroupName); // Call the getGroups function from the userService module
    res.send(newGroup);
  }else{
    res.send('This user can not create groups');
  }
}

const addExistedUserToGroup = (req, res) => {
  console.log("addExistedUserToGroup", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }
 
  if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){

    const user = userService.getUsers(req.body.userAddToGroupEmail, 'email');
    
    if(user){
      const success = groupService.addExistedUserToGroup(user.id, req.body.groupname);

      if(success){
        res.send({status: 200, message: 'the user was successful add to group'});
      }
    }
   
   
  }else{
    res.send('This user can not promote users to admin');
  }
}

const removeGroup = (req, res) => {
  console.log("removeGroup", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }

  if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
    const groupWasRemoved = groupService.removeGroup(req.body.groupname);
  
    res.send({status: 200, message: 'Group was successful removed'});
  }else{
    res.send('This user can not promote users to admin');
  }
}


module.exports = {getGroups, createGroup, addExistedUserToGroup, removeGroup};