// const express = require("express");
// const router = express.Router();

// const users = require("../controllers/users");

// router.post('/login', users.login);

// router.post('/getUsersFromChannel', users.getUsersFromChannel);

// router.post('/promoteUserAsAdmin', users.promoteUserAsAdmin);

// router.post('/removeUser', users.removeUser);

// router.post('/createNewUser', users.createNewUser);


// module.exports = router;

const express = require("express");
const router = express.Router();
const Decimal128 = require('mongodb').Decimal128;
const ObjectId = require('mongodb').ObjectId;
const { v4: uuidv4 } = require('uuid');

const usersController = require("../controllers/users");
const userService =  require("../services/users");
const accessValidations = require('../middlewares/accessValidations')

const schema = require('../schema');

const users = function (app) {
  app.post('/api/login', async(req, res) => {
    //Uncomment this to create schema for the App when do login
    // schema.user(db)
    // schema.group(db)
    // schema.channel(db)
    // schema.chat(db)
    if (!req.body || !req.body.username || !req.body.password) {
      return res.sendStatus(400);
    }

    try{
      const userFound = await usersController.login(req.body.username, req.body.password);
      if (userFound) {
        delete userFound.pwd;
        return res.status(200).send(userFound);
      } else {
        return res.status(400).send({ code: 400, message: "User couldn't be found" });
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/getUsersFromChannel/:channelId', async(req, res) => {
   
    if (!req.params || !req.params.channelId) {
      return res.sendStatus(400);
    }

    const { channelId } = req.params;

    try{
     const userChannel = await usersController.getUsersFromChannel(channelId);
    
      return res.status(200).send(userChannel);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.put('/api/updateRole/:id', accessValidations.isAdmin, async(req, res) => {
   
    if (!req.body || !req.body.role) {
      return res.sendStatus(400);
    }

    try{
      const userId = req.params.id;
      const newRole = req.body.role;
      const result = await usersController.updateRole(userId, newRole);
    
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.delete('/api/removeUser/:id', async(req, res) => {
   
    if (!req.params || !req.params.id) {
      return res.sendStatus(400);
    }

    const userId = req.params.id;

    try{
     const userRemoved = await usersController.removeUser(userId);
    
      return res.status(200).send(userRemoved);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.post('/api/createNewUser', async(req, res) => {
   
    if (!req.body || !req.body.username || !req.body.password) {
      return res.sendStatus(400);
    }

    const newUser = {
      username: req.body.username,
      pwd: req.body.password,
      email: req.body.email || ''
    }

    try{
      const result = await usersController.createNewUser(newUser);
      if (result?.userExists) {
        // usrname already taken
        return res.status(403).send({ message: 'The username is already being used by another person. Please choose a different one and try again.'})
      }
      if (result?.pwd) {
        delete result.pwd;
      }
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.put('/api/addExistedUserToGroup/:id', accessValidations.hasAdminRights, async(req, res) => {
   
    if (!req.body || !req.params.id || !req.body.groupId) {
      return res.sendStatus(400);
    }

    try{
      const { groupId } = req.body;
      const userId = req.params.id;

      const result = await usersController.addUserToGroup(userId, groupId);
    
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.put('/api/removeUserFromGroup/:id', accessValidations.hasAdminRights, async(req, res) => {
   
    if (!req.body || !req.params.id || !req.body.groupId) {
      return res.sendStatus(400);
    }

    try{
      const { groupId } = req.body;
      const userId = req.params.id;

      const result = await usersController.removeUserFromGroup(userId, groupId);
    
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });
  

  app.get('/api/user/:id', accessValidations.isAdmin, async(req, res) => {
    const user = await userService.getUserById(req.params.id);
   return res.status(200).send({
    user
   })
  });

  app.get('/api/getAllUsers', async(req, res) => {
    const allUsers = await usersController.getUsersByRole(req.query.token);
   return res.status(200).send(allUsers)
  });
}

module.exports = users;