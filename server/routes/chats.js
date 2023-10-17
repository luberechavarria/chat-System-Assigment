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

const chatController = require("../controllers/chats");
const accessValidations = require('../middlewares/accessValidations')

const chats = function (app) {

  app.get('/api/getChatsByChannelId/:channelId', async(req, res) => {
    
    try{
        if (!req.params || !req.params.channelId) {
            return res.sendStatus(400);
        }
        const { channelId } = req.params;
        const response = await chatController.getChatsByChannelId(channelId);
    
        return res.status(200).send(response);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

  // TODO: validate permissions
  app.post('/api/sendMessage', async(req, res) => {
    if (!req.body || !req.body.message || !req.body.channelId || !req.query.token) {
      return res.sendStatus(400);
    }

    try{
      const newChat = {
        ...req.body,
        createdAt: new Date().toISOString(),
        userId: new ObjectId(req.query.token), // Id of the admin
        channelId: new ObjectId(req.body.channelId)
      }
      const group = await chatController.sendMessage(newChat);
    
      return res.status(200).send(group);
    }catch(err){
      console.log(err);
      return res.status(500).send({
        error: err,
      })
    }
  });

}

module.exports = chats;