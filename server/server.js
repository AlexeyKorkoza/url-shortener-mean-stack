var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var config = require("./config");
var mongoose = require("mongoose");
var app = express();

var port = process.env.PORT || config.get('port');

mongoose.connect(config.get("db"));
var db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extend: false
}));

app.use(cors());

app.listen(port, function () {
  console.log("Server running");
});