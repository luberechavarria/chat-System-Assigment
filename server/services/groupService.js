let groups = [
  {'id': 1, 'name': 'cinema', 'usersIdGroup':[2, 4, 6]},
  {'id': 2, 'name': 'languages', 'usersIdGroup':[1, 2, 4, 5]},
  {'id': 3, 'name': 'technology', 'usersIdGroup':[1, 2, 3]},
  {'id': 4, 'name': 'brisbane', 'usersIdGroup':[4, 5]},
]

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
  groups.push({'id': groups.length + 1, 'name': newGroupName, 'usersIdGroup':[]})

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
  
  return success;
}

function removeGroup (groupname) {
  groups = groups.filter(function(item) {
 
    return item.name !== groupname
  })
 
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
  
  return true;
}

module.exports = { getGroups, createGroup, addExistedUserToGroup, removeGroup, removeUserFromGroup};
  
