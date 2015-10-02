'use strict';

function DefaultStream() { }

DefaultStream.prototype.write = function(json) {
  process.stdout.write(json);
};

Object.defineProperties(DefaultStream.prototype, {
  type: {
    get: function() {
      return 'stream';
    }
  },
  level: {
    get: function() {
      return 'info';
    }
  }
});

module.exports = DefaultStream;
