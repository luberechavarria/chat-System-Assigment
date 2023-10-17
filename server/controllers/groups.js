const groupService = require('../services/groups');
const userService = require('../services/users');
const getAllGroups = async() => {//WORKING MONGO
  try{
    const groups = await groupService.getAllGroups();
    return groups;
  }catch(err){
    console.log(err);
    throw err;
  }
}

const getGroupsByUserId = async(userId) => {//WORKING MONGO
  try{
    const user = await userService.getUserById(userId);
    const userGroups = user.groups || [];
    const groups = await groupService.getGroupsByIds(userGroups);
    return groups;
  }catch(err){
    console.log(err);
    throw err;
  }
}

const createGroup = async(newGroup) => {
  try{
    const group = await groupService.createGroup(newGroup);
    return group;
  }catch(err){
    console.log(err);
    throw err;
  }
}

const removeGroup = async(groupId) => {//WORKING MONGO
  try{
    const result = await groupService.removeGroup(groupId);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllGroups,
  createGroup,
  removeGroup,
  getGroupsByUserId
}