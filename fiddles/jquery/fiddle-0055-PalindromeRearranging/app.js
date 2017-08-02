(function (app, $, undefined) {
  "use strict";

  app.palindromeRearranging = function(prefix, inputString) {

    var createItemCountHash = function(arr) {
      var hash = {};

      arr.forEach((i) => {
        if (hash.hasOwnProperty(i)) {
          hash[i]+= 1;
        } else {
          hash[i] = 1;
        }
      });
      return hash;

    },
      arr = inputString.split(''),
      hash = createItemCountHash(arr),
      singularQueue = [],
      evenQueue = [],
      oddQueue = [],
      i = 0;



    // if the arr length is even
    // then verify that each character
    // occurs an even number of times
    // or that the number characters
    // occurring once is even.

    while(i < arr.length) {
      if (hash.hasOwnProperty(arr[i])) {
        if (hash[arr[i]] % 2 === 0) {
          evenQueue.push(arr[i]);
        } else if (hash[arr[i]] === 1) {
          singularQueue.push(arr[i]);
        } else {
          oddQueue.push(arr[i]);
        }
        delete hash[arr[i]];
      }

      if (oddQueue.length > 1 || singularQueue.length > 1) {
        return false;
      }

      i++;
    }

    if (oddQueue.length === 1 && evenQueue.length === 0 && singularQueue.length === 0) {
      return true;
    }

    if (evenQueue.length >= 1 && singularQueue.length === 0 && oddQueue.length === 0) {
      return true;
    }

    if (singularQueue.length === 1 && evenQueue.length === 0 && oddQueue.length === 0) {
      return true;
    }

    if (singularQueue.length > 1 && evenQueue.length === 0 && oddQueue.length === 0) {
      return false;
    }

    if (evenQueue.length >= 1 && singularQueue.length <= 1 && oddQueue.length === 0) {
      return true;
    }

    return true;

    console.log(prefix);
    console.log('evenQueue = ' + JSON.stringify(evenQueue));
    console.log('oddQueue = ' + JSON.stringify(oddQueue));
    console.log('singularQueue = ' + JSON.stringify(singularQueue));



  }

  $(document).ready(function () {

    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>palindromeRearranging = ' + app.palindromeRearranging.toString() + '</pre>' +

      '<hr>' +
      '<h4>Test 1: palindromeRearranging("zyyzzzzz"):</h4>' +
      '<pre>' + JSON.stringify(app.palindromeRearranging('Test 4', 'zyyzzzzz')) +'</pre>'; /*

      '<hr>' +
      '<h4>Test 2: palindromeRearranging([-1000, 0, -2, 0]):</h4>' +
      '<pre>' + JSON.stringify(app.palindromeRearranging('Test 2', [-1000, 0, -2, 0])) +'</pre>'; */



  });
})(window.app = window.app || {}, jQuery)
