(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        Enterprise AgGrid Chart\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"http://github/bradyhouse/house/fiddles/angular2-cli/fiddle-0027-EntAgGridChart\">\n          Fork Me On Github\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<div class=\"outer-div\" (window:resize)=\"onResize($event)\">\n  <nav id=\"btnBar\" class=\"btn-group btn-group-toggle\"  data-toggle=\"buttons\">\n    <button id=\"btnChartGroupedBar\" class=\"btn-sm btn-outline-success\" (click)=\"chartGroupedBar()\">Grouped Bar</button>\n    <button id=\"btnChartStackedBar\" class=\"btn-sm btn-outline-danger\" (click)=\"chartStackedBar()\">Stacked Bar</button>\n    <button id=\"btnChartNormalizedBar\" class=\"btn-sm btn-outline-info\" (click)=\"chartNormalizedBar()\">Normalized Bar</button>\n    <button id=\"btnChartGroupedColumn\" class=\"btn-sm btn-outline-warning\" (click)=\"chartGroupedColumn()\">Grouped Column</button>\n    <button id=\"btnChartStackedColumn\" class=\"btn-sm btn-outline-primary\" (click)=\"chartStackedColumn()\">Stacked Column</button>\n    <button id=\"btnChartNormalizedColumn\" class=\"btn-sm btn-outline-success\" (click)=\"chartNormalizedColumn()\">Normalized Column</button>\n    <button id=\"btnChartArea\" class=\"btn-sm btn-outline-danger\" (click)=\"chartArea()\">Area</button>\n    <button id=\"btnChartStackedArea\" class=\"btn-sm btn-outline-info\" (click)=\"chartStackedArea()\">Stacked Area</button>\n    <button id=\"btnChartNormalizedArea\" class=\"btn-sm btn-outline-warning\" (click)=\"chartNormalizedArea()\">Normalized Area</button>\n    <button id=\"btnChartLine\" class=\"btn-sm btn-outline-success\" (click)=\"chartLine()\">Line</button>\n    <button id=\"btnChartScatter\" class=\"btn-sm btn-outline-danger\" (click)=\"chartScatter()\">Scatter</button>\n    <button id=\"btnChartPie\" class=\"btn-sm btn-outline-info\" (click)=\"chartPie()\">Pie</button>\n    <button id=\"btnChartDoughnut\" class=\"btn-sm btn-outline-warning\" (click)=\"chartDoughnut()\">Doughnut</button>\n  </nav>\n  <ag-grid-angular\n    #agGrid\n    style=\"width: calc(100%); height: calc(100%);\"\n    id=\"myGrid\"\n    class=\"ag-theme-fresh\"\n    [columnDefs]=\"columnDefs\"\n    [defaultColDef]=\"defaultColDef\"\n    [popupParent]=\"popupParent\"\n    [rowData]=\"rowData\"\n    [enableRangeSelection]=\"true\"\n    [enableCharts]=\"true\"\n    (rangeSelectionChanged)=\"onRangeSelectionChanged($event)\"\n    [processChartOptions]=\"processChartOptions\"\n    (gridReady)=\"onGridReady($event)\"\n  ></ag-grid-angular>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".my-tool-tip-class {\n  border: 4px solid black;\n}\n\nspan.ag-icon.ag-icon-cross {\n  display: none !important;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5teS10b29sLXRpcC1jbGFzcyB7XG4gIGJvcmRlcjogNHB4IHNvbGlkIGJsYWNrO1xufVxuXG5zcGFuLmFnLWljb24uYWctaWNvbi1jcm9zcyB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ag-grid-enterprise */ "./node_modules/ag-grid-enterprise/main.js");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ag_grid_enterprise_chartsModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ag-grid-enterprise/chartsModule */ "./node_modules/ag-grid-enterprise/chartsModule.js");
/* harmony import */ var ag_grid_enterprise_chartsModule__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_chartsModule__WEBPACK_IMPORTED_MODULE_3__);




let AppComponent = class AppComponent {
    constructor() {
        this.columnDefs = [
            {
                field: "country",
                width: 150,
                chartDataType: "category"
            },
            {
                field: "gold",
                chartDataType: "series"
            },
            {
                field: "silver",
                chartDataType: "series"
            },
            {
                field: "bronze",
                chartDataType: "series"
            },
            {
                headerName: "A",
                valueGetter: "Math.floor(Math.random()*1000)",
                chartDataType: "series"
            },
            {
                headerName: "B",
                valueGetter: "Math.floor(Math.random()*1000)",
                chartDataType: "series"
            },
            {
                headerName: "C",
                valueGetter: "Math.floor(Math.random()*1000)",
                chartDataType: "series"
            },
            {
                headerName: "D",
                valueGetter: "Math.floor(Math.random()*1000)",
                chartDataType: "series"
            }
        ];
        this.defaultColDef = {
            width: 100,
            resizable: true
        };
        this.popupParent = document.body;
        this.rowData = createRowData();
    }
    onRangeSelectionChanged($event) {
        this.captureCellRange();
    }
    chartGroupedBar() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "groupedBar"
        };
        this.displayChart(chartRangeParams, 'btnChartGroupedBar');
    }
    chartStackedBar() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "stackedBar"
        };
        this.displayChart(chartRangeParams, 'btnChartStackedBar');
    }
    chartNormalizedBar() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "normalizedBar"
        };
        this.displayChart(chartRangeParams, 'btnChartNormalizedBar');
    }
    chartGroupedColumn() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "groupedColumn"
        };
        this.displayChart(chartRangeParams, 'btnChartGroupedColumn');
    }
    chartStackedColumn() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "stackedColumn"
        };
        this.displayChart(chartRangeParams, 'btnChartStackedColumn');
    }
    chartNormalizedColumn() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "normalizedColumn"
        };
        this.displayChart(chartRangeParams, 'btnChartNormalizedColumn');
    }
    chartArea() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "area"
        };
        this.displayChart(chartRangeParams, 'btnChartArea');
    }
    chartStackedArea() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "stackedArea"
        };
        this.displayChart(chartRangeParams, 'btnChartStackedArea');
    }
    chartNormalizedArea() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "normalizedArea"
        };
        this.displayChart(chartRangeParams, 'btnChartNormalizedArea');
    }
    chartDoughnut() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "doughnut"
        };
        this.displayChart(chartRangeParams, 'btnChartDoughnut');
    }
    chartLine() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "line"
        };
        this.displayChart(chartRangeParams, 'btnChartLine');
    }
    chartScatter() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "scatter"
        };
        this.displayChart(chartRangeParams, 'btnChartScatter');
    }
    chartPie() {
        const chartRangeParams = {
            cellRange: this.cellRange,
            chartType: "pie"
        };
        this.displayChart(chartRangeParams, 'btnChartPie');
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.captureCellRange();
        this.stretchGrid(window.innerWidth, window.innerHeight);
    }
    processChartOptions(params) {
        var options = params.options;
        options.width = 500;
        options.height = 500;
        switch (params.type) {
            case "groupedBar":
                options.legendPosition = "bottom";
                break;
            case "stackedBar":
                options.legendPosition = "bottom";
                break;
            case "normalizedBar":
                options.legendPosition = "bottom";
                break;
            case "groupedColumn":
                options.legendPosition = "right";
                break;
            case "stackedColumn":
                options.legendPosition = "right";
                break;
            case "normalizedColumn":
                options.legendPosition = "right";
                break;
            case "area":
                options.legendPosition = "bottom";
                break;
            case "stackedArea":
                options.legendPosition = "bottom";
                break;
            case "normalizedArea":
                options.legendPosition = "bottom";
                break;
            case "pie":
                options.legendPosition = "top";
                break;
            case "doughnut":
                options.legendPosition = "right";
                break;
            case "line":
                options.legendPosition = "left";
                break;
        }
        return options;
    }
    onResize(event) {
        this.stretchGrid(event.target.innerWidth, event.target.innerHeight);
    }
    captureCellRange() {
        const _ranges = this.gridApi.getCellRanges();
        let _columns = [];
        let _rowStartIndex;
        let _rowEndIndex;
        if (_ranges.length === 1 && _ranges[0].columns[0].colId === 'country') {
            _rowStartIndex = _ranges[0].startRow.rowIndex;
            _rowEndIndex = _ranges[0].endRow.rowIndex;
            _ranges[0].columns.forEach((column) => {
                _columns.push(column.colId);
            });
            this.cellRange = {
                rowStartIndex: _rowStartIndex,
                rowEndIndex: _rowEndIndex,
                columns: _columns
            };
        }
        else {
            this.cellRange = {
                rowStartIndex: 0,
                rowEndIndex: 4,
                columns: ["country", "gold", "silver", "bronze"]
            };
        }
    }
    updateBtnBar(id = null) {
        let btnsDiv = document.getElementById('btnBar');
        let btns = btnsDiv.querySelectorAll('button');
        let activeBtn = id ? document.getElementById(id) : null;
        let activeBtnCls = activeBtn ? activeBtn.getAttribute('class') : null;
        if (btns) {
            btns.forEach((btn) => {
                let cls = btn.getAttribute('class');
                if (cls) {
                    cls = cls.replace(' active', '');
                    btn.setAttribute('class', cls);
                }
            });
        }
        if (activeBtn) {
            activeBtn.setAttribute('class', activeBtnCls + ' active');
        }
    }
    displayChart(chartRangeParams, btnId) {
        if (this.chartRef) {
            this.chartRef.destroyChart();
            this.updateBtnBar();
        }
        this.updateBtnBar(btnId);
        this.chartRef = this.gridApi.chartRange(chartRangeParams);
        this.attachCloseHandler();
    }
    attachCloseHandler() {
        let closeBtn = this.chartRef.chartElement.querySelector('.chart-wrapper-close');
        console.debug(closeBtn);
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.chartRef.destroyChart();
                this.updateBtnBar();
            });
        }
    }
    stretchGrid(width, height) {
        this.style = {
            width: width + 'px',
            height: (height - 70) + 'px'
        };
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);

function createRowData() {
    let countries = [
        "Ireland",
        "Spain",
        "United Kingdom",
        "France",
        "Germany",
        "Luxembourg",
        "Sweden",
        "Norway",
        "Italy",
        "Greece",
        "Iceland",
        "Portugal",
        "Malta",
        "Brazil",
        "Argentina",
        "Colombia",
        "Peru",
        "Venezuela",
        "Uruguay",
        "Belgium"
    ];
    let rowData = [];
    countries.forEach(function (country, index) {
        rowData.push({
            country: country,
            gold: Math.floor(((index + 1 / 7) * 333) % 100),
            silver: Math.floor(((index + 1 / 3) * 555) % 100),
            bronze: Math.floor(((index + 1 / 7.3) * 777) % 100)
        });
    });
    return rowData;
}


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ag-grid-angular */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");



 // <-- NgModel lives here



let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            ag_grid_angular__WEBPACK_IMPORTED_MODULE_5__["AgGridModule"].withComponents([])
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ag-grid-enterprise */ "./node_modules/ag-grid-enterprise/main.js");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__);





fetch('assets/license.json').then((response) => {
    return response.json();
}).then((data) => {
    ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__["LicenseManager"].setLicenseKey(data.license);
    if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(err => console.error(err));
});


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/bradyhouse/github/house_313/fiddles/angular2-cli/fiddle-0027-EntAgGridChart/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map