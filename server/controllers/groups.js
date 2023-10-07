// const groupService = require('../services/groupService');
// const userService = require('../services/userService');

// const getGroups = (req, res) => {
//   // console.log("getting server top getGroups", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }

//   let userRole = '';
//   let userRolesArray = req.body.user.roles;

//   if (userRolesArray.includes('superAdmin')){
//     userRole = 'superAdmin';
//   }

//   if (userRolesArray.includes('groupAdmin')){
//     userRole = 'groupAdmin';
//   }

//   if (userRolesArray.includes('user')){
//     userRole = 'user';
//   }

//   const groups = groupService.getGroups(userRole, req.body.user.groups); // Call the getGroups function from the userService module
 
//   res.send(groups);
// }

// const createGroup = (req, res) => {
//   console.log("getting server top createGroup", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }

 
//   if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin') ){
//     const newGroup = groupService.createGroup(req.body.newGroupName); // Call the getGroups function from the userService module
//     res.send(newGroup);
//   }else{
//     res.send('This user can not create groups');
//   }
// }

// const addExistedUserToGroup = (req, res) => {
//   console.log("addExistedUserToGroup", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }
 
//   if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){

//     const user = userService.getUsers(req.body.userAddToGroupEmail, 'email');
    
//     if(user){
//       const success = groupService.addExistedUserToGroup(user.id, req.body.groupname);

//       if(success){
//         res.send({status: 200, message: 'the user was successful add to group'});
//       }
//     }
   
   
//   }else{
//     res.send('This user can not promote users to admin');
//   }
// }

// const removeGroup = (req, res) => {
//   console.log("removeGroup", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }

//   if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
//     const updatedGroups = groupService.removeGroup(req.body.groupname);
  
//     res.send(updatedGroups);
//   }else{
//     res.send('This user can not promote users to admin');
//   }
// }

// const removeUserFromGroup = (req, res) => {
//   console.log("removeUserFromGroup", req.body)
//   if (!req.body) {
//     return res.sendStatus(400);
//   }
  
//   if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
//     const user = userService.getUsers(req.body.removeUserInGroupEmail, 'email'); //search user by 'email'
//     if(user){
//       const userRemoved = groupService.removeUserFromGroup(req.body.groupIdSelected, user.id);
//       if(userRemoved){
//         res.send({status: 200, message: 'User was remove from group'});
//       }else{
//         res.send({status: 404, message: 'User could not be removed from group'});
//       }
      
//     }else{
//       res.send({status: 404, message: 'User was not found'});
//     }

    
//   }else{
//     res.send('This user can not promote users to admin');
//   }
// }

const getGroups = async(product, db) => { //WORKING MONGO
  try{
    const showAllGroups = await db.collection('groups').find({}).sort({name: 1}).toArray();
    return showAllGroups;
   
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const createGroup = async(product, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin') ){
      const newGroup = await db.collection('products2').insertOne(product)
      return newGroup;
    }else{
      return 'This user can not create groups';
    }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const addExistedUserToGroup = async(product, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){

          // replace this to request user in data base
          // const user = userService.getUsers(req.body.userAddToGroupEmail, 'email');

          
          if(user){
            // const how to update mongo = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 
            // const success = old code groupService.addExistedUserToGroup(user.id, req.body.groupname);
            // request here to addExistedUserToGroup data base
            if(success){
              // old code res.send({status: 200, message: 'the user was successful add to group'});
              return productsUpdated;
            }
          }
        }else{
          res.send('This user can not promote users to admin');
        }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeGroup = async(name, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
      // const updatedGroups = groupService.removeGroup(req.body.groupname);
      // res.send(updatedGroups); Old code
      const groupRemoved = await db.collection('products2').deleteOne({name: name});
      const getAllGroupsUpdated = await db.collection('products2').find({}).sort({name: 1}).toArray();
      return getAllGroupsUpdated;
    }else{
      return 'This user can not promote users to admin';
    }
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}


const removeUserFromGroup = async(product, db) => {
  try{
    if ( req.body.user.roles.includes('superAdmin') || req.body.user.roles.includes('groupAdmin')){
      const user = userService.getUsers(req.body.removeUserInGroupEmail, 'email'); //search user by 'email'
      if(user){
        const userRemoved = groupService.removeUserFromGroup(req.body.groupIdSelected, user.id);
        if(userRemoved){
          //old code res.send({status: 200, message: 'User was remove from group'});
          const result = await db.collection('products2').updateOne({name: product.name}, {$set:{description: product.description}}) 
          const groupUpUpdated = await db.collection('products2').find({}).sort({name: 1}).toArray();
          return groupUpUpdated;
        }else{
          return {status: 404, message: 'User could not be removed from group'};
        }
        
      }else{
        return {status: 404, message: 'User could not found in database'};
      }
  
      
    }else{
      return 'This user can not promote users to admin';
    }
    
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

module.exports = {getGroups, createGroup, addExistedUserToGroup, removeGroup, removeUserFromGroup}