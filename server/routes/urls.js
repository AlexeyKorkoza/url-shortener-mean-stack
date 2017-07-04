var express = require('express');
var GoogleUrl = require('google-url');
var _ = require('lodash');
var token = require('../middlewares/token');
var Url = require('../models/url');
var config = require('../config');
var router = express();

router.get('', getUrls);
router.get('/stats', token.required, getStatsByUsername);
router.get('/:id', token.required, getUrlById);
router.get('/guest/:id', getUrlByIdForGuest);
router.post('/create', token.required, createShortUrl);
router.put('/count/:id', token.required, updateCountClick);
router.put('/:id', token.required, updateUrlById);

module.exports = router;

function getUrls(req, res) {

    Url.find({}, function (err, urls) {

        if (err) {
            res.status(500).json(err);
        }

        if (urls.length > 0) {
            res.status(200).json({
                urls: urls
            });
        }

        if (urls.length === 0) {
            res.status(500);
        }

    });
}

function getStatsByUsername(req, res) {

    Url.find({'author': req.payload.username}, function (err, urls) {

        if (err) {
            res.status(500).json(err);
        }

        if (urls.length > 0) {
            var urlsCount = _.reduce(urls, function (current, item) {
                if (item.count_click) {
                    current += item.count_click;
                }
                return current;
            }, 0);

            res.status(200).json({
                urls: urls,
                urlsCount: urlsCount
            });
        }

        if (urls.length === 0) {
            res.status(500).json('Urls didn\'t find');
        }
    });
}

function getUrlById(req, res) {

    Url.findOne({_id: req.params.id}, function (err, url) {

        if (err) {
            res.status(500).json(err);
        }

        if (url) {

            var flag = false;
            if (req.payload.username === url.author) {
                flag = true;
            }

            res.status(200).json({
                url: url,
                edit: flag
            });
        }
    });
}

function getUrlByIdForGuest(req, res) {
    Url.findOne({_id: req.params.id}, function (err, url) {

        if (err) {
            res.status(500).json(err);
        }

        if (url) {

            res.status(200).json({
                url: url
            });
        }
    });
}

function createShortUrl(req, res) {

    _.trim(req.body.list_tags);
    var tags = _.split(req.body.list_tags, ',');
    tags.splice(tags.length - 1, 1);

    var date = returnDate();
    var time = returnTime();

    var googleUrl = new GoogleUrl({
        'key': config.get('google_key')
    });

    googleUrl.shorten(req.body.full_url, function (err, shortUrl) {

        if (err) {
            res.status(500).json(err);
        }

        var url = new Url({
            'author': req.payload.username,
            'description': req.body.description,
            'full_url': req.body.full_url,
            'short_url': shortUrl,
            'list_tags': tags,
            'date': date,
            'time': time
        });

        url.save(function (err, url) {

            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json(url);
            }

        });

    });

}

function updateCountClick(req, res) {

    var count_click = req.body.count_click + 1;

    Url.findOneAndUpdate({_id: req.params.id}, {count_click: count_click}, {new: true}, function (err, url) {

        if (err) {
            return res.status(500).json(err);
        }

        if (url) {
            return res.status(200).json(url);
        }

    });
}

function updateUrlById(req, res) {

    _.trim(req.body.list_tags);
    var tags = _.split(req.body.list_tags, ',');
    tags.splice(tags.length - 1, 1);

    Url.findOneAndUpdate({_id: req.params.id}, { description: req.body.description, list_tags: tags}, {new: true}, function (err, url) {

        if (err) {
            res.status(500).json(err);
        }

        if (url) {
            res.status(200).json(url);
        }

    });

}

function returnDate() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    var dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return dd + '-' + mm + '-' + yyyy;
}

function returnTime() {
    var d = new Date();
    var hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    return hh + ':' + min + ':' + ss;
}