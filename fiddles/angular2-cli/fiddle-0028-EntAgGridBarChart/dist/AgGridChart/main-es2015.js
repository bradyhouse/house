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

module.exports = "<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        Enterprise AgGrid ~ Bar Chart Control\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"http://github/bradyhouse/house/fiddles/angular2-cli/fiddle-0028-EntAgGridBarChart\">\n          Fork Me On Github\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<app-bar-chart [options]=\"barChartOptions\">\n</app-bar-chart>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/bar-chart/bar-chart.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"chart-container outer-div\" [id]=\"_id\">\n  <ag-grid-angular\n    #agGrid\n    style=\"width: 100%; height: 100%; display: none;\"\n    id=\"myGrid\"\n    class=\"ag-theme-balham\"\n    [columnDefs]=\"_columnDefs\"\n    [rowData]=\"_rowData\"\n    [enableCharts]=\"true\"\n    [processChartOptions]=\"onProcessChartOptions\"\n    [createChartContainer]=\"this._onCreateChartContainer\"\n    (gridReady)=\"onGridReady($event)\"\n  ></ag-grid-angular>\n</div>\n\n"

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


let AppComponent = class AppComponent {
    constructor() {
        this.barChartOptions = {
            id: 'fiddle',
            columns: [
                {
                    field: "country",
                    width: 150,
                    chartDataType: "category"
                },
                {
                    field: "gold",
                    chartDataType: "series"
                },
                /*{
                  field: "silver",
                  chartDataType: "series"
                },
                {
                  field: "bronze",
                  chartDataType: "series"
                },*/
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
            ],
            rows: createRowData()
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
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _bar_chart_bar_chart_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bar-chart/bar-chart.module */ "./src/app/bar-chart/bar-chart.module.ts");



 // <-- NgModel lives here



let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _bar_chart_bar_chart_module__WEBPACK_IMPORTED_MODULE_6__["BarChartModule"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/bar-chart/bar-chart-options.ts":
/*!************************************************!*\
  !*** ./src/app/bar-chart/bar-chart-options.ts ***!
  \************************************************/
/*! exports provided: BarChartOptionKeysEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarChartOptionKeysEnum", function() { return BarChartOptionKeysEnum; });
//#region Grid Option Keys
/**
 * Enumeration of all options exposed and supported by the grid.
 */
class BarChartOptionKeysEnum {
}
BarChartOptionKeysEnum.id = 'id';
BarChartOptionKeysEnum.columns = 'columns';
BarChartOptionKeysEnum.rows = 'rows';
//#endregion


/***/ }),

/***/ "./src/app/bar-chart/bar-chart.component.css":
/*!***************************************************!*\
  !*** ./src/app/bar-chart/bar-chart.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".outer-div {\n  height:calc(90%);\n  width: calc(100%);\n  display: flex;\n  flex-direction: column;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYmFyLWNoYXJ0L2Jhci1jaGFydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCIiwiZmlsZSI6InNyYy9hcHAvYmFyLWNoYXJ0L2Jhci1jaGFydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm91dGVyLWRpdiB7XG4gIGhlaWdodDpjYWxjKDkwJSk7XG4gIHdpZHRoOiBjYWxjKDEwMCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/bar-chart/bar-chart.component.ts":
/*!**************************************************!*\
  !*** ./src/app/bar-chart/bar-chart.component.ts ***!
  \**************************************************/
/*! exports provided: BarChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarChartComponent", function() { return BarChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ag_grid_community__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ag-grid-community */ "./node_modules/ag-grid-community/main.js");
/* harmony import */ var ag_grid_community__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ag_grid_community__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bar_chart_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bar-chart-options */ "./src/app/bar-chart/bar-chart-options.ts");
/* harmony import */ var ag_grid_enterprise_chartsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ag-grid-enterprise/chartsModule */ "./node_modules/ag-grid-enterprise/chartsModule.js");
/* harmony import */ var ag_grid_enterprise_chartsModule__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_chartsModule__WEBPACK_IMPORTED_MODULE_4__);





let BarChartComponent = class BarChartComponent {
    //#endregion
    //#region Constructor
    constructor(_differs, _elementRef) {
        this._differs = _differs;
        this._elementRef = _elementRef;
        this._columnDefs = [];
        this._rowData = [];
        this._onCreateChartContainer = (chartRef) => this.onCreateChartContainer(chartRef);
    }
    get _fields() {
        let values = [];
        if (this._columnDefs) {
            this._columnDefs.forEach((colDef) => {
                if (colDef.field) {
                    values.push(colDef.field);
                }
            });
        }
        return values;
    }
    get _cellRange() {
        return {
            rowStartIndex: 0,
            rowEndIndex: this._rowData.length - 1,
            columns: this._fields
        };
    }
    get _isPopulated() {
        return !!(this._rowData && this._rowData.length && this._columnDefs && this._columnDefs.length);
    }
    get _chartRangeParams() {
        if (this._isPopulated) {
            return {
                cellRange: this._cellRange,
                chartType: ag_grid_community__WEBPACK_IMPORTED_MODULE_2__["ChartType"].GroupedColumn
            };
        }
        else {
            return null;
        }
    }
    //#endregion
    //#region OnChanges Implementation
    ngOnChanges(changes) {
        if ('options' in changes) {
            const value = changes['options'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create();
            }
        }
    }
    //#endregion
    //#region DoCheck Implementation
    ngDoCheck() {
        if (this._differ) {
            const changes = this._differ.diff(this.options);
            if (changes) {
                changes.forEachChangedItem((item) => {
                    this._applyChange(item);
                });
                changes.forEachAddedItem((item) => {
                    this._applyChange(item);
                });
            }
        }
    }
    //#endregion
    //#region OnInit Implementation
    ngOnInit() {
        this._containerEl = this._elementRef.nativeElement.querySelector('.chart-container');
    }
    //#endregion
    //#region Event Handlers
    onGridReady(params) {
        if (this._id && this._isPopulated && this._containerEl) {
            setTimeout(() => {
                params.api.chartRange(this._chartRangeParams);
            }, 500);
        }
    }
    onProcessChartOptions(params) {
        var options = params.options;
        console.log(options);
        options.height = 500;
        options.width = 1000;
        options.title = {
            text: "Precious Metals Production",
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 18,
            fontFamily: "Arial, sans-serif",
            color: "#414182"
        };
        options.subtitle = {
            text: "by country",
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            color: "rgb(100, 100, 100)"
        };
        options.padding = {
            top: 20,
            right: 10,
            bottom: 10,
            left: 20
        };
        options.tooltipClass = "my-tool-tip-class";
        options.legendPosition = "bottom";
        options.legendPadding = 20;
        options.legend = {
            enabled: false
        };
        var xAxis = options.xAxis;
        xAxis.lineWidth = 2;
        xAxis.lineColor = "gray";
        xAxis.tickWidth = 2;
        xAxis.tickSize = 10;
        xAxis.tickPadding = 10;
        xAxis.tickColor = "gray";
        xAxis.labelFontStyle = "italic";
        xAxis.labelFontWeight = "bold";
        xAxis.labelFontSize = 15;
        xAxis.labelFontFamily = "Arial, sans-serif";
        xAxis.labelColor = "#de7b73";
        xAxis.labelRotation = 20;
        xAxis.labelFormatter = function (params) {
            return params.value === "United Kingdom" ? "UK" : "(" + String(params.value) + ")";
        };
        xAxis.gridStyle = [{ stroke: "rgba(94,100,178,0.5)" }];
        var yAxis = options.yAxis;
        yAxis.lineWidth = 2;
        yAxis.lineColor = "gray";
        yAxis.tickWidth = 2;
        yAxis.tickSize = 10;
        yAxis.tickPadding = 10;
        yAxis.tickColor = "gray";
        yAxis.labelFontStyle = "italic";
        yAxis.labelFontWeight = "bold";
        yAxis.labelFontSize = 15;
        yAxis.labelFontFamily = "Arial, sans-serif";
        yAxis.labelColor = "#de7b73";
        yAxis.labelRotation = 20;
        yAxis.labelFormatter = function (params) {
            return params.value.toString().toUpperCase();
        };
        yAxis.gridStyle = [
            {
                stroke: "#80808044",
                lineDash: undefined
            },
            {
                stroke: "#80808044",
                lineDash: [6, 3]
            }
        ];
        var seriesDefaults = options.seriesDefaults;
        seriesDefaults.fills = ["#e1ba00", "silver", "peru"];
        seriesDefaults.strokes = ["black"];
        seriesDefaults.fillOpacity = 0.8;
        seriesDefaults.strokeOpacity = 0.8;
        seriesDefaults.strokeWidth = 2;
        seriesDefaults.highlightStyle = {
            fill: "red",
            stroke: "maroon"
        };
        seriesDefaults.labelEnabled = true;
        seriesDefaults.labelFontStyle = "italic";
        seriesDefaults.labelFontWeight = "bold";
        seriesDefaults.labelFontSize = 15;
        seriesDefaults.labelFontFamily = "Arial, sans-serif";
        seriesDefaults.labelPadding = {
            x: 10,
            y: 10
        };
        seriesDefaults.labelColor = "green";
        seriesDefaults.shadow = {
            color: "rgba(0, 0, 0, 0.3)",
            offset: [5, 5],
            blur: 8
        };
        seriesDefaults.tooltipRenderer = function (params) {
            var xField = params.xField;
            var yField = params.yField;
            var x = params.datum[xField];
            var y = params.datum[yField];
            return "<b>" + xField.toUpperCase() + ":</b> " + x + "<br/><b>" + yField.toUpperCase() + ":</b> " + y;
        };
        return options;
    }
    onCreateChartContainer(chartRef) {
        if (this._containerEl) {
            this._containerEl.appendChild(chartRef.chartElement);
        }
    }
    //#endregion
    //#region Internal Methods
    _applyChange(item) {
        switch (item.key) {
            case _bar_chart_options__WEBPACK_IMPORTED_MODULE_3__["BarChartOptionKeysEnum"].id:
                this._id = this.options.id;
                break;
            case _bar_chart_options__WEBPACK_IMPORTED_MODULE_3__["BarChartOptionKeysEnum"].columns:
                this._columnDefs = this.options.columns;
                break;
            case _bar_chart_options__WEBPACK_IMPORTED_MODULE_3__["BarChartOptionKeysEnum"].rows:
                this._rowData = this.options.rows;
                break;
        }
    }
};
BarChartComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], BarChartComponent.prototype, "options", void 0);
BarChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-bar-chart',
        template: __webpack_require__(/*! raw-loader!./bar-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.html"),
        styles: [__webpack_require__(/*! ./bar-chart.component.css */ "./src/app/bar-chart/bar-chart.component.css")]
    })
], BarChartComponent);



/***/ }),

/***/ "./src/app/bar-chart/bar-chart.module.ts":
/*!***********************************************!*\
  !*** ./src/app/bar-chart/bar-chart.module.ts ***!
  \***********************************************/
/*! exports provided: BarChartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarChartModule", function() { return BarChartModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _bar_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bar-chart.component */ "./src/app/bar-chart/bar-chart.component.ts");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ag-grid-angular */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular__WEBPACK_IMPORTED_MODULE_4__);





let BarChartModule = class BarChartModule {
};
BarChartModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_bar_chart_component__WEBPACK_IMPORTED_MODULE_3__["BarChartComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            ag_grid_angular__WEBPACK_IMPORTED_MODULE_4__["AgGridModule"].withComponents([]),
        ],
        exports: [_bar_chart_component__WEBPACK_IMPORTED_MODULE_3__["BarChartComponent"]],
        entryComponents: [_bar_chart_component__WEBPACK_IMPORTED_MODULE_3__["BarChartComponent"]]
    })
], BarChartModule);



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

module.exports = __webpack_require__(/*! /Users/bradyhouse/github/house_master/fiddles/angular2-cli/fiddle-0028-EntAgGridBarChart/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map