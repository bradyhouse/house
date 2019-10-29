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

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        ngx-bootstrap ~ kitchen sink\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"https://github.com/bradyhouse/house/tree/master/fiddles/angular2-cli/fiddle-0029-EntAgGridChartSeriesClick\">\n          Fork Me On Github\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n<div class=\"panel\" [ngStyle]=\"{'height': panelHeight + 'px'}\">\n  <div class=\"panel-heading\">\n    <h3 [innerHTML]=\"title\"></h3>\n    <app-panel-menu [options]=\"panelMenuOptions\"></app-panel-menu>\n  </div>\n  <div class=\"panel-body no-padding\">\n    <div class=\"jumbotron\">C o n t e n t</div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/panel-menu/dropdown/dropdown.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/panel-menu/dropdown/dropdown.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<!--<div dropdown #dropdown=\"bs-dropdown\" [autoClose]=\"false\">\n  <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle\">\n    Button dropdown <span class=\"caret\"></span>\n  </button>\n  <ul *dropdownMenu class=\"dropdown-menu pull-right\">\n    <li role=\"menuitem\" *ngFor=\"let option of options\"\n        (click)=\"onOptionClick(option)\">\n      <a id=\"{{option.cssClass}}\">{{option.text}}</a>\n    </li>\n  </ul>\n</div>-->\n\n<!--<span dropdown (onShown)=\"onShown()\" (onHidden)=\"onHidden()\" (isOpenChange)=\"isOpenChange()\">\n    <a href id=\"\" dropdownToggle (click)=\"false\"\n       aria-controls=\"basic-link-dropdown\">Click me for a dropdown, yo!</a>\n    <ul id=\"basic-link-dropdown\" *dropdownMenu class=\"dropdown-menu\"\n        role=\"menu\" aria-labelledby=\"basic-link\">\n      <li *ngFor=\"let choice of items\">\n        <a class=\"dropdown-item\" href=\"#\">{{choice}}</a>\n      </li>\n    </ul>\n  </span>-->\n\n\n<span dropdown>\n    <a href (click)=\"false\" class=\"round\"\n    aria-controls=\"basic-link-dropdown\"\n       dropdownToggle>\n      <i class=\"mdi mdi-dots-vertical\"></i>\n    </a>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"basic-link\">\n      <li *ngFor=\"let option of options\"\n          (click)=\"onOptionClick(option)\">\n        <a class=\"dropdown-item\" href=\"#\" id=\"{{option.cssClass}}\">{{option.text}}</a>\n      </li>\n    </ul>\n  </span>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/panel-menu/panel-menu.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/panel-menu/panel-menu.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul class=\"nav navbar-nav pull-right\">\n    <li *ngIf=\"options?.loader\">\n      <div class=\"circle-loader\"></div>\n    </li>\n    <li *ngIf=\"options?.export\">\n      <a class=\"round\">\n        <i class=\"mdi mdi-file-excel\"\n           [title]=\"options?.export\">\n        </i>\n      </a>\n    </li>\n    <li *ngIf=\"options?.info\">\n      <a class=\"round\">\n        <i class=\"mdi mdi-information-outline\"\n           [title]=\"options?.info\">\n        </i>\n      </a>\n    </li>\n    <li *ngIf=\"!options?.collapse\">\n      <a class=\"round\"\n         (click)=\"onToggle('fullScreen')\">\n        <i class=\"mdi\"\n           [title]=\"options?.fullScreen ? 'Close full screen' : 'Open full screen'\"\n           [ngClass]=\"{\n          'mdi-arrow-expand': !options?.fullScreen,\n          'mdi-arrow-compress': options?.fullScreen}\">\n        </i>\n      </a>\n    </li>\n    <li *ngIf=\"!options?.fullScreen\">\n      <a class=\"round\"\n         (click)=\"onToggle('collapse')\">\n        <i class=\"mdi\"\n           [title]=\"options?.collapse ? 'Hide panel' : 'Show panel'\"\n           [ngClass]=\"{\n         'mdi-chevron-down': options?.collapse,\n         'mdi-chevron-up': !options?.collapse}\">\n        </i>\n      </a>\n    </li>\n    <li class=\"dropdown\"\n        *ngIf=\"options?.dropdown?.length > 0\">\n      <app-panel-menu-dropdown [options]=\"options?.dropdown\"\n                               (events)=\"onEvents($event)\">\n      </app-panel-menu-dropdown>\n    </li>\n    <li *ngIf=\"options?.close\">\n      <a class=\"round\">\n        <i class=\"mdi mdi-close\"\n           (click)=\"onEvents({type:'close'})\">\n        </i>\n      </a>\n    </li>\n  </ul>\n  "

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

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
/* harmony import */ var _panel_menu_panel_menu_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel-menu/panel-menu.options */ "./src/app/panel-menu/panel-menu.options.ts");



let AppComponent = class AppComponent {
    constructor() {
        this.title = 'Title';
        this.panelHeight = Math.floor(.90 * window.innerHeight);
        this.panelMenuOptions = {
            collapse: true,
            fullScreen: true,
            dropdown: [
                _panel_menu_panel_menu_options__WEBPACK_IMPORTED_MODULE_2__["DropdownItemEnum"].Columns,
                _panel_menu_panel_menu_options__WEBPACK_IMPORTED_MODULE_2__["DropdownItemEnum"].Csv,
                _panel_menu_panel_menu_options__WEBPACK_IMPORTED_MODULE_2__["DropdownItemEnum"].Filter,
                _panel_menu_panel_menu_options__WEBPACK_IMPORTED_MODULE_2__["DropdownItemEnum"].Reset
            ]
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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _panel_menu_panel_menu_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./panel-menu/panel-menu.module */ "./src/app/panel-menu/panel-menu.module.ts");





let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _panel_menu_panel_menu_module__WEBPACK_IMPORTED_MODULE_4__["PanelMenuModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/panel-menu/dropdown/dropdown.component.css":
/*!************************************************************!*\
  !*** ./src/app/panel-menu/dropdown/dropdown.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhbmVsLW1lbnUvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/panel-menu/dropdown/dropdown.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/panel-menu/dropdown/dropdown.component.ts ***!
  \***********************************************************/
/*! exports provided: DropdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownComponent", function() { return DropdownComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let DropdownComponent = class DropdownComponent {
    constructor() {
        this.events = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    onOptionClick(option) {
        this.events.emit({
            type: option.id,
            data: option.data
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DropdownComponent.prototype, "options", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], DropdownComponent.prototype, "events", void 0);
DropdownComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-panel-menu-dropdown',
        template: __webpack_require__(/*! raw-loader!./dropdown.component.html */ "./node_modules/raw-loader/index.js!./src/app/panel-menu/dropdown/dropdown.component.html"),
        styles: [__webpack_require__(/*! ./dropdown.component.css */ "./src/app/panel-menu/dropdown/dropdown.component.css")]
    })
], DropdownComponent);



/***/ }),

/***/ "./src/app/panel-menu/panel-menu.component.css":
/*!*****************************************************!*\
  !*** ./src/app/panel-menu/panel-menu.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhbmVsLW1lbnUvcGFuZWwtbWVudS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/panel-menu/panel-menu.component.ts":
/*!****************************************************!*\
  !*** ./src/app/panel-menu/panel-menu.component.ts ***!
  \****************************************************/
/*! exports provided: PanelMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelMenuComponent", function() { return PanelMenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PanelMenuComponent = class PanelMenuComponent {
    constructor() {
        this.events = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    onToggle(type) {
        this.options[type] = !this.options[type];
        this.events.emit({ type, data: this.options[type] });
    }
    onEvents(event) {
        this.events.emit(event);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PanelMenuComponent.prototype, "options", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], PanelMenuComponent.prototype, "events", void 0);
PanelMenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-panel-menu',
        template: __webpack_require__(/*! raw-loader!./panel-menu.component.html */ "./node_modules/raw-loader/index.js!./src/app/panel-menu/panel-menu.component.html"),
        styles: [__webpack_require__(/*! ./panel-menu.component.css */ "./src/app/panel-menu/panel-menu.component.css")]
    })
], PanelMenuComponent);



/***/ }),

/***/ "./src/app/panel-menu/panel-menu.module.ts":
/*!*************************************************!*\
  !*** ./src/app/panel-menu/panel-menu.module.ts ***!
  \*************************************************/
/*! exports provided: PanelMenuModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelMenuModule", function() { return PanelMenuModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _panel_menu_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panel-menu.component */ "./src/app/panel-menu/panel-menu.component.ts");
/* harmony import */ var _dropdown_dropdown_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dropdown/dropdown.component */ "./src/app/panel-menu/dropdown/dropdown.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/fesm2015/ngx-bootstrap-dropdown.js");







let PanelMenuModule = class PanelMenuModule {
};
PanelMenuModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_panel_menu_component__WEBPACK_IMPORTED_MODULE_3__["PanelMenuComponent"], _dropdown_dropdown_component__WEBPACK_IMPORTED_MODULE_4__["DropdownComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_6__["BsDropdownModule"].forRoot()
        ],
        exports: [_panel_menu_component__WEBPACK_IMPORTED_MODULE_3__["PanelMenuComponent"]],
        entryComponents: [_panel_menu_component__WEBPACK_IMPORTED_MODULE_3__["PanelMenuComponent"]]
    })
], PanelMenuModule);



/***/ }),

/***/ "./src/app/panel-menu/panel-menu.options.ts":
/*!**************************************************!*\
  !*** ./src/app/panel-menu/panel-menu.options.ts ***!
  \**************************************************/
/*! exports provided: DropDownItemTypeEnum, DropdownItemEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropDownItemTypeEnum", function() { return DropDownItemTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownItemEnum", function() { return DropdownItemEnum; });
class DropDownItemTypeEnum {
}
/**
 * Reloads the data inside the panel.
 * @type {string}
 */
DropDownItemTypeEnum.Reload = 'reload';
/**
 * Exports the data
 * @type {string}
 */
DropDownItemTypeEnum.Export = 'export';
/**
 * Resets the state
 * @type {string}
 */
DropDownItemTypeEnum.Reset = 'reset';
/**
 * Show available columns.
 * @type {string}
 */
DropDownItemTypeEnum.Columns = 'columns';
/**
 * Enable filtering header.
 * @type {string}
 */
DropDownItemTypeEnum.Filter = 'filter';
/**
 * Enable filtering header.
 * @type {string}
 */
DropDownItemTypeEnum.Unfilter = 'unfilter';
class DropdownItemEnum {
}
/**
 * Reloads the data inside the panel.
 * @type {{id: string, text: string}}
 */
DropdownItemEnum.Reload = {
    id: DropDownItemTypeEnum.Reload,
    text: 'Reload',
    cssClass: 'reload'
};
/**
 * Resets the state
 * @type {{id: string, text: string}}
 */
DropdownItemEnum.Reset = {
    id: DropDownItemTypeEnum.Reset,
    text: 'Reset Grid',
    cssClass: 'reset'
};
/**
 * Show available columns.
 * @type {{id: string, text: string}}
 */
DropdownItemEnum.Columns = {
    id: DropDownItemTypeEnum.Columns,
    text: 'Columns',
    cssClass: 'columns'
};
/**
 * Exports the data as CSV
 * @type {{id: string, text: string, param: string}}
 */
DropdownItemEnum.Csv = {
    id: DropDownItemTypeEnum.Export,
    text: 'Export to CSV',
    data: 'csv',
    cssClass: 'csv'
};
/**
 * Exports the data as XLSX
 * @type {{id: string, text: string, param: string}}
 */
DropdownItemEnum.Xls = {
    id: DropDownItemTypeEnum.Export,
    text: 'Export to XLS',
    data: 'xls',
    cssClass: 'xls'
};
/**
 * Enable grid quick filter header
 * @type {{id: string, text: string, param: string}}
 */
DropdownItemEnum.Filter = {
    id: DropDownItemTypeEnum.Filter,
    text: 'Filter',
    cssClass: 'filter'
};
/**
 * Disable grid quick filter header
 * @type {{id: string, text: string, param: string}}
 */
DropdownItemEnum.Unfilter = {
    id: DropDownItemTypeEnum.Unfilter,
    text: 'Unfilter',
    cssClass: 'unfilter'
};


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




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/e13542/github/house_master/fiddles/angular2-cli/fiddle-0031-NgxBootstrapModal/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map