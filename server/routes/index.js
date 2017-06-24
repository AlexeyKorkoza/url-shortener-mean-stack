var express = require("express");
var router = express();
var auth = require('./auth');

router.use("/auth", auth);

module.exports = router;