let groups = [
  {'id': 1, 'name': 'cinema'},
  {'id': 2, 'name': 'languages'},
  {'id': 3, 'name': 'technology'},
  {'id': 4, 'name': 'brisbane'},
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
  groups.push({'id': 5, 'name': newGroupName})

  return groups;
}

module.exports = { getGroups, createGroup };
  
