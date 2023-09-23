// const express = require("express");
// const router = express.Router();

// const users = require("../controllers/users");

// router.post('/login', users.login);

// router.post('/getUsersChannel', users.getUsersChannel);

// router.post('/promoteUserAsAdmin', users.promoteUserAsAdmin);

// router.post('/removeUser', users.removeUser);

// router.post('/createNewUser', users.createNewUser);


// module.exports = router;

const express = require("express");
const router = express.Router();
const Decimal128 = require('mongodb').Decimal128;
const ObjectId = require('mongodb').ObjectId;
const { v4: uuidv4 } = require('uuid');

const controllerUsers = require("../controllers/users");

const users = function (app, db) {

  app.get('/api/login', async(req, res) => {
  
    if (!req.body) {
      return res.sendStatus(400);
    }
    
    const user = {
      ...req.body,
      // price: Decimal128.fromString(req.body.price),
      // _id: Math.floor(Math.random() * 65536),
    }

    try{
     const userFound = await controllerUsers.login(user, db);
    
      return res.status(200).send(userFound);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/getUsersChannel', async(req, res) => {
    console.log("hereeeeeeeee", req.body);
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const channel = {
      ...req.body,
      price: Decimal128.fromString(req.body.price),
      _id: Math.floor(Math.random() * 65536),
    }

    try{
     const userChannel = await controllerUsers.getUsersChannel(channel, db);
    
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
     const userPromotedAdmin = await controllerUsers.promoteUserAsAdmin(user, db);
    
      return res.status(200).send(userPromotedAdmin);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/removeUser', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const user = {
      ...req.body,
   
    }

    try{
     const userRemoved = await controllerUsers.removeUser(user, db);
    
      return res.status(200).send(userRemoved);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/createNewUser', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const user = {
      ...req.body,
   
    }

    try{
     const userCreated = await controllerUsers.createNewUser(user, db);
    
      return res.status(200).send(userCreated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });
}

module.exports = users;