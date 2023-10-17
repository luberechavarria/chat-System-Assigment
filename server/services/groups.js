
const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require("../mongoUtil");

const db = mongoUtil.getDb();
const groups = db.collection('groups');

const getAllGroups = async() => {
  try{
    const allGroups = await groups.find({}).sort({ name: 1 }).toArray();
    return allGroups;
   
  }catch(err){
    console.log(err);
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
    console.log(err);
    throw err;
  }
}

const removeGroup = async(groupId) => {
  try{
    const result = await groups.deleteOne({ _id: new ObjectId(groupId) });
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getGroupsByIds = async (objectIds) => {
  try {
    const allGroups = await groups.find({ _id: { $in: objectIds } }).toArray();
    return allGroups;
  } catch (err) {
    throw err;
  }
}


module.exports = {
  getAllGroups,
  createGroup,
  removeGroup,
  getGroupsByIds
}