let users = [
  {'id': 1, 'username':'luber SuperAdmin', 'email': '1@gmail.com', 'pwd': '123', 'roles': ['superAdmin'], 'groups': [1, 2, 3, 4], 'login': false, 'avatar': ''},
  {'id': 2, 'username':'luber GroupAdmin', 'email': '2@gmail.com', 'pwd': '123', 'roles': [{'groupAdmin': []}, 'user'], 'groups': [1, 2, 3, 4], 'login': false, 'avatar': ''},
  {'id': 3, 'username':'luber User', 'email': '3@gmail.com', 'pwd': '123', 'roles': [{'groupAdmin': []}, 'user'], 'groups': [1, 2, 3, 4], 'login': false, 'avatar': ''},
  {'id': 4, 'username':'Alex', 'email': 'Alex@gmail.com', 'pwd': '124', 'roles': [{'groupAdmin': []}, 'user'], 'groups': [], 'login': false, 'avatar': ''},
  {'id': 5, 'username':'Juan', 'email': 'Juan@gmail.com', 'pwd': '125', 'roles': [{'groupAdmin': []}, 'user'], 'groups': [], 'login': false, 'avatar': ''},
  {'id': 6, 'username':'Roberto', 'email': 'Roberto@gmail.com', 'pwd': '126', 'roles': [{'groupAdmin': []}, 'user'], 'groups': [], 'login': false, 'avatar': ''},
  {'id': 7, 'username':'Eliza', 'email': 'Eliza@gmail.com', 'pwd': '127', 'roles': [{'groupAdmin': []}, 'user'], 'groups': [], 'login': false, 'avatar': ''},
]

function getUsers(findUsersId, byProperty) {
  // Return all users
  if(findUsersId == 'all'){
    return users;
  }

  if(byProperty == 'email'){
    let usersFound = [];
    
    for (let i=0; i<findUsersId.length; i++){
      for (let e=0; e<users.length; e++){
        if( findUsersId[i] == users[e].email){
          usersFound.push(users[e]);
        }
      }
    };

    return users;
  }

  if(byProperty == 'id'){
      // Return user which are in 'findUsersId'
    let usersFound = [];
    
    for (let i=0; i<findUsersId.length; i++){
      for (let e=0; e<users.length; e++){
        if( findUsersId[i] == users[e].id){
          usersFound.push(users[e]);
        }
      }
    };

    return usersFound;
  }
}

function login (userEmail, upwd) {
  for (let e=0; e<users.length; e++){
    if( users[e].email == userEmail && users[e].pwd == upwd){
      return users[e]
    }
  }
}

function promoteUserAsAdmin (promoteUserEmail, groupIdSelected) {
  let user;
 
  for (let e=0; e<users.length; e++){
    if( users[e].email == promoteUserEmail){
       users[e].roles[0].groupAdmin.push(groupIdSelected);
       user =  users[e];
    }
  }

  return user
}

module.exports = {
  getUsers, login, promoteUserAsAdmin
};