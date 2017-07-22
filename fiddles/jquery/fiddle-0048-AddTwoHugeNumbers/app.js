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
        i = 0,
        buffer = {
          a: 0,
          b: 0,
          sum: 0,
          rem: 0
        },
        calc = function(buf) {
          var u = (+buf.a),
          v = (+buf.b),
          z = (+buf.rem),
          sum = u + v + z;

          var sumStr = String(sum),
            carryLeftStr = sumStr.length > 4 ? sumStr.substr(0, sumStr.length - 4) : null,
            right4DigitsStr = sumStr.length > 4 ? sumStr.substr(sumStr.length - 4, sumStr.length) : sumStr,
            carryLeft = carryLeftStr ? +carryLeftStr : null;

          buf.sum = right4DigitsStr;

          if (carryLeft) {
            buf.rem = carryLeftStr;
          } else {
            buf.rem = '0';
          }

          return buf;
        },
        buf = Object.assign(buffer, {});


      if (typeof a === 'object' && typeof b === 'object') {
        if // same size
        (x.length === y.length && x.length > 1) {
          rc = y;
          i = y.length - 1;
          for(var xi = x.length -1; xi >= 0; xi--) {
            buf.a = y[i];
            buf.b = x[xi];
            buf = calc(buf);
            rc[i] = buf.sum;
            i--;
          }
          if (buf.rem !== '0') {
            rc = [buf.rem].concat(rc);
          }
        } // both zero
        else if (y.length === x.length && x.length === 1 && x[0] === y[0] && x[0] === "0") {
          rc = x;
        } // a is zero
        else if(y.length > 1 && x.length === 1 && x[0] === "0") {
          rc = y;
        } // b is zero
        else if(x.length > 1 && y.length === 1 && y[0] === "0") {
          rc = x;
        } // x is smaller than y
        else if (x.length < y.length) {
            rc = y;
            i = y.length - 1;
            for(var xi = x.length -1; xi >= 0; xi--) {
              buf.a = y[i];
              buf.b = x[xi];
              buf = calc(buf);
              rc[i] = buf.sum;
              i--;
            }

            while (i >= 0 && buf.rem !== '0') {
              buf.a = y[i];
              buf.b = buf.rem;
              buf.rem = '0';
              buf = calc(buf);
              rc[i] = buf.sum;
              i--;
            }
            if (buf.rem !== '0') {
              rc = [buf.rem].concat(rc);
            }

        } // y is smaller than x
        else {
          rc = x;
          i = x.length - 1;
          for(var yi = y.length -1; yi >= 0; yi--) {
            buf.a = x[i];
            buf.b = y[yi];
            buf = calc(buf);
            rc[i] = buf.sum;
            i--;
          }

          while (i >= 0 && buf.rem !== '0') {
            buf.a = x[i];
            buf.b = buf.rem;
            buf.rem = '0';
            buf = calc(buf);
            rc[i] = buf.sum;
            i--;
          }

          if (buf.rem !== '0') {
            rc = [buf.rem].concat(rc);
          }

        }

        a = b = null;

      }

      return rc.map(Number);

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
