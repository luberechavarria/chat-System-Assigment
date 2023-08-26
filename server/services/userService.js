let users = [
  {'username':'luber Echavarria', 'email': 'luberechavarria@gmail.com', 'pwd': '123', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []},
  {'username':'Alex', 'email': 'Alex@gmail.com', 'pwd': '456', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []},
  {'username':'Juan', 'email': 'Juan@gmail.com', 'pwd': '789', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []},
  {'username':'Roberto', 'email': 'Roberto@gmail.com', 'pwd': '479', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []},
  {'username':'Eliza', 'email': 'Eliza@gmail.com', 'pwd': '000', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false, 'roomsJoined': []},
]

function getUsers() {
  return users;
}

module.exports = {
  getUsers,
};