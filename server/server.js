var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extend: false
}));

app.use(cors());

app.listen(8000, function () {
  console.log("Server running");
});