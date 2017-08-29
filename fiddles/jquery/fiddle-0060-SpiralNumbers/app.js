var app = app || {

  spiralNumbers: function(n)  {

    var Row = (cells) => {
        var row = [],
          i = 0;
        while (i < cells) {
          row.push(0);
          i++;
        }
        return row;
      },
      Table = (n) => {
        var rows = [],
          i = 0;
        while(i < n) {
          rows.push(Row(n));
          i++;
        }
        return rows;
      },
      left = (spreadsheet, val, r, c, cMax, max) => {
        while(val <= max && c < cMax) {
          if (spreadsheet.table[r][c] === 0) {
            spreadsheet.value = spreadsheet.table[r][c] = spreadsheet.value+1;
          }
          c++;
          val++;
        }
        return spreadsheet;
      },
      down = (spreadsheet, val, r, c, rMax, max) => {
        while(val <= max && r < rMax) {
          if (spreadsheet.table[r][c] === 0) {
            spreadsheet.value = spreadsheet.table[r][c] = spreadsheet.value +1;
          }
          r++;
          val++;
        }
        return spreadsheet;
      },
      right = (spreadsheet, val, r, c, cMin, max) => {
        while(val <= max && c >= cMin) {
          if (spreadsheet.table[r][c] === 0) {
            spreadsheet.value = spreadsheet.table[r][c] = spreadsheet.value +1;
          }
          c--;
          val++;
        }
        return spreadsheet;
      },

      up = (spreadsheet, val, r, c, rMin, max) => {
        while(val <= max && r > rMin) {
          if (spreadsheet.table[r][c] === 0) {
            spreadsheet.value = spreadsheet.table[r][c] = spreadsheet.value +1;
          }
          r--;
          val++;
        }
        return spreadsheet;
      },
      spiral = (spreadsheet) => {
        spreadsheet = left(spreadsheet, spreadsheet.value, spreadsheet.row, spreadsheet.col, spreadsheet.dim, spreadsheet.maxValue);
        if (spreadsheet.isFull()) {
          return spreadsheet;
        }
        spreadsheet = down(spreadsheet, spreadsheet.value, spreadsheet.row, spreadsheet.dim-1, spreadsheet.dim, spreadsheet.maxValue);
        if (spreadsheet.isFull()) {
          return spreadsheet;
        }

        spreadsheet = right(spreadsheet, spreadsheet.value, spreadsheet.dim-1, spreadsheet.dim-1, spreadsheet.col,  spreadsheet.maxValue);
        if (spreadsheet.isFull()) {
          return spreadsheet;
        }
        spreadsheet = up(spreadsheet, spreadsheet.value,spreadsheet.dim-1,spreadsheet.col,spreadsheet.row,spreadsheet.maxValue);
        if (spreadsheet.isFull()) {
          return spreadsheet;
        }
        spreadsheet.row = spreadsheet.row + 1;
        spreadsheet.col = spreadsheet.col + 1;
        spreadsheet.dim = spreadsheet.dim - 1;

        return spreadsheet;
      },
      spreadsheet = {
        table: Table(n),
        value: 0,
        row: 0,
        col: 0,
        dim: n,
        maxValue: n * n,
        isFull: () => {
          return this.value + 1 > this.maxValue ? true : false;
        }
      };

    while(spreadsheet.value < spreadsheet.maxValue) {
      spreadsheet = spiral(spreadsheet);
    }

    console.log(JSON.stringify(spreadsheet.table));

    return spreadsheet.table;

  }

  };

$(document).ready(function () {
  let fiddle = document.getElementById('fiddleHook');
  if (fiddle) {
    fiddle.innerHTML = '<pre>spiralNumbers = ' + app.spiralNumbers.toString() + '</pre>';
  }
});

