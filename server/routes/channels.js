const express = require("express");
const router = express.Router();

const channels = require("../controllers/channels");

router.post('/getChannels', channels.getChannels);

router.post('/addChannelToGroup', channels.addChannelToGroup);

router.post('/removeUserFromChannel', channels.removeUserFromChannel);

router.post('/removeChannel', channels.removeChannel);


module.exports = router;