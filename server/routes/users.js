var express = require('express');
var User = require('../models/user');
var token = require('../middlewares/token');
var router = express();

router.get("", token.required, getUser);

module.exports = router;

function getUser(req, res) {

  User.findById({_id: req.payload.id}, function (err, user) {

    if (err) {
      res.status(400).json(err);
    }

    if (user) {
      res.status(200).json({
        user: {
          'username': user.username,
          'token': user.generateJWT()
        }
      })
    }
  })
}