var app = app || {

    sudoku: function(grid) {
      var corners = [[0,0], [0,3], [0,6],
                     [3,0], [3,3], [3,6],
                     [6,0], [6,3], [6,6]],
          isNine = (values) => {
            return values.sort().toString() === '1,2,3,4,5,6,7,8,9' ? true : false;
          },
          parseCol = (colid, grid) => {
            var values = [],
                r = 0;

            while(r < grid.length) {
              var row = Object.assign([],grid[r]),
                  val = row[colid];
              values.push(val);
              r+=1;
            }
            return values;
          },
          parseRow = (row, grid) => {
            return Object.assign([],grid[row]);
          },
          parseSubGrid = (row, col, grid) => {
            var subgrid = [],
              r = row,
              c = col;

            while(r < row+3) {
              while(c < col+3) {
                subgrid.push(grid[r][c]);
                c++;
              }
              c = col;
              r++;

            }
            return subgrid;
          },
          rc = true,
          r = 0,
          c = 0;

      while(r < 9 && rc) {
        var row = parseRow(r, grid);
        rc = isNine(row);
        r+=1;
      }

      while (c < 9 && rc) {
        var col = parseCol(c, grid);
        rc = isNine(col);
        c+=1;
      }

      while(corners.length > 0 && rc) {
        var corner = corners.pop(),
          subgrid = parseSubGrid(corner[0], corner[1], grid);
          rc = isNine(subgrid);
      }

      return rc;
    }
  };

$(document).ready(function () {
  let fiddle = document.getElementById('fiddleHook');
  if (fiddle) {
    fiddle.innerHTML = '<pre>spiralNumbers = ' + app.sudoku.toString() + '</pre>';
  }
});
