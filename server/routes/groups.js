const express = require("express");
const router = express.Router();

const groups = require("../controllers/groups");

router.post('/getGroups', groups.getGroups);

module.exports = router;