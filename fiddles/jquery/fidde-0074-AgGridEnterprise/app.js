(function (app, $, undefined) {
    "use strict";

    app.view = app.view || {
        render: function (hook) {
          let columnDefs = [
                {headerName: "Make", field: "make"},
                {headerName: "Model", field: "model"},
                {headerName: "Price", field: "price"}
              ],
            rowData = [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
              ],
            gridOptions = {
                columnDefs: columnDefs
              };

          new agGrid.Grid(hook, gridOptions);

          fetch('https://api.myjson.com/bins/15psn9').then(function(response) {
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
      //agGrid.LicenseManager.setLicenseKey('Evaluation_License-_Not_For_Production_Valid_Until_25_April_2019__MTU1NjE0NjgwMDAwMA==5095db85700c871b2d29d9537cd451b3');
      app.view.init();
    });
})(window.app = window.app || {}, jQuery);
