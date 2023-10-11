
const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require("../mongoUtil");

const db = mongoUtil.getDb();
const groups = db.collection('groups');

const getAllGroups = async() => {
  try{
    const groups = await groups.find({}).sort({ name: 1 }).toArray();
    return groups;
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}


const getUsersFromChannel = async(channelId, db) => {//WORKING MONGO
  try{
    const channelClicked = await db.collection('channels').find({id: channelId}).sort({name: 1}).toArray();
   
    let channelUserIds = channelClicked[0].usersIdChannel;
  
    let usersChannel = [];

    for (let i=0; i<channelUserIds.length; i++){
      const user = await db.collection('users').find({id: channelUserIds[i]}).sort({name: 1}).toArray();
      usersChannel.push(user[0]);
    };
    
    return usersChannel;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const createGroup = async(newGroup) => {
  try {
    const result = await groups.insertOne(newGroup);
    if(result.acknowledged){
      newGroup._id = result.insertedId;
      return newGroup;
    }
    return null;
  } catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeGroup = async(groupId) => {
  try{
    const result = await users.deleteOne({ _id: groupId });
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const addUserToGroup = async(groupId, userId) => {
  try {
    const result = await groups.updateOne(
      { _id: groupId },
      { $addToSet: { usersIdGroup: userId } }
   );
   return result;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeUserFromGroup = async(groupId, userId) => {
  try {
    const result = await groups.updateOne(
      { _id: groupId },
      { $pull: { usersIdGroup: userId } }
   );
   return result;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getGroupsByIds = async (objectIds) => {
  try {
    const groups = await groups.find({ _id: { $in: objectIds } }).toArray();
    return groups;
  } catch (err) {
    throw err;
  }
}


module.exports = {
  getAllGroups,
  createGroup,
  removeGroup,
  addUserToGroup,
  removeUserFromGroup,
  getGroupsByIds
}