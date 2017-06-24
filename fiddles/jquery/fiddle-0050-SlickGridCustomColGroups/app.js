(function (app, $, undefined) {
  "use strict";


  $(document).ready(function () {


    var columns = [
      {id: 'id', name: 'id', field: 'id'},
      {
        id: 'col1', name: 'col 1', children: [
        {id: 'col1-1', name: 'col 1-1', field: 'col1-1'},
        {id: 'col1-2', name: 'col 1-2', field: 'col1-2'}
      ]
      },
      {id: 'id2', name: 'id2', field: 'id2'},
      {
        id: 'col2', name: 'col 2', children: [
        {id: 'col2-1', name: 'col 2-1', field: 'col2-1'},
        {
          id: 'col2-2', name: 'col 2-2', children: [
          {id: 'col2-2-1', name: 'col 2-2-1', field: 'col2-2-1'},
          {id: 'col2-2-2', name: 'col 2-2-2', field: 'col2-2-2'}
        ]
        }
      ]
      }
    ];

    var options = {
      enableCellNavigation: true,
      enableColumnReorder: false,
      forceFitColumns: false
    };

    var data = [];
    for (var i = 0; i < 500; i++) {
      data[i] = {
        'id': i,
        'col1-1': 'Task ' + i,
        'col1-2': '5 days',
        'id2': i,
        'col2-1': Math.round(Math.random() * 100),
        'col2-2-1': '01/01/2009',
        'col2-2-2': '01/05/2009'
      };
    }

    try {
      var grid = new Slick.Grid('#myGrid', data, columns, options);
      grid.registerPlugin(new Slick.Plugins.ColGroup());
    } catch (e) {
      document.getElementById('myGrid').innerHTML = e;
    }



  });
})(window.app = window.app || {}, jQuery)
