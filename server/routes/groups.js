const express = require("express");
const router = express.Router();

const groups = require("../controllers/groups");

router.post('/getGroups', groups.getGroups);

router.post('/createGroup', groups.createGroup);


module.exports = router;