(function (app, $, undefined) {
    "use strict";

    app.view = app.view || {
        render: function (hook) {
          let columnDefs = [
                {headerName: "Make", field: "make", rowGroup: true},
                {headerName: "Model", field: "model"},
                {headerName: "Price", field: "price"}
              ],
            autoGroupColumnDef = {
              headerName: "Model",
              field: "model",
              cellRenderer:'agGroupCellRenderer',
              cellRendererParams: {
                checkbox: true
              }
            },
            gridOptions = {
                columnDefs: columnDefs,
                autoGroupColumnDef: autoGroupColumnDef,
                groupSelectsChildren: true,
                rowSelection: 'multiple'
              };

          new agGrid.Grid(hook, gridOptions);

          fetch('data.json').then(function(response) {
            return response.json();
          }).then(function(data) {
            gridOptions.api.setRowData(data);
          });
        },
        init: function () {
            var hook = document.getElementById('myGrid');
            this.render(hook);
        }
    };
    $(document).ready(function () {
      fetch('license.json').then(function(response) {
        return response.json();
      }).then(function(data) {
        agGrid.LicenseManager.setLicenseKey(data.license);
        app.view.init();
      });


    });
})(window.app = window.app || {}, jQuery);
