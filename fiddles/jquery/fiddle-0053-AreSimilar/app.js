(function (app, $, undefined) {
    "use strict";

  app.areSimilar = (prefix, a, b) => {

    console.log(prefix);
    console.log(JSON.stringify(a));
    console.log(JSON.stringify(b));

    var aJoin = a.join(''),
      bJoin = b.join(''),
      rc = false,
      swap = function (array, index1, index2) {
        var temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
      },
      similarHash = function(arrA, arrB) {
        var aH = Object.assign({}, arrA),
          bH = Object.assign({}, arrB),
          diffQueue = [];

        arrA.forEach((v, x) => {
          if (aH[x] !== bH[x]) {
            diffQueue.push(x);
          }
          if (diffQueue.length > 2) {
            return false;
          }
        });

        if (diffQueue.length === 2) {
          return true;
        }

        return false;
      },
      swapSome = function(arrA, arrB) {
        return arrB.some((v, x) => {
          return arrB.some((u, y) => {
            var dupB = Object.assign([], arrB),
                dupA = Object.assign([], arrA),
                aJoin = arrA.join(''),
                bJoin = arrB.join('');
            swap(dupB, x, y);
            if (dupB.join('') === aJoin) {
              return true;
            }
            swap(dupA, x, y);
            if (dupA.join('') === bJoin) {
              return true;
            }
          });
        });
      };


    if (aJoin === bJoin) {
      return true;
    }


    if (a.length < 50) {
      return swapSome(a, b);
    } else {
      return similarHash(a, b);
    }


  };

  $(document).ready(function () {

    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>areSimilar = ' + app.areSimilar.toString() + '</pre>' +

      '<hr>' +
      '<h4>Test 9: areSimilar([832, 998, 148, 570, 533, 561, 894, 147, 455, 279], [832, 998, 148, 570, 533, 561, 455, 147, 894, 279]):</h4>' +
      '<pre>' + JSON.stringify(app.areSimilar('Test 9', [832, 998, 148, 570, 533, 561, 894, 147, 455, 279], [832, 998, 148, 570, 533, 561, 455, 147, 894, 279])) +'</pre>' +

      '<hr>' +
      '<h4>Test 10: areSimilar([832, 998, 148, 570, 533, 561, 894, 147, 455, 279], [832, 570, 148, 998, 533, 561, 455, 147, 894, 279]):</h4>' +
      '<pre>' + JSON.stringify(app.areSimilar('Test 10', [832, 998, 148, 570, 533, 561, 894, 147, 455, 279], [832, 570, 148, 998, 533, 561, 455, 147, 894, 279])) +'</pre>';



  });
})(window.app = window.app || {}, jQuery)
