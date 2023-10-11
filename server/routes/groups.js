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
const loginValidation = require('../middlewares/loginValidations')

const groups = function (app, db) {

  app.get('/api/getAllGroups', async(req, res) => {
    
    try{
     const allGroups = await controllerGroups.getAllGroups();
    
      return res.status(200).send(allGroups);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });


  app.get('/api/getMyGroups', async(req, res) => {
    
    try{
     const allGroups = await controllerGroups.getAllGroups();
    
      return res.status(200).send(allGroups);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.post('/api/createGroup', loginValidation.canCreateGroup, async(req, res) => {
    if (!req.body || !req.body.name) {
      return res.sendStatus(400);
    }

    try{
      const newGroup = {
        name: req.body.name,
        userAdmins: [],
        joinRequesters: [],
        ownerId: new ObjectId(req.query.token) // Id of the admin
      }
      const group = await controllerGroups.createGroup(newGroup);
    
      return res.status(200).send(group);
    }catch(err){
      console.log(err);
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
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.post('/api/removeGroup', async(req, res) => {
    
    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = {
      name: req.body.groupname
    }

    try{
     const groupUpdated = await controllerGroups.removeGroup(req.body.user, group, db);
    
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