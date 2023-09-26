// const userService = require('../services/userService');
// const channelService = require('../services/channelService');

// const login = (req, res) => {
//   // console.log("getting server top login", req.body)

//   if (!req.body) {
//     return res.sendStatus(400);
//   }

//   let user = userService.login(req.body.email, req.body.upwd); // Call the getUsers function to return user or users from the userService module

//   // User exist in database
//   if(user){
//     user.login = true;
//     user.pwd = '';

//     res.send(user);
//   }else{
//     res.send({login: false});
//   }
 
// }

// const getUsersChannel = (req, res) => {

//   if (!req.body) {
//     return res.sendStatus(400);
//   }

//   const channels = channelService.getAllChannels(); // Call the getChannels function from the userService module

//   let channelClicked;
  
//   for (let i=0; i<channels.length; i++){//get the chanel which was clicked
//    if (req.body.channelId == channels[i].id ) {
//     channelClicked = channels[i];
//    }
//   };
  
//   let userChannel = userService.getUsers(channelClicked.usersIdChannel, 'id');//bring all user from the channel clicked

//   res.send(userChannel);
// }

// const promoteUserAsAdmin = (req, res) => {
//   console.log("promoteUserAsAdmin", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }


//   if ( req.body.user.roles.includes('superAdmin')){
//     const userPromotedAsAdmin = userService.promoteUserAsAdmin(req.body.promoteUserEmail, req.body.groupIdSelected); // Call the getGroups function from the userService module
//     res.send(userPromotedAsAdmin);
//   }else{
//     res.send('This user can not promote users to admin');
//   }
// }

// const removeUser = (req, res) => {
//   if (!req.body) {
//     return res.sendStatus(400);
//   }

//   if ( req.body.user.roles.includes('superAdmin')){
//     const userWasRemoved = userService.removeUser(req.body.removeUserEmail);
//     console.log("user was removed", userWasRemoved)
//     res.send(userWasRemoved);
//   }else{
//     res.send('This user can not promote users to admin');
//   }
// }

// const createNewUser = (req, res) => {
//   console.log("createNewUser", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }


//   if ( req.body.user.roles.includes('superAdmin')){
//     const newUser = userService.createNewUser(req.body.createNewUserEmail, req.body.password, req.body.username);
    
//     res.send(newUser);
//   }else{
//     res.send('This user can not promote users to admin');
//   }
// }

const schema = require('../schema');

const login = async(user, db) => {
  //Uncomment this to create schema for the App when do login
  // schema.user(db)
  // schema.group(db)
  // schema.channel(db)
  // schema.chat(db)

  try{
    const userFound = await db.collection('products2').find({}).sort({name: 1}).toArray();
    
    if(userFound){
      user.login = true;
        user.pwd = '';

        return userFound;
      }else{
        return {data: false, code: 222, message: "something"};
    }
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getUsersChannel = async(channel, db) => {
  try{
    
    const channels = await db.collection('products2').find({}).sort({name: 1}).toArray();

    let channelClicked;
    
    for (let i=0; i<channels.length; i++){//get the chanel which was clicked
    if (req.body.channelId == channels[i].id ) {
      channelClicked = channels[i];
    }
    };
    
    //replace this with mongo request
    let userChannels = userService.getUsers(channelClicked.usersIdChannel, 'id');//bring all user from the channel clicked

    return usersChannel;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const promoteUserAsAdmin = async(user, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin')){
      // const userPromotedAsAdmin = userService.promoteUserAsAdmin(req.body.promoteUserEmail, req.body.groupIdSelected); // Call the getGroups function from the userService module
      const userPromotedAsAdmin = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 

      return userPromotedAsAdmin;
    }else{
      return 'This user can not promote users to admin';
    }
      
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeUser = async(user, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin')){
      // const userWasRemoved = userService.removeUser(req.body.removeUserEmail);
      const userWasRemoved = await db.collection('products2').deleteOne({name: name});

      return userWasRemoved;
    }else{
      return 'This user can not promote users to admin';
    }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const createNewUser = async(user, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin')){
      // const newUser = userService.createNewUser(req.body.createNewUserEmail, req.body.password, req.body.username);
      const newUser = await db.collection('products2').insertOne(product)

      return newUser;
    }else{
      return 'This user can not promote users to admin';
    }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}


module.exports = { login, getUsersChannel, promoteUserAsAdmin, removeUser, createNewUser };