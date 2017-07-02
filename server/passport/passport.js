var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.use('local-signup', new LocalStrategy({
        session: false,
        passReqToCallback: true
    },
    function (req, username, password, done) {
        var newUser = new User({
            email: req.body.email.trim(),
            username: username.trim()
        });

        newUser.password = newUser.generateHash(password);

        newUser.save(function (err) {
            if (err) {
                return done(err, false);
            }
            return done(null, false);
        });
    }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        session: false,
        passReqToCallback: true
    },
    function (req, email, password, done) {

        User.findOne({ 'email': email }, function(err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'Oops! User not found.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            var userData = {
                'username': user.username,
                'token': user.generateJWT()
            };

            return done(null, userData);
        });
    })
    );
};
