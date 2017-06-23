var mongoose = require('mongoose');
var User = require('../models/user');
var express = require('express');
var passport = require('passport');
var router = express();

router.post('/signup', function(req, res, next) {

  passport.authenticate('local-signup', { failureFlash: true }, function (err) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          errorMessage: 'This User is already taken'
        });
      }

      return res.status(400).json({
        errorMessage: 'Could not process the form'
      });
    }

    return res.status(204).end();
  })(req, res, next);

});

module.exports = router;
