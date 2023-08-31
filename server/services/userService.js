let users = [
  {'id': 1, 'username':'luber SuperAdmin', 'email': 'luberechavarria@gmail.com', 'pwd': '123', 'roles': ['superAdmin'], 'groups': [1, 2, 3, 4], 'login': false, 'avatar': ''},
  {'id': 2, 'username':'luber GroupAdmin', 'email': 'groupAdmin@gmail.com', 'pwd': '123', 'roles': ['groupAdmin'], 'groups': [1, 2, 3], 'login': false, 'avatar': ''},
  {'id': 3, 'username':'luber User', 'email': 'user@gmail.com', 'pwd': '123', 'roles': ['user'], 'groups': [1, 2], 'login': false, 'avatar': ''},
  {'id': 4, 'username':'Alex', 'email': 'Alex@gmail.com', 'pwd': '124', 'roles': ['superAdmin', 'groupAdmin', 'user'], 'groups': [], 'login': false, 'avatar': ''},
  {'id': 5, 'username':'Juan', 'email': 'Juan@gmail.com', 'pwd': '125', 'roles': ['superAdmin', 'groupAdmin', 'user'], 'groups': [], 'login': false, 'avatar': ''},
  {'id': 6, 'username':'Roberto', 'email': 'Roberto@gmail.com', 'pwd': '126', 'roles': ['superAdmin', 'groupAdmin', 'user'], 'groups': [], 'login': false, 'avatar': ''},
  {'id': 7, 'username':'Eliza', 'email': 'Eliza@gmail.com', 'pwd': '127', 'roles': ['superAdmin', 'groupAdmin', 'user'], 'groups': [], 'login': false, 'avatar': ''},
]

function getUsers(findUsersId, byProperty) {


  if(byProperty == 'all'){
    console.log("all")
    return users;
  }

  //get user by email
  if(byProperty == 'email'){
    let usersEmailFound = {};
    
    for (let i=0; i<findUsersId.length; i++){
      for (let e=0; e<users.length; e++){
        if( findUsersId[i] == users[e].email){
          return users[e]
        }
      }
    };
   
    return usersEmailFound;
   
  }

  //get user by id
  if(byProperty == 'id'){
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

module.exports = {
  getUsers, login
};