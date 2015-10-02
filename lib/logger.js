'use strict';

var bunyan = require('bunyan');
var cuid = require('cuid');
var serializer = require('./serializer');
var stream = require('./streams')();

var log = bunyan.createLogger({
  name: '4ltr',
  serializers: serializer,
  streams: [ stream ]
});

var requestLogger = function(request, response, next) {
  var startTime = new Date();

  request.requestId = cuid();
  log.info({ req: request });

  request.on('end', function() {
    response.responseTime = new Date() - startTime;
    response.requestId = request.requestId;
    log.info({ res: response });
  });

  next();
};
module.exports = requestLogger; 
