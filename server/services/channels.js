
const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require("../mongoUtil");

const db = mongoUtil.getDb();
const channels = db.collection('channels');

const getAllChannels = async() => {
  try{
    const channels = await channels.find({}).sort({ name: 1 }).toArray();
    return channels;
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const createChannel = async(newChannel) => {
  try {
    const result = await channels.insertOne(newChannel);
    if(result.acknowledged){
      newChannel._id = result.insertedId;
      return newChannel;
    }
    return null;
  } catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeChannel = async(channelId) => {
  try{
    const result = await channels.deleteOne({ _id: new ObjectId(channelId) });
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getChannelById = async(channelId) => {//WORKING MONGO
  try{
    const channel = await channels.findOne({ _id: new ObjectId(channelId) });
    return channel;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getChannelsByGroupId = async(groupId) => {//WORKING MONGO
  try{
    const result = await channels.find({ groupId: new ObjectId(groupId) }).sort({name: 1}).toArray();
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}


module.exports = {
  getAllChannels,
  createChannel,
  removeChannel,
  getChannelById,
  getChannelsByGroupId
}