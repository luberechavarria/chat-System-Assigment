const mongoUtil = require("../mongoUtil");

const db = mongoUtil.getDb();
const chats = db.collection('chats');
const ObjectId = require('mongodb').ObjectId;

const createChat = async (newChat) => {
  try {
    const result = await chats.insertOne(newChat);
    if(result.acknowledged){
      newChat._id = result.insertedId;
      return newChat;
    }
    return null;
  } catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getChatsByChannelId = async(channelId) => {
  try{
    const result = await chats.find({
      channelId: new ObjectId(channelId)
    }).sort({ createadAt: -1 }).toArray();
    return result;
   
  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = {
  createChat,
  getChatsByChannelId,
}