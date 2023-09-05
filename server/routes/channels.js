const express = require("express");
const router = express.Router();

const channels = require("../controllers/channels");

router.post('/getChannels', channels.getChannels);

router.post('/addChannelToGroup', channels.addChannelToGroup);


module.exports = router;