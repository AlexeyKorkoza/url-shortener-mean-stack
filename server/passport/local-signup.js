// var User = require('../services/mongoose').model('User');
// var passportLocalStrategy = require('passport-local').Strategy;
//
// module.exports = function () {
//   /**
//    * Return the Passport Local Strategy object.
//    */
//   return new passportLocalStrategy(config,
//       function(req, email, password, done) {
//
//
//
//       const userData = {
//         email: email.trim(),
//         password: password.trim(),
//         username: req.body.username.trim(),
//         userRole: 'USER',
//       };
//   const newUser = new User(userData);
//   newUser.save((err, userData) => {
//     if (err) { return done(err); }
//     return done(null);
// });
// });
// };/**
//  * Created by Alexey on 23.06.2017.
//  */
