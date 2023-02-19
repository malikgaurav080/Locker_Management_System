var expect  = require('chai').expect;
var request = require('request');
const assert = require('chai').assert;


it('Main page content', function(done) {
    request('http://localhost:3002' , function(error, response, body) {
        expect(body).to.equal('Tests API From Gaurav');
        done();
    });
});
it('Type page content', function(done) {
    request('http://localhost:3002' , function(error, response, body) {
        assert.isString(body,'string')
        done();
    });
});
it('API signin', function(done) {
    request('http://localhost:3002/admin/signin' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
  /*
  * Test the /POST route
  */
  describe('/POST user', () => {
      it('it should signin with 200 code and return object contains data & jwt token', (done) => {
          let user = {
            "email":"test@123",
            "password":"11223344"
        }
        chai.request('http://localhost:3002')
            .post('/admin/signin')
            .send(user)
            .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
              done();
            });
      });
  });