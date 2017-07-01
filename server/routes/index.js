var express = require('express');
var router = express();
var auth = require('./auth');
var users = require('./users');
var urls = require('./urls');

router.use('/auth', auth);
router.use('/users', users);
router.use('/urls', urls);

module.exports = router;