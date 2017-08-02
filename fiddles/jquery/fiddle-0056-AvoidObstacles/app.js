(function (app, $, undefined) {
  "use strict";

  app.avoidObstacles = function(prefix, inputArray) {

    var findNonFactor = function(arr) {

      var queue = Object.assign([], arr),
          factor = 2;

      while (factor < 10) {
        queue = arr.filter((i) => {
          return i % factor === 0 ? true : false;
        });
        console.log('queue = ' + JSON.stringify(queue));
        if (queue.length === 0) {
          return factor;
        }
        queue = [];

        factor++;
      }

      return -1;

    };

    return findNonFactor(inputArray);

  };

  $(document).ready(function () {

    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>avoidObstacles = ' + app.avoidObstacles.toString() + '</pre>' +
      '<hr>' +
      '<h4>Test 1: avoidObstacles([5, 3, 6, 7, 9]):</h4>' +
      '<pre>' + JSON.stringify(app.avoidObstacles('Test 1', [5, 3, 6, 7, 9])) +'</pre>' +
      '<hr>' +

      '<h4>Test 2: avoidObstacles([2, 3]):</h4>' +
      '<pre>' + JSON.stringify(app.avoidObstacles('Test 2', [2, 3])) +'</pre>' +
      '<hr>' +
      '<h4>Test 3: avoidObstacles([1, 4, 10, 6, 2]):</h4>' +
      '<pre>' + JSON.stringify(app.avoidObstacles('Test 3', [1, 4, 10, 6, 2])) +'</pre>' +
      '<hr>' +
      '<h4>Test 4: avoidObstacles([19, 32, 11, 23]):</h4>' +
      '<pre>' + JSON.stringify(app.avoidObstacles('Test 4', [19, 32, 11, 23])) +'</pre>' +

     '<hr>' +
     '<h4>Test 5: avoidObstacles([5, 8, 9, 13, 14]):</h4>' +
     '<pre>' + JSON.stringify(app.avoidObstacles('Test 5', [5, 8, 9, 13, 14])) +'</pre>';



  });
})(window.app = window.app || {}, jQuery)
