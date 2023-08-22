
const login = (req, res) => {
  console.log("getting server top login")
  let users = [
    {'username':'luber Alexander Echavarria', 'email': 'luberechavarria@gmail.com', 'pwd': '123', 'valid': false, 'valid': ''},
    {'username':'Alex', 'email': 'Alex@gmail.com', 'pwd': '456', 'valid': false, 'valid': ''},
    {'username':'Juan', 'email': 'Juan@gmail.com', 'pwd': '789', 'valid': false, 'valid': ''},
    {'username':'Roberto', 'email': 'Roberto@gmail.com', 'pwd': '479', 'valid': false, 'valid': ''},
    {'username':'Eliza', 'email': 'Eliza@gmail.com', 'pwd': '000', 'valid': false, 'valid': ''},
  ]
  
  if (!req.body) {
    return res.sendStatus(400);
  }

  let user;
  
  for (let i=0; i<users.length; i++){
   if (req.body.email == users[i].email && req.body.upwd ==users[i].pwd) {
    users[i].valid = true;
    user = users[i];
   }
  };

  if(!user){
    user = {'username':'', 'email': '', 'pwd': '', 'valid': false, 'valid': ''}
  }
  
  res.send(user);
}

module.exports = {login};