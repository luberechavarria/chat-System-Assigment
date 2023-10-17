const userService =  require("../services/users");
const channelService =  require("../services/channels");

/**
 * Retrieves a list of channels associated with a group based on its unique groupId.
 *
 * @async
 * @param {string} groupId - The unique identifier of the group for which associated channels are to be retrieved.
 * @returns {Promise<Array<Object>} A promise that resolves to an array of channel objects associated with the group.
 * @throws {Error} An error object is thrown if an exception occurs during the channel retrieval process.
 */
const getChannelsByGroupId = async(groupId) => { //WORKING MONGO
  try{
    const result = await channelService.getChannelsByGroupId(groupId);
    return result;
   
  }catch(err){
    console.log(err);
    throw err;
  }
}

/**
 * Adds a new channel to a group using the provided channel data.
 *
 * @async
 * @param {Object} newChannel - The channel data to be used for creating the new channel.
 * @returns {Promise<Object>} A promise that resolves to the newly created channel object.
 * @throws {Error} An error object is thrown if an exception occurs during the channel creation process.
 */
const addChannelToGroup = async(newChannel) => {
  try{ 
    const result = await channelService.createChannel(newChannel);
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

/**
 * Removes a user from a channel based on their email, with role-based access control.
 *
 * @async
 * @param {Object} group - The group object representing the channel from which the user should be removed.
 * @param {MongoDBDatabase} db - The MongoDB database instance.
 * @returns {Promise<Array<Object>|Object|string>} A promise that resolves to an array of user objects in the updated channel, an error object with a status and message, or a string message indicating permission restrictions.
 * @throws {Error} An error object is thrown if an exception occurs during the user removal process.
 */
const removeUserFromChannel = async(group, db) => {
  try{ 
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
          const user = userService.getUsers(req.body.removeUserInChannelEmail, 'email'); //search user by 'email'
          if(user){
            // const channelUpdate = channelService.removeUserFromChannel(req.body.channelIdSelected, user.id);
            const channelUpdate = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 
            if(channelUpdate){
              
              // let userChannel = userService.getUsers(channelUpdate.usersIdChannel, 'id');
              const userChannel = await db.collection('products2').find({}).sort({name: 1}).toArray();
              return userChannel
            }else{
              return{status: 404, message: 'User could not be removed from channel'};
            }
            
          }else{
            return{status: 404, message: 'User was not found'};
          }
      
    }else{
      return 'This user can not delete user in channels';
    }    
     
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

/**
 * Removes a channel from the system using its unique channelId.
 *
 * @async
 * @param {string} channelId - The unique identifier of the channel to be removed from the system.
 * @returns {Promise<Object>} A promise that resolves to the result of the channel removal operation.
 * @throws {Error} An error object is thrown if an exception occurs during the channel removal process.
 */
const removeChannel = async(channelId) => {
  try{
    const result = await channelService.removeChannel(channelId);
    return result;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

module.exports = {
  addChannelToGroup,
  removeUserFromChannel,
  getChannelsByGroupId,
  removeChannel,
};