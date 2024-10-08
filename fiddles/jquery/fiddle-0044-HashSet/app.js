(function (app, $, undefined) {

  class HashSet {

    constructor() {
      this.set = {};
    }

    add (key) {
      this.set[key] = true;
    };


    contains(key) {
      return this.set.hasOwnProperty(key) ? true : false;
    };

  };
  
  app.isListPalindrome = (l) => {
    if(l.length > 0) {
      return (JSON.stringfy(l) === JSON.stringify(l.sort()))
   });

    }
    return false;
  };


  $(document).ready(function () {
    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>sumOfTwo = ' + app.sumOfTwo.toString() + '</pre>' +
        '<hr>' +
        '<h4>Test 1: sumofTwo([1, 2, 3], [10, 20, 30, 40], 42):</h4>' +
        '<pre>' + JSON.stringify(app.sumOfTwo([1, 2, 3], [10, 20, 30, 40], 42)) +'</pre>' +
        '<hr>'+
       '<h4>Test 2: sumofTwo([1, 2, 3], [10, 20, 30, 40], 50):</h4>' +
        '<pre>' + JSON.stringify(app.sumOfTwo([1, 2, 3], [10, 20, 30, 40], 50)) + '</pre>' +
      '<br>' +
      '<hr>' +
      '<h4>Test 3: sumofTwo([], [1,2,3,4], 4):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([], [1,2,3,4], 4)) + '</pre>' +
      '<br/>' +
      '<hr>' +
      '<h4>Test 4: sumofTwo([10, 1, 5, 3, 8], [100, 6, 3, 1, 5], 4):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([10, 1, 5, 3, 8], [100, 6, 3, 1, 5], 4)) + '</pre>' +
      '<br>' +
      '<hr>' +
      '<h4>Test 5: sumofTwo([1, 4, 3, 6, 10, 1, 0, 1, 6, 5], [9, 5, 6, 9, 0, 1, 2, 1, 6, 10], 8):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([1, 4, 3, 6, 10, 1, 0, 1, 6, 5], [9, 5, 6, 9, 0, 1, 2, 1, 6, 10], 8)) + '</pre>' +
      '<br>' +
      '<hr>' +
      '<h4>Test 6: sumofTwo([3, 2, 3, 7, 5, 0, 3, 0, 4, 2],  [6, 8, 2, 9, 7, 10, 3, 8, 6, 0], 2):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([3, 2, 3, 7, 5, 0, 3, 0, 4, 2],  [6, 8, 2, 9, 7, 10, 3, 8, 6, 0], 2)) + '</pre>' +
      '<br>' +
      '<hr>' +
      '<h4>Test 7: sumofTwo([4, 6, 4, 2, 9, 6, 6, 2, 9, 2],  [3, 4, 5, 1, 4, 10, 9, 9, 6, 4], 5):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([4, 6, 4, 2, 9, 6, 6, 2, 9, 2],  [3, 4, 5, 1, 4, 10, 9, 9, 6, 4], 5)) + '</pre>' +
      '<br>' +
      '<hr>' +
      '<h4>Test 8: sumofTwo([6, 10, 25, 13, 20, 21, 11, 10, 18, 21],  [21, 10, 6, 0, 29, 25, 1, 17, 19, 25], 37):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([6, 10, 25, 13, 20, 21, 11, 10, 18, 21],  [21, 10, 6, 0, 29, 25, 1, 17, 19, 25], 37)) + '</pre>' +
      '<br>' +
      '<hr>'+
      '<h4>Test 9: sumofTwo([22, 26, 6, 22, 17, 11, 9, 22, 7, 12],  [14, 25, 22, 27, 22, 30, 6, 26, 30, 27], 56):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([22, 26, 6, 22, 17, 11, 9, 22, 7, 12],  [14, 25, 22, 27, 22, 30, 6, 26, 30, 27], 56)) + '</pre>' +
      '<br>' +
      '<hr>' +
      '<h4>Test 10: sumofTwo([17, 72, 18, 72, 73, 15, 83, 90, 8, 18],  [100, 27, 33, 51, 2, 71, 76, 19, 16, 43], 37):</h4>' +
      '<pre>' + JSON.stringify(app.sumOfTwo([17, 72, 18, 72, 73, 15, 83, 90, 8, 18],  [100, 27, 33, 51, 2, 71, 76, 19, 16, 43], 37)) + '</pre>' +
      '<br>';


  });
})(window.app = window.app || {}, jQuery)
