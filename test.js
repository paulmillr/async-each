var asyncEach = require('.');
function double(int, callback) {
  setTimeout(
    function () {
      console.log(int, 'done');
      callback(null, int * 2);
    },
    int === 8 ? 1000 : 10
  );
}
var _0to100 = [...Array(10).keys()];
asyncEach(_0to100, double, function (err, result) {
  console.log('cb called');
  if (err) return console.error(err);
  console.log(result);
});
