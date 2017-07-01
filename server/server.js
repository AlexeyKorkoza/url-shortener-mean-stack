var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();

var port = config.get('port');

mongoose.connect(config.get('db'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extend: false
}));

app.use(morgan('dev'));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
    secret: 'keyboard cat'
}));
app.use(flash());

require('./passport/passport')(passport);

app.use(require('./routes'));

app.listen(port);