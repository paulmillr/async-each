var asyncEach = require('.');
function double(int, callback) {
  setTimeout(function () {
    callback(null, int * 2);
  }, 10);
}
var _0to100 = [...Array(100).keys()];
asyncEach(_0to100, double, function (err, result) {
  if (err) return console.error(err);
  console.log(result);
});
