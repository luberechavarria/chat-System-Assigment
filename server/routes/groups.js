// const express = require("express");
// const router = express.Router();

// const groups = require("../controllers/groups");

// router.post('/getGroups', groups.getGroups);

// router.post('/createGroup', groups.createGroup);

// router.post('/addExistedUserToGroup', groups.addExistedUserToGroup);

// router.post('/removeGroup', groups.removeGroup);

// router.post('/removeUserFromGroup', groups.removeUserFromGroup);


// module.exports = router;

const express = require("express");
const router = express.Router();
const Decimal128 = require('mongodb').Decimal128;
const ObjectId = require('mongodb').ObjectId;
const { v4: uuidv4 } = require('uuid');

const controllerGroups = require("../controllers/groups");

const groups = function (app, db) {

  app.get('/api/getGroups', async(req, res) => {
  
    if (!req.body) {
      return res.sendStatus(400);
    }
    
    try{
     const allGroups = await controllerGroups.getGroups(null, db);
    
      return res.status(200).send(allGroups);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/createGroup', async(req, res) => {
    console.log("hereeeeeeeee", req.body);
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = {
      ...req.body,
      price: Decimal128.fromString(req.body.price),
      _id: Math.floor(Math.random() * 65536),
    }

    try{
     const allGroups = await controllerGroups.createGroup(group, db);
    
      return res.status(200).send(allGroups);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/addExistedUserToGroup', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const user = {
      ...req.body,
   
    }

    try{
     const groupUpdated = await controllerGroups.addExistedUserToGroup(user, db);
    
      return res.status(200).send(groupUpdated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/removeGroup', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = {
      ...req.body,
   
    }

    try{
     const groupUpdated = await controllerGroups.removeGroup(group, db);
    
      return res.status(200).send(groupUpdated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/removeUserFromGroup', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = {
      ...req.body,
   
    }

    try{
     const groupUpdated = await controllerGroups.removeUserFromGroup(group, db);
    
      return res.status(200).send(groupUpdated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });
}

module.exports = groups;