var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var config = require("../config");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, config.get("jwtSecret"))
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
