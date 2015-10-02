'use strict';

function NullStream() { }

NullStream.prototype.write = function() { };

Object.defineProperties(NullStream.prototype, {
  type: {
    get: function() {
      return 'stream';
    }
  },
  level: {
    get: function() {
      return 'fatal';
    }
  }
});

module.exports = NullStream;
