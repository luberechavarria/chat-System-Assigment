const express = require("express");
const router = express.Router();

const channels = require("../controllers/channels");

router.post('/getChannels', channels.getChannels);


module.exports = router;