const chatService = require('../services/chats');
const userService = require('../services/users');

/**
 * Retrieves a list of chat messages associated with a specific channel based on its unique channelId.
 *
 * @async
 * @param {string} channelId - The unique identifier of the channel for which associated chat messages are to be retrieved.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of chat message objects associated with the channel.
 * @throws {Error} An error object is thrown if an exception occurs during the chat message retrieval process.
 */
const getChatsByChannelId = async(channelId) => {//WORKING MONGO
  try{
    const chats = await chatService.getChatsByChannelId(channelId);
    return chats;
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Sends a message in a chat room and broadcasts it over a WebSocket connection if provided.
 *
 * @async
 * @param {Object} newChat - The message data to be sent in the chat.
 * @param {SocketIO} io - The Socket.IO instance for broadcasting messages to connected clients (optional).
 * @returns {Promise<Object>} A promise that resolves to the result of the message creation.
 * @throws {Error} An error object is thrown if an exception occurs during the message sending process.
 */
const sendMessage = async(newChat, io) => {
  try{
    const result = await chatService.createChat(newChat);
    if (io) {
      console.log("sending socket message", newChat);
      io.sockets.emit(newChat.channelId.toString(), newChat);
    }
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