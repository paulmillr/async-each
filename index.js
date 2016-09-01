// async-each MIT license (by Paul Miller from http://paulmillr.com).
(function(globals) {
  'use strict';
  var each = function(items, next, callback) {
    if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
    if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
    if (typeof callback !== 'function') callback = function() {};

    if (!items.length) return callback(undefined, items);

    var transformed = [];
    var count = 0;
    var returned = false;

    items.forEach(function(item, index) {
      next(item, function(error, transformedItem) {
        if (returned) return;
        if (error) {
          returned = true;
          return callback(error);
        }
        transformed[index] = transformedItem;
        count++;
        if (count === items.length) return callback(undefined, transformed);
      });
    });
  };

  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return each;
    }); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = each; // CommonJS
  } else {
    globals.asyncEach = each; // <script>
  }
})(this);
