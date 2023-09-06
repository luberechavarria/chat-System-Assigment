var fs = require('fs');

let channels = [
  // {'id': 1, 'name': 'movies', 'group': 1, 'usersIdChannel':[1, 2, 3, 4, 5]},
  // {'id': 2, 'name': 'reviews', 'group': 1, 'usersIdChannel':[1, 4]},
  // {'id': 3, 'name': 'transformers', 'group': 1, 'usersIdChannel':[1, 3]},
  // {'id': 4, 'name': 'spanish', 'group': 2, 'usersIdChannel':[2, 5]},
  // {'id': 5, 'name': 'english', 'group': 2, 'usersIdChannel':[2]},
  // {'id': 6, 'name': 'italian', 'group': 2, 'usersIdChannel':[2]},
  // {'id': 7, 'name': 'computers', 'group': 3, 'usersIdChannel':[3]},
  // {'id': 8, 'name': 'houses', 'group': 4, 'usersIdChannel':[4]},
]

function updateChannelJSON(channelsUpDate) {
  // Convert the 'groups' array to JSON format
  const groupsJson = JSON.stringify(channelsUpDate, null, 2);
  fs.writeFile('server/services/channels.json', groupsJson, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Write operation complete.');
    }
  });
};



fs.readFile('server/services/channels.json', 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
    return;
  }

  try {
    // Parse the JSON data into a JavaScript object
    const groupsJSON = JSON.parse(data);

    channels = groupsJSON; // Assign the parsed data to 'groups'
    // console.log("Groupssssssss:", groups);

  } catch (error) {
    console.error(`Error parsing JSON data: ${error}`);
  }
});

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
  const arrayChannels = [];

  channels.push({'id': channels.length, 'name': newChannelName, 'group': groupId, 'usersIdChannel':[]});
  updateChannelJSON(channels);

  //loop for all channel belong to the group, even the new just was created
  for (let i=0; i<channels.length; i++){
    if (channels[i].group == groupId) {// if groupId match group in channel, bring that channel
     arrayChannels.push(channels[i])
    }
   };
  return arrayChannels;
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
  
  updateChannelJSON(channels);
  return channelSelected;
}

module.exports = {
  getChannels, addChannelToGroup, getAllChannels, removeUserFromChannel
};