var express = require('express');
var GoogleUrl = require('google-url');
var _ = require('lodash');
var token = require('../middlewares/token');
var Url = require('../models/url');
var config = require('../config');
var router = express();

router.post('/create', token.required, createShortUrl);

module.exports = router;

function createShortUrl(req, res) {

  _.trim(req.body.list_tags);
  var tags = _.split(req.body.list_tags, ',');
  tags.splice(tags.length - 1, 1);

  var date = returnDate();
  var time = returnTime();

  var googleUrl = new GoogleUrl({
   "key" : config.get('google_key')
  });

  googleUrl.shorten(req.body.full_url, function(err, shortUrl) {

    if (err) {
      res.status(500).json(err);
    }

    var url = new Url({
     "author": req.payload.username,
     "description": req.body.description,
     "full_url": req.body.full_url,
     "short_url": shortUrl,
     "list_tags": [],
     "date": date,
     "time": time
    });

   _.forEach(tags, function (value,i) {
      url.list_tags[i] = {
        "name": value
      };
   });

    url.save(function (err, url) {

      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json("Shortener url is created!");
      }

    });

   });

}

function returnDate() {
  var d = new Date();
  var yyyy = d.getFullYear();
  var mm = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
  var dd  = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  return dd + "-" + mm + "-" + yyyy;
}

function returnTime() {
  var d = new Date();
  var hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  var min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var ss = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  return hh + ":" + min + ":" + ss;
}