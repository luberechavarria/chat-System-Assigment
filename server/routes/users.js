const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.post('/login', users.login);

router.post('/getUsersChannel', users.getUsersChannel);

router.post('/promoteUserAsAdmin', users.promoteUserAsAdmin);

router.post('/removeUser', users.removeUser);

router.post('/createNewUser', users.createNewUser);


module.exports = router;