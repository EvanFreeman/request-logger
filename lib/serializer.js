'use strict';

var helpers = require('./streams/helpers');

var requestSerializer = function(request) {
  if (request) {
    return {
      url: request.url,
      method: request.method,
      protocol: request.protocol,
      requestId: request.requestId,
      ip: helpers.ipFromRequest(request),
      headers: request.headers
    };
  }
};

var responseSerializer = function(response) {
  if (response) {
    return {
      statusCode: response.statusCode,
      requestId: response.requestId,
      responseTime: response.responseTime,
      headers: response._header
    };
  }
};

var errorSerializer = function(error) {
  if (error) {
    return {
      message: error.message,
      name: error.name,
      stack: helpers.getFullStack(error),
      code: error.code,
      signal: error.signal,
      requestId: error.requestId
    };
  }
};

module.exports = {
  req: requestSerializer,
  res: responseSerializer,
  err: errorSerializer
};
