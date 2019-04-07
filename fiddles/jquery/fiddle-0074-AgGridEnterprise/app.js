(function (app, $, undefined) {
    "use strict";

    app.view = app.view || {
        render: function (hook) {
          const columnDefs = [
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

          this.stretch();

          new agGrid.Grid(hook, gridOptions);

          fetch('data.json').then(function(response) {
            return response.json();
          }).then(function(data) {
            console.dir(data);
            gridOptions.api.setRowData(data);
          });
        },
        init: function () {
          this.render(document.getElementById('grid'));
        },
        measure: function (elementId) {
          const element = document.getElementById(elementId),
          positionInfo = element.getBoundingClientRect();

          return positionInfo ? positionInfo.height : 0;
        },
        stretch: function () {
          const grid = document.getElementById('grid'),
            width = window.innerWidth,
            height = window.innerHeight - this.measure('header');
          grid.setAttribute('style', 'width: ' + width + 'px; height: ' + height + 'px;');
        }
    };

    $(document).ready(function () {
      window.addEventListener('resize', () => {
        app.view.stretch();
      });
      fetch('license.json').then(function(response) {
        return response.json();
      }).then(function(data) {
        agGrid.LicenseManager.setLicenseKey(data.license);
        app.view.init();
      });
    });
})(window.app = window.app || {}, jQuery);
