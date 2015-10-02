'use strict';

var _ = require('lodash');

var ipFromRequest = function(request) {
  return request.headers['x-forwarded-for'] || request.connection.remoteAddress;
};

var getFullStack = function(error) {
  var cause;
  var stack = error.stack || error.toString();

  if (_.isFunction(error.cause)) {
    cause = error.cause();

    if (cause) {
      stack += '\nCaused by: ' + getFullStack(cause);
    }
  }
};

module.exports = {
  getFullStack: getFullStack,
  ipFromRequest: ipFromRequest
};
