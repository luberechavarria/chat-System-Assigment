const express = require("express");
const router = express.Router();

const channels = require("../controllers/channels");

router.post('/createChannel', channels.createChannel);


module.exports = router;