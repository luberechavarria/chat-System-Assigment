const chatService = require('../services/chats');
const userService = require('../services/users');

const getChatsByChannelId = async(channelId) => {//WORKING MONGO
  try{
    const chats = await chatService.getChatsByChannelId(channelId);
    return chats;
  }catch(err){
    console.log(err);
    throw err;
  }
}

const sendMessage = async(newChat, io) => {
  try{
    const result = await chatService.createChat(newChat);
    io.sockets.emit(newChat.channelId, newChat);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = {
  getChatsByChannelId,
  sendMessage,
}