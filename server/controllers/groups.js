const groupService = require('../services/groupService');

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
    console.log("getting server top getGroups", req.body)
  if (!req.body) {
    return res.sendStatus(400);
  }

 
  if ( req.body.user.roles.includes('superAdmin')){
    const newGroup = groupService.createGroup(req.body.newGroupName); // Call the getGroups function from the userService module
    res.send(newGroup);
  }else{
    res.send('This user can not create groups');
  }
}

module.exports = {getGroups, createGroup};