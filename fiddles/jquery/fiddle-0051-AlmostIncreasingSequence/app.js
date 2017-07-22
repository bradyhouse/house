(function (app, $, undefined) {
  "use strict";

  app.almostIncreasingSequence = function(prefix, sequence) {
      var firstBadPair = function (arr) {
          if (arr.length > 1) {
            for (var i =0;i < arr.length; i++) {
              var x = i + 1;
              if (x < arr.length) {
                if (arr[i] >= arr[x]) {
                  return i;
                }
              }
            }
          }
          return -1;
        },
        j = firstBadPair(sequence);

      if (j == -1) {
        return true;
      }

      var arr = Object.assign([], sequence),
        trash = arr.splice(j,1),
        k = firstBadPair(arr);

      if (k == -1) {
        return true;
      }

      var i = j + 1;

      while (i < sequence.length) {
        var seq = Object.assign([], sequence),
          trash = seq.splice(i,1),
          x = firstBadPair(seq);
        if (x === -1) {
          return true;
        }
        i++;
      }

      return false;
    }

    $(document).ready(function () {
      let fiddle = document.getElementById('fiddleHook');
      fiddle.innerHTML = '<pre>almostIncreasingSequence = ' + app.almostIncreasingSequence.toString() + '</pre>' +

        '<hr>' +
        '<h4>Test 1: almostIncreasingSequence([1, 3, 2, 1]):</h4>' +
        '<pre>' + JSON.stringify(app.almostIncreasingSequence('test1', [1, 3, 2, 1])) +'</pre>' +

        '<hr>' +
        '<h4>Test 2: almostIncreasingSequence([1, 3, 2]):</h4>' +
        '<pre>' + JSON.stringify(app.almostIncreasingSequence('test2', [1, 3, 2])) +'</pre>' +

        '<hr>' +
        '<h4>Test 3: almostIncreasingSequence([1, 2, 1, 2]):</h4>' +
        '<pre>' + JSON.stringify(app.almostIncreasingSequence('test3', [1, 2, 1, 2])) +'</pre>' +

        '<hr>' +
        '<h4>Test 5: almostIncreasingSequence([10, 1, 2, 3, 4, 5]):</h4>' +
        '<pre>' + JSON.stringify(app.almostIncreasingSequence('test5', [10, 1, 2, 3, 4, 5])) +'</pre>' +

        '<hr>' +
        '<h4>Test 6: almostIncreasingSequence([1, 1, 1, 2, 3]):</h4>' +
        '<pre>' + JSON.stringify(app.almostIncreasingSequence('test6', [1, 1, 1, 2, 3])) +'</pre>';



    });
})(window.app = window.app || {}, jQuery)
