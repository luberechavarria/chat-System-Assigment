let channels = [
  {'id': 1, 'name': 'movies', 'group': 1, 'usersIdChannel':[1, 2, 3, 4, 5]},
  {'id': 2, 'name': 'reviews', 'group': 1, 'usersIdChannel':[1, 4]},
  {'id': 3, 'name': 'transformers', 'group': 1, 'usersIdChannel':[1, 3]},
  {'id': 4, 'name': 'spanish', 'group': 2, 'usersIdChannel':[2, 5]},
  {'id': 5, 'name': 'english', 'group': 2, 'usersIdChannel':[2]},
  {'id': 6, 'name': 'italian', 'group': 2, 'usersIdChannel':[2]},
  {'id': 7, 'name': 'computers', 'group': 3, 'usersIdChannel':[3]},
  {'id': 8, 'name': 'houses', 'group': 4, 'usersIdChannel':[4]},
]

function getChannels(groupId) {
  const arrayChannels = [];

  for (let i=0; i<channels.length; i++){
   if (channels[i].group == groupId) {// if groupId match group in channel, bring that channel
    arrayChannels.push(channels[i])
   }
  };

  return arrayChannels;
}

function getAllChannels() {
  
  return channels;
}

function addChannelToGroup(groupId, newChannelName) {
 
  channels.push({'id': channels.length, 'name': newChannelName, 'group': groupId, 'usersIdChannel':[]});
  
  return true;
}

function removeUserFromChannel (channelId, userId) {
  let channelSelected;
  for (let i=0; i<channels.length; i++){
    if (channels[i].id == channelId ) {
      channelSelected = channels[i];
    }
  };
   
  let channelUsersIds = channelSelected.usersIdChannel;
   
  let index = channelUsersIds.indexOf(userId);
  if (index > -1) {
    channelUsersIds.splice(index, 1);
  }

  //find group selected in array to repace it with the new group which has the user deleted
  const index1 = channels.findIndex(item => item.id === channelId);
  
  channels.splice(index1, 1, channelSelected);
  
  return true;
}

module.exports = {
  getChannels, addChannelToGroup, getAllChannels, removeUserFromChannel
};