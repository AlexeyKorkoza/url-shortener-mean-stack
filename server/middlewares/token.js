var jwt = require('express-jwt');
var config = require('../config');

function getTokenFromHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

var token = {
    required: jwt({
        secret: config.get('jwtSecret'),
        userProperty: 'payload',
        getToken: getTokenFromHeader
    })
};

module.exports = token;