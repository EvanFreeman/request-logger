'use strict';

function DevelopmentStream() { }

var logRequest = function(request) {
  console.log(request.method + ' ' + request.url);
};

var logResponse = function(response) {
  var log = '  ' + response.statusCode + ' in ' + response.responseTime + 'ms';
  console.log(log);
};

var logObject = function(object) {
  console.log(JSON.stringify(object));
};

DevelopmentStream.prototype.write = function(object) {
  if (object.req) {
    logRequest(object.req);
  } else if (object.res) {
    logResponse(object.res);
  } else {
    logObject(object);
  }
};

Object.defineProperties(DevelopmentStream.prototype, {
  type: {
    get: function() {
      return 'raw';
    }
  },
  level: {
    get: function() {
      return 'debug';
    }
  }
});

module.exports = DevelopmentStream;
