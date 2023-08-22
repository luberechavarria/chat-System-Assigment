
const login = (req, res) => {
  console.log("getting server top login")
  let users = [
    {'username':'luber Echavarria', 'email': 'luberechavarria@gmail.com', 'pwd': '123', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false},
    {'username':'Alex', 'email': 'Alex@gmail.com', 'pwd': '456', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false},
    {'username':'Juan', 'email': 'Juan@gmail.com', 'pwd': '789', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false},
    {'username':'Roberto', 'email': 'Roberto@gmail.com', 'pwd': '479', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false},
    {'username':'Eliza', 'email': 'Eliza@gmail.com', 'pwd': '000', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false},
  ]

  if (!req.body) {
    return res.sendStatus(400);
  }

  let user;
  
  for (let i=0; i<users.length; i++){
   if (req.body.email == users[i].email && req.body.upwd == users[i].pwd) {
    users[i].login = true;
    user = users[i];
   }
  };

  if(!user){
    user = {'username':'', 'email': '', 'pwd': '', 'superAdmin': false, 'groupAdmin': false, 'user': true, 'login': false}
  }
  
  res.send(user);
}

module.exports = {login};