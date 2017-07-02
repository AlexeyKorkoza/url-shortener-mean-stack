var express = require('express');
var passport = require('passport');
var router = express();

router.post('/signup', function(req, res, next) {

    passport.authenticate('local-signup', function (err) {
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

router.post('/login', function(req, res, next) {

    passport.authenticate('local-login', { failureFlash: true }, function(err, userData ) {
        if (err) {
            if (err.name === 'Incorrect Credentials Error') {
                return res.status(400).json({
                    errorMessage: err.name
                });
            }
        }

        if (userData) {
            return res.status(200).json({
                user: userData
            });
        } else {
            return res.status(401).json(req.flash('loginMessage')[0]);
        }
    })(req, res, next);
});

module.exports = router;
