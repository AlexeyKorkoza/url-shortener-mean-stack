var app = require('../server');
var chai = require('chai');
var request = require('supertest')(app);

var expect = chai.expect;

describe('Auth tests', function () {

    it('Should create a new user', function (done) {
        request
            .post('/auth/signup')
            .send({
                username: 'Alexey2',
                password: '1234567',
                email: 'Keane95@yandex.ru2'
            })
            .expect(204)
            .end(function (err) {
                if (err) return done(err);
                done();
            });
    });

    it('Should auth of the user', function (done) {
        request
            .post('/auth/login')
            .send({email: 'Keane95@yandex.ru2', password: '1234567'})
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.user).to.have.property('token');
                expect(res.body.user).to.have.property('username');

                done();
            });
    });

});