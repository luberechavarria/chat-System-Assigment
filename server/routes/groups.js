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
const usersController = require("../controllers/users");

const accessValidations = require('../middlewares/accessValidations')

const groups = function (app) {

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
      const userId = req.query.token;
      const user = await usersController.getUserById(userId);
      let allGroups;
      if( user?.roles?.includes('superAdmin')){
        allGroups = await controllerGroups.getAllGroups();
      } else {
        allGroups = await controllerGroups.getGroupsByUserId(userId);
      }
      return res.status(200).send(allGroups);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.post('/api/createGroup', accessValidations.hasAdminRights, async(req, res) => {
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

  app.delete('/api/removeGroup/:id', accessValidations.hasAdminRights, async(req, res) => {
    
    if (!req.params || !req.params.id) {
      return res.sendStatus(400);
    }

    try{
      const groupId = req.params.id;
      const result = await controllerGroups.removeGroup(groupId);
    
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });
}

module.exports = groups;