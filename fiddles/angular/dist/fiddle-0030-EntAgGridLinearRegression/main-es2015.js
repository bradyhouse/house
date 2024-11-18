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

module.exports = "<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        Enterprise AgGrid Chart ~ Linear Regression\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"https://github.com/bradyhouse/house/tree/master/fiddles/angular2-cli/fiddle-0030-EntAgGridLinearRegression\">\n          Fork Me On Github\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n<div class=\"chart-wrapper-body\" [id]=\"fiddle\"  [ngStyle]=\"{'height': this._chartHeight + 'px'}\"></div>\n"

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
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_cartesianChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/chart/cartesianChart */ "./node_modules/ag-grid-enterprise/dist/lib/charts/chart/cartesianChart.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_cartesianChart__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_chart_cartesianChart__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_axis_NumberAxis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/chart/axis/NumberAxis */ "./node_modules/ag-grid-enterprise/dist/lib/charts/chart/axis/NumberAxis.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_axis_NumberAxis__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_chart_axis_NumberAxis__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_series_lineSeries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/chart/series/lineSeries */ "./node_modules/ag-grid-enterprise/dist/lib/charts/chart/series/lineSeries.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_series_lineSeries__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_chart_series_lineSeries__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_caption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/caption */ "./node_modules/ag-grid-enterprise/dist/lib/charts/caption.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_caption__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_caption__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_util_padding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/util/padding */ "./node_modules/ag-grid-enterprise/dist/lib/charts/util/padding.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_util_padding__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_util_padding__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_palettes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/chart/palettes */ "./node_modules/ag-grid-enterprise/dist/lib/charts/chart/palettes.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_chart_palettes__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_chart_palettes__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_util_stat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ag-grid-enterprise/dist/lib/charts/util/stat */ "./node_modules/ag-grid-enterprise/dist/lib/charts/util/stat.js");
/* harmony import */ var ag_grid_enterprise_dist_lib_charts_util_stat__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise_dist_lib_charts_util_stat__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");










let AppComponent = class AppComponent {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
    //#region OnInit Implementation
    ngOnInit() {
        this._containerEl = this._elementRef.nativeElement.querySelector('.chart-wrapper-body');
        this._chartHeight = Math.floor(.90 * window.innerHeight);
        d3__WEBPACK_IMPORTED_MODULE_9__["csv"]("./assets/data.csv").then((rawData) => {
            const data = rawData.map(datum => ({
                x: +new Date(datum.Date || 0),
                y: +(datum['Adj Close'] || 0)
            }));
            this._createNumericLineChart(data);
        });
    }
    //#endregion
    _createNumericLineChart(data) {
        const chart = new ag_grid_enterprise_dist_lib_charts_chart_cartesianChart__WEBPACK_IMPORTED_MODULE_2__["CartesianChart"]({
            xAxis: new ag_grid_enterprise_dist_lib_charts_chart_axis_NumberAxis__WEBPACK_IMPORTED_MODULE_3__["NumberAxis"](),
            yAxis: new ag_grid_enterprise_dist_lib_charts_chart_axis_NumberAxis__WEBPACK_IMPORTED_MODULE_3__["NumberAxis"]()
        });
        chart.xAxis.labelRotation = 45;
        chart.xAxis.labelFormatter = (params) => {
            return new Date(params.value).toDateString();
        };
        chart.parent = this._containerEl;
        chart.width = window.innerWidth;
        chart.height = this._chartHeight;
        chart.padding = new ag_grid_enterprise_dist_lib_charts_util_padding__WEBPACK_IMPORTED_MODULE_6__["Padding"](20, 80, 20, 20);
        chart.title = ag_grid_enterprise_dist_lib_charts_caption__WEBPACK_IMPORTED_MODULE_5__["Caption"].create({
            text: 'S&P 500 weekly data (1950 to present)'
        });
        chart.legend.enabled = false;
        const lineSeries = new ag_grid_enterprise_dist_lib_charts_chart_series_lineSeries__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]();
        lineSeries.title = 'Price Data';
        lineSeries.marker = true;
        lineSeries.strokeWidth = 0;
        lineSeries.markerSize = 2;
        lineSeries.markerStrokeWidth = 0;
        lineSeries.data = data;
        lineSeries.xField = 'x';
        lineSeries.yField = 'y';
        chart.addSeries(lineSeries);
        this._containerEl.appendChild(document.createElement('br'));
        const X = [];
        const Y = [];
        data.forEach(datum => {
            X.push(datum.x);
            Y.push(datum.y);
        });
        const fit = Object(ag_grid_enterprise_dist_lib_charts_util_stat__WEBPACK_IMPORTED_MODULE_8__["linearRegression"])(X, Y);
        if (fit) {
            const { slope, intercept } = fit;
            const firstX = data[0].x;
            const lastX = data[data.length - 1].x;
            const firstY = slope * firstX + intercept;
            const lastY = slope * lastX + intercept;
            const slopeSeries = new ag_grid_enterprise_dist_lib_charts_chart_series_lineSeries__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]();
            slopeSeries.title = 'Linear Regression';
            slopeSeries.fill = ag_grid_enterprise_dist_lib_charts_chart_palettes__WEBPACK_IMPORTED_MODULE_7___default.a.fills[2];
            slopeSeries.stroke = ag_grid_enterprise_dist_lib_charts_chart_palettes__WEBPACK_IMPORTED_MODULE_7___default.a.strokes[2];
            slopeSeries.marker = false;
            slopeSeries.strokeWidth = 2;
            slopeSeries.data = [{ x: firstX, y: firstY }, { x: lastX, y: lastY }];
            slopeSeries.xField = 'x';
            slopeSeries.yField = 'y';
            chart.addSeries(slopeSeries);
        }
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
], AppComponent);



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

module.exports = __webpack_require__(/*! /Users/bradyhouse/github/house_324/fiddles/angular2-cli/fiddle-0030-EntAgGridLinearRegression/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map