(function (app, $, undefined) {
  "use strict";

  app.arrayChange = (prefix, inputArray) => {

    var correctionSteps = 0,
        inputHash = Object.assign({}, inputArray),
        missStep = function(arr, hash, s) {
          for (var i = s; i < arr.length; i++) {
            var y = "" + i,
                z = "" + (i - 1),
                value = hash[y],
                preValue = hash[z];
            if (value <= preValue) {
              return i;
            }
          }
          return -1;
        },
        index = 0,
        startIndex = 1;

        while (index !== -1) {
          var index = missStep(inputArray, inputHash, startIndex);
          if (index !== -1) {
            if (index > startIndex) {
              startIndex = index;
            }
            while (inputHash[index] <= inputHash[index - 1]) {
              inputHash[index] += 1;
              correctionSteps += 1;
            }
          }
        }

        return correctionSteps;

  };

  $(document).ready(function () {

    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>areSimilar = ' + app.arrayChange.toString() + '</pre>' +

      '<hr>' +
      '<h4>Test 1: arrayChange([1,1,1]):</h4>' +
      '<pre>' + JSON.stringify(app.arrayChange('Test 1', [1,1,1])) +'</pre>' +

      '<hr>' +
      '<h4>Test 2: arrayChange([-1000, 0, -2, 0]):</h4>' +
      '<pre>' + JSON.stringify(app.arrayChange('Test 2', [-1000, 0, -2, 0])) +'</pre>';



  });
})(window.app = window.app || {}, jQuery)
