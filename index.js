// async-each MIT license (by Paul Miller from http://paulmillr.com).
(function(globals) {
  'use strict';
  var each = function(items, next, callback) {
    if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
    if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
    if (typeof callback !== 'function') callback = Function.prototype; // no-op

    if (items.length === 0) return callback(undefined, items);

    var transformed = new Array(items.length);
    var count = 0;
    var returned = false;

    for (var index = 0; index < items.length; i++) {
      var item = items[index];
      next(item, function(_index) {
        return function(error, transformedItem) {
          if (returned) return;
          if (error) {
            returned = true;
            return callback(error);
          }
          transformed[_index] = transformedItem;
          count += 1;
          if (count === items.length) return callback(undefined, transformed);
        }
      }(index));
    }
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
