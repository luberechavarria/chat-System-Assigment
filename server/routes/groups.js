const express = require("express");
const router = express.Router();

const groups = require("../controllers/groups");

router.post('/getGroups', groups.getGroups);

router.post('/createGroup', groups.createGroup);

router.post('/addExistedUserToGroup', groups.addExistedUserToGroup);

router.post('/removeGroup', groups.removeGroup);


module.exports = router;