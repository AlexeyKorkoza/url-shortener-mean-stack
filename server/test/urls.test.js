var app = require('../server');
var chai = require('chai');
var request = require('supertest')(app);

var expect = chai.expect;

var url = {};
var id;

describe('Urls Tests for auth users', function () {

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

    it('should create a url', function (done) {

        request
            .post('/urls/create')
            .set('Authorization', 'Token ' + token)
            .send({
                author: 'Alexey',
                description: 'grrggr',
                full_url: 'https://github.com',
                short_url : 'https://goo.gl/un5E',
                date : '04-07-2017',
                time : '12:24:26',
                count_click: 0,
                list_tags: 'Sport,Football,Hockey,Ducks,NHL,'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.author).to.equal('Alexey');
                url = res.body;
                done();
            });
    });

    it('should get the url by id', function (done) {
        request
            .get('/urls/' + url._id)
            .set('Authorization', 'Token ' + token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should get the url by id by user', function (done) {
        request
            .get('/urls/stats')
            .set('Authorization', 'Token ' + token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should modify a url', function (done) {
        request
            .put('/urls/' + url._id)
            .set('Authorization', 'Token ' + token)
            .send({
                description: 'Good description',
                list_tags: 'Sport,Football,Hockey,Ducks,NHL,Liverpool,'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.description).to.equal('Good description');
                expect(res.body.list_tags[5]).to.equal('Liverpool');
                url = res.body;
                done();
            });
    });

    it('should updating a count of the click by id', function (done) {
        request
            .put('/urls/count/' + url._id)
            .set('Authorization', 'Token ' + token)
            .send(url)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.count_click).to.equal(1);
                url = res.body;
                id = url._id;
                done();
            });
    });
});

describe('Urls Tests for unauth users', function () {

    it('should get all urls', function (done) {
        request
            .get('/urls')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.be.empty;
                done();
            });
    });

    it('should get the url by id by guest', function (done) {
        request
            .get('/urls/guest/' + id)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                done();
            });
    });

});