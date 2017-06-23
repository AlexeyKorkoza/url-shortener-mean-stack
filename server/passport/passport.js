var User = require("../models/user");
var passportLocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  passport.use('local-signup', new passportLocalStrategy({
      "usernameField": "email",
      "passwordField": "password",
      "session": false,
      "passReqToCallback": true
    },
    function (req, email, password, done) {
      var newUser = new User({
        email: email.trim(),
        username: req.body.username
      });

      newUser.password = newUser.generateHash(req.body.username.trim());

      newUser.save(function (err) {
        if (err) {
          return done(err, false);
        }
        return done(null, false);
      })
    }
  ))
};
