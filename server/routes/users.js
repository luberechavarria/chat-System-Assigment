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
const loginValidation = require('../middlewares/loginValidations')

const schema = require('../schema');

const users = function (app, db) {
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
        return res.status(200).send(userFound);
      } else {
        return res.status(400).send({ code: 400, message: "User couldn't be found" });
      }
    }catch(err){
console.log("error doing login", err);

      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.post('/api/getUsersFromChannel', async(req, res) => {
   
    if (!req.body || !req.body.channelId) {
      return res.sendStatus(400);
    }

    const channelId = req.body.channelId;

    try{
     const userChannel = await usersController.getUsersFromChannel(channelId);
    
      return res.status(200).send(userChannel);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/promoteUserAsAdmin', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const user = {
      ...req.body,
   
    }

    try{
     const userPromotedAdmin = await usersController.promoteUserAsAdmin(user, db);
    
      return res.status(200).send(userPromotedAdmin);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.delete('/api/removeUser/:id', async(req, res) => {
   
    if (!req.path) {
      return res.sendStatus(400);
    }

    const user = {
      ...req.body,
   
    }

    try{
     const userRemoved = await usersController.removeUser(user, db);
    
      return res.status(200).send(userRemoved);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/createNewUser', async(req, res) => {
   
    if (!req.body || !req.body.username || !req.body.password) {
      return res.sendStatus(400);
    }

    const newUser = {
      username: req.body.username,
      pwd: req.body.password,
      email: req.body.email
    }

    try{
      const userCreated = await usersController.createNewUser(newUser);
    
      return res.status(200).send(userCreated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/user/:id', loginValidation.isAdmin, async(req, res) => {
    const user = await userService.getUserById(req.params.id);
   return res.status(200).send({
    user
   })
  });

  app.get('/api/users', async(req, res) => {
    const user = await usersController.getUsersByRole(req.query.token);
   return res.status(200).send({
    user
   })
  

  });
}

module.exports = users;