const express = require("express");
const router = express.Router();

const auth = require("../controllers/users");

router.post('/login', auth.login);
// router.post("/users", auth.createUser);

module.exports = router;