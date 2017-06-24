(function (app, $, undefined) {
    "use strict";

    app.addTwoHugeNumbers = (prefix, a, b) => {
    "use strict";

    let x = JSON.stringify(a).slice(1,-1).split(','),
      y = JSON.stringify(b).slice(1,-1).split(','),
      u = '',
      v = '',
      rc = [],
      sum = '',
      uSeg = 0,
      lSeg = 0,
      iter = 0,
      carry = 0,
      i = 0;

    if (typeof a === 'object' && typeof b === 'object') {
      if // same size
      (x.length === y.length && x.length > 1) {
        y.forEach((digit, index) => {
          rc.push((+digit) + (+x[index]));
      });
      } // both zero
      else if (y.length === x.length && x.length === 1 && x[0] === y[0] && x[0] === "0") {
        rc = x;
      } // a is zero
      else if(y.length > 1 && x.length === 1 && x[0] === "0") {
        rc = y;
      } // b is zero
      else if(x.length > 1 && y.length === 1 && y[0] === "0") {
        rc = x;
      } // otherwise combine, add, divide
      else {
        u = JSON.stringify(a).slice(1,-1).replace(/,/g,'');
        v = JSON.stringify(b).slice(1,-1).replace(/,/g,'');
        sum = Number((+u) + (+v)) + "";

        if // sum is exponential
        (sum.indexOf('e') !== -1) {
          let left = sum.substring(0, sum.indexOf('e')),
            right = sum.substring(sum.indexOf('+') + 1, sum.length),
            hasDecimal = left.indexOf('.') !== -1 ? true : false,
            decimalOffset = hasDecimal ? left.length - (left.indexOf('.') + 1) : 0,
            zeroCount = +right - decimalOffset;

          if (hasDecimal) {
            left = left.replace('.', '');
          }

          sum = left;

          while(i < zeroCount) {
            sum += '0';
            i++;
          }
          i = 0;

        } // end if sum is ...


        carry = sum.length % 4;
        iter = sum.length / 4;
        lSeg = sum.length - 4;
        uSeg = sum.length;

        while (i < iter) {
          rc.unshift(sum.substring(lSeg, uSeg));
          lSeg -= 4;
          uSeg -= 4;
          i++;
        } // while

      } // end else

      a = b = null;

      rc.map(Number);
    }

    return rc;

    } // end func

  $(document).ready(function () {
    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre> addTwoHugeNumbers = ' + app.addTwoHugeNumbers.toString() + '</pre>' +

   '<hr>' +
    '<h4>Test 1: addTwoHugeNumbers([9876, 5432, 1999], [1, 8001]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 1', [9876, 5432, 1999], [1, 8001])) +'</pre>' +

    '<hr>' +
    '<h4>Test 2: addTwoHugeNumbers([123, 4, 5],  [100, 100, 100]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 2', [123, 4, 5],  [100, 100, 100])) +'</pre>' +

    '<hr>' +
    '<h4>Test 3: addTwoHugeNumbers([0],  [0]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 3', [0],  [0])) +'</pre>'  +

    '<hr>' +
    '<h4>Test 4: addTwoHugeNumbers([1234, 1234, 0],  [0]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 4', [1234, 1234, 0],  [0])) +'</pre>' +

    '<hr>' +
    '<h4>Test 5: addTwoHugeNumbers([0], [1234, 1234, 0]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 5', [0], [1234, 1234, 0])) +'</pre>' +

    '<hr>' +
    '<h4>Test 6: addTwoHugeNumbers([1], [9998, 9999, 9999, 9999, 9999, 9999]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 6', [1], [9998, 9999, 9999, 9999, 9999, 9999])) +'</pre>' +

    '<hr>' +
    '<h4>Test 7: addTwoHugeNumbers([1], [9999, 9999, 9999, 9999, 9999, 9999]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 7', [1], [9999, 9999, 9999, 9999, 9999, 9999])) +'</pre>' +

    '<hr>' +
    '<h4>Test 8: addTwoHugeNumbers([8339, 4510],  [2309]):</h4>' +
    '<pre>' + JSON.stringify(app.addTwoHugeNumbers('test 8', [8339, 4510],  [2309])) +'</pre>';

  });
})(window.app = window.app || {}, jQuery)
