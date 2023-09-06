var fs = require('fs');

let groups = [
  // {'id': 1, 'name': 'cinema', 'usersIdGroup':[2, 4, 6]},
  // {'id': 2, 'name': 'languages', 'usersIdGroup':[1, 2, 4, 5]},
  // {'id': 3, 'name': 'technology', 'usersIdGroup':[1, 2, 3]},
  // {'id': 4, 'name': 'brisbane', 'usersIdGroup':[4, 5]},
]

function updateGroupsJSON(groupsUpDate) {
  // Convert the 'groups' array to JSON format
  const groupsJson = JSON.stringify(groupsUpDate, null, 2);
  fs.writeFile('server/services/groups.json', groupsJson, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Write operation complete.');
    }
  });
}

fs.readFile('server/services/groups.json', 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
    return;
  }

  try {
    // Parse the JSON data into a JavaScript object
    const groupsJSON = JSON.parse(data);

    groups = groupsJSON; // Assign the parsed data to 'groups'
  } catch (error) {
    console.error(`Error parsing JSON data: ${error}`);
  }
});



function getGroups(role, groupsId) {
 
  if(role === 'superAdmin')return groups;

  if(role === 'groupAdmin'){
    let groupsAdminFound = [];
    
    for (let i=0; i<groupsId.length; i++){
      for (let e=0; e<groups.length; e++){
        if( groupsId[i] == groups[e].id){
          groupsAdminFound.push(groups[e]);
        }
      }
    };

    return groupsAdminFound;
  }

  if(role == 'user'){
    let groupsUser = [];
    
    for (let i=0; i<groupsId.length; i++){
      for (let e=0; e<groups.length; e++){
        if( groupsId[i] == groups[e].id){
          groupsUser.push(groups[e]);
        }
      }
    };
    
    return groupsUser;
  }
}

function createGroup(newGroupName) {
  console.log("222222:", newGroupName);
  groups.push({'id': groups.length + 1, 'name': newGroupName, 'usersIdGroup':[]})
  updateGroupsJSON(groups);
  return groups;
}

function addExistedUserToGroup (userId, groupname) {
  let success = false;
  for (let e=0; e<groups.length; e++){
    console.log("groups[i].name", groups[e].name);
    console.log("groupname", groupname);
    if( groups[e].name == groupname){
      groups[e].usersIdGroup.push(userId);
      success = true;
    }
  }

  updateGroupsJSON(groups);
  return success;
}

function removeGroup (groupname) {
  groups = groups.filter(function(item) {
 
    return item.name !== groupname
  })
  updateGroupsJSON(groups);
  
  return groups;
}

function removeUserFromGroup (groupId, userId) {
  let groupSelected;
  for (let i=0; i<groups.length; i++){
    if (groups[i].id == groupId ) {
      groupSelected = groups[i];
    }
  };
   
  let groupUsersIds = groupSelected.usersIdGroup;
   
  let index = groupUsersIds.indexOf(userId);
  if (index > -1) {
    groupUsersIds.splice(index, 1);
  }

  //find group selected in array to repace it with the new group which has the user deleted
  const index1 = groups.findIndex(item => item.id === groupId);
  
  groups.splice(index1, 1, groupSelected);
  console.log("DDDDDDDDDD", groups)
  updateGroupsJSON(groups);
  return true;
}

module.exports = { getGroups, createGroup, addExistedUserToGroup, removeGroup, removeUserFromGroup};
  
