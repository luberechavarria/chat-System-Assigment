const groupService = require('../services/groupService');

const getGroups = (req, res) => {
  
  const groups = groupService.getGroups(); // Call the getGroups function from the userService module


  if (!req.body) {
    return res.sendStatus(400);
  }
  
  res.send(groups);
}



module.exports = {getGroups};