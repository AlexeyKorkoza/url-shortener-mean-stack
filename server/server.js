var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var config = require("./config");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var app = express();

var port = process.env.PORT || config.get('port');

mongoose.connect(config.get("db"));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extend: false
}));

app.use(morgan('dev'));
app.use(cors());

app.use(passport.initialize());

require("./passport/passport")(passport);

app.use(require('./routes'));

app.listen(port, function () {
  console.log("Server running");
});