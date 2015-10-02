'use strict';

var DefaultStream = require('./streams/default');
var DevelopmentStream = require('./streams/development');
var NullStream = require('./streams/null');

var getStream = function() {
  if (process.env.NODE_ENV === 'development') {
    return new DevelopmentStream();
  } else if (process.env.NODE_ENV === 'test') {
    return new NullStream();
  } else {
    return new DefaultStream();
  }
};

module.exports = function() {
  var stream = getStream();
  return {
    stream: stream,
    type: stream.type,
    level: stream.level
  };
};
