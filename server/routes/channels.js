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

const channels = function (app, db) {

  app.get('/api/getChannels', async(req, res) => {
  
    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = {
      ...req.body,
      // price: Decimal128.fromString(req.body.price),
      // _id: Math.floor(Math.random() * 65536),
    }

    try{
     const allChannels = await controllerChannels.getChannels(group, db);
    
      return res.status(200).send(allChannels);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });

  app.get('/api/addChannelToGroup', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const channel = {
      ...req.body,
      // price: Decimal128.fromString(req.body.price),
      // _id: Math.floor(Math.random() * 65536),
    }

    try{
     const groupUpdated = await controllerChannels.addChannelToGroup(channel, db);
    
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

  app.get('/api/removeChannel', async(req, res) => {
   
    if (!req.body) {
      return res.sendStatus(400);
    }

    const channel = {
      ...req.body,
   
    }

    try{
     const groupUpdated = await controllerChannels.removeChannel(channel, db);
    
      return res.status(200).send(groupUpdated);
    }catch(err){
      console.log(JSON.stringify(err, null, 2));
      return res.status(500).send({
        error: err,
      })
    }
  });
}

module.exports = channels;