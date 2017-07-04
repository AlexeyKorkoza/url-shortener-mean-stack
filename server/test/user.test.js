var app = require('../server');
var chai = require('chai');
var request = require('supertest')(app);

var expect = chai.expect;

describe('Users Tests', function () {

    var token;

    beforeEach(function (done) {
        request
            .post('/auth/login')
            .send({email: 'Keane95@yandex.ru', password: '123456'})
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.user).to.have.property('token');
                token = res.body.user.token;
                done();
            });
    });

    it('should get info about user', function (done) {
        request
            .get('/users')
            .set('Authorization', 'Token ' + token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.user).to.have.property('username');
                expect(res.body.user).to.have.property('token');
                done();
            });
    });
});

