var sinon = require('sinon');
var bunyan = require('bunyan');
var logger = require('../index');
var express = require('express');
var request = require('supertest');
var should = require('should');

function createDefaultApplication() {
  'use strict';
   var app = express();

  app.use(logger);
  
  app.get('/something', function(req, res) {
    res.send('hello world.');
  });

  app.get('/error', function(req, res) {
    throw new Error('Sample Error');
  });

  return app;
}

describe ('default application test', function() {
  var infoSpy = {};
  var errorSpy = {};

  var app = createDefaultApplication();

  before(function() {
    infoSpy = sinon.spy(bunyan.prototype, 'info');
    errorSpy = sinon.spy(bunyan.prototype, 'error');

    sinon.stub(console, 'error');
  });

  beforeEach(function() {
    infoSpy.reset();
    errorSpy.reset();
  });

  after(function() {
    infoSpy.restore();
    console.error.restore();
  });

  describe('info logging', function() {
    it('should call info twice per request', function(done) {
      request(app)
        .get('/something')
        .end(function(err) {
          should.not.exist(err);

          infoSpy.calledTwice.should.be.true;
          done();
        });
    });
  });
});


