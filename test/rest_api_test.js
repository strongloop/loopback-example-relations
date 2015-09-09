/* jshint camelcase: false */
var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  }

describe('REST API request', function() {
  before(function(done) {
    require('./start-server');
    done();
  });
  
  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  it('should return a list of all customers', function(done) {
    json('get', '/api/customers')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.equal(res.body.length, 5);
        done();
      });   
  });

  it('should return a list of all customers with names', function(done){
    json('get', '/api/customers?filter[fields][name]=true')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.equal(res.body.length, 5);
        done();
      });    
  });

  it('should return a the customer with id 1', function(done) {
    json('get', '/api/customers/1')
      .expect(200, function(err, res){
        assert(res.body.name);
        assert(res.body.age);
        assert(res.body.id);
        done();
      });   
  });

  it('should return a the customer with id 1', function(done) {
    json('get', '/api/customers/1')
      .expect(200, function(err, res){
        assert.equal(res.body.id, 1);
        done();
      });     
  });

  it('should return a the customer with age less than 22', function(done) {
    json('get', '/api/customers/youngFolks')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.notEqual(res.body.length, 0);
        assert(res.body[0].name);
        assert(res.body[0].age);
        assert(res.body[0].id);
        done();
      });    
  });


  it('should return review by customer 1', function(done) {
    json('get', '/api/customers/1/reviews')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.notEqual(res.body.length, 0);
        assert(res.body[0].product);
        assert(res.body[0].star);
        assert(res.body[0].id);
        assert(res.body[0].authorId);
        done();
      });     
  });

  it('should return review by customer 1', function(done) {
    json('get', '/api/customers/1/orders')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.notEqual(res.body.length, 0);
        assert(res.body[0].description);
        assert(res.body[0].total);
        assert(res.body[0].id);
        assert(res.body[0].customerId);
        done();
      });    
  });  
});


describe('Unexpected Usage', function(){
  it('should not crash the server when posting a bad id', function(done){
    json('post', '/api/customers/foobar')
      .send({})
      .expect(404, done);
  });
});
