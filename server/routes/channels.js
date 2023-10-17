// const express = require("express");
// const router = express.Router();

// const channels = require("../controllers/channels");

// router.post('/getChannels', channels.getChannels);

// router.post('/addChannelToGroup', channels.addChannelToGroup);

// router.post('/removeUserFromChannel', channels.removeUserFromChannel);

// router.post('/removeChannel', channels.removeChannel);


// module.exports = router;

const express = require("express");
const router = express.Router();
const Decimal128 = require('mongodb').Decimal128;
const ObjectId = require('mongodb').ObjectId;
const { v4: uuidv4 } = require('uuid');

const controllerChannels = require("../controllers/channels");
const accessValidations = require('../middlewares/accessValidations')

const channels = function (app, db) {

  app.get('/api/getChannels/:groupId', async(req, res) => {
   
    if (!req.params || !req.params.groupId) {
      return res.sendStatus(400);
    }

    try{
      const { groupId } = req.params;

      const allChannels = await controllerChannels.getChannelsByGroupId(groupId);
    
      return res.status(200).send(allChannels);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.post('/api/addChannelToGroup', accessValidations.hasAdminRights, async(req, res) => {
   
    if (!req.body || !req.body.name || !req.body.groupId) {
      return res.sendStatus(400);
    }

    const newChannel = {
      ...req.body,
      groupId: new ObjectId(req.body.groupId)
    }

    try{
     const groupUpdated = await controllerChannels.addChannelToGroup(newChannel);
    
      return res.status(200).send(groupUpdated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/removeUserFromChannel', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const channel = {
      ...req.body,
   
    }

    try{
     const channelUpdated = await controllerChannels.removeUserFromChannel(channel, db);
    
      return res.status(200).send(channelUpdated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  // TODO: validate permissions
  app.delete('/api/removeChannel/:id', accessValidations.hasAdminRights, async(req, res) => {
   
    if (!req.params || !req.params.id) {
      return res.sendStatus(400);
    }

    try{
      const channelId = req.params.id;
      const groupUpdated = await controllerChannels.removeChannel(channelId);
    
      return res.status(200).send(groupUpdated);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });
}

module.exports = channels;