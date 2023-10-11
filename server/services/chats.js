const mongoUtil = require("../mongoUtil");

const db = mongoUtil.getDb();
const chats = db.collection('chats');

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

module.exports = {
  createChat,
}