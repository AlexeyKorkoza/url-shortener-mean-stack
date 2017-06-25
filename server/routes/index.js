var express = require("express");
var router = express();
var auth = require('./auth');
var users = require('./users');

router.use("/auth", auth);
router.use("/users", users);

module.exports = router;