const userService = require("../services/users");

const isAdmin = async (req, res, next) => {
  const user = await userService.getUserById(req.query.token);
  if( user.roles.includes('superAdmin')){
    next();
  }else{
    return res.sendStatus(403);
  }
}

const hasAdminRights = async (req, res, next) => {
  if (!req.query || !req.query.token) {
    return res.sendStatus(403);
  }
  const user = await userService.getUserById(req.query.token);
  const isGroupAdmin = user.roles.includes('groupAdmin');
  const isSuperAdmin = user.roles.includes('superAdmin');
  if(isGroupAdmin || isSuperAdmin){
    next();
  }else{
    return res.sendStatus(403);
  }
}

module.exports = {
  isAdmin,
  hasAdminRights
};