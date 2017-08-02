(function (app, $, undefined) {
    "use strict";

  app.mineswpeer(matrix) {
    var sol = [];
    for (var i = 0; i < matrix.length; i++) {
      var row = [];

      for (var j = 0; j < matrix[0].length; j++) {
        var v = 0;
        for (var ii = Math.max(0,i - 1); ii <= Math.min(i + 1,matrix.length-1) ; ii++) {
          for (var jj = Math.max(0,j - 1); jj <= Math.min(j + 1,matrix[0].length-1); jj++) {
            if (matrix[ii][jj] && (i!=ii || jj!=j)) {
              v++;
            }
          }
        }
        row.push(v);
      }
      sol.push(row);
    }
    return sol;

  }


    $(document).ready(function () {
      let fiddle = document.getElementById('fiddleHook');
      fiddle.innerHTML = '<pre>minesweeper = ' + app.minesweeper.toString() + '</pre>' +
        '<hr>' +
        '<h4>Test 1: minesweeper([[true,false,false],[false,true,false],[false,false,false]]):</h4>' +
        '<pre>' + JSON.stringify(app.minesweeper([[true,false,false],[false,true,false],[false,false,false]]) +'</pre>' +
        '<hr>' +

        '<h4>Test 2: minesweeper([[false,false,false],[false,false,false]]):</h4>' +
        '<pre>' + JSON.stringify(app.minesweeper([[false,false,false],[false,false,false]]) +'</pre>';
    });

})(window.app = window.app || {}, jQuery)
