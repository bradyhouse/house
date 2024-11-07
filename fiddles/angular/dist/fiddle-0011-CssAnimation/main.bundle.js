webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<div class=\"panel panel-default\" (window:resize)=\"onWindowResize()\">\n  <div class=\"panel-heading\">CSS Anime</div>\n  <div class=\"panel-body\">\n    <div class=\"jumbotron\">\n      <p style=\"padding-left: 3rem\">\n         <app-loading-anime [options]=\"options\"\n                            [ngStyle]=\"{\n                 'height': height + 'px',\n                 'width': width + 'px'}\"\n                            (widthChange)=\"onAnimeWidthChange($event)\"\n                            (heightChange)=\"onAnimeHeightChange($event)\">\n        </app-loading-anime>\n      </p>\n      </div>\n  </div>\n  <div class=\"panel-footer\">\n    <div class=\"row\">\n      <div class=\"col\">\n        <a href=\"#\" (click)=\"onError()\" class=\"btn btn-danger\">Error</a>\n        <a href=\"#\" (click)=\"onWarning()\" class=\"btn btn-warning\">Warning</a>\n        <a href=\"#\" (click)=\"onLoad()\" class=\"btn btn-default\">Load</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.options = {
            isLoading: true,
            isDataValid: false
        };
        this.animeHeight = 0;
        this.animeWidth = 0;
    }
    AppComponent.prototype.onLoad = function ($event) {
        this.options = {
            isLoading: true,
            isDataValid: false
        };
    };
    AppComponent.prototype.onError = function ($event) {
        this.options = {
            error: "Houston! we have an error. The data is invalid",
            isLoading: false,
            isDataValid: false
        };
    };
    AppComponent.prototype.onWarning = function ($event) {
        this.options = {
            warning: "Houston-- fyi, we need data.",
            isLoading: false,
            isDataValid: false
        };
    };
    AppComponent.prototype.onAnimeWidthChange = function (width) {
        this.animeWidth = width;
        this.onWindowResize();
    };
    AppComponent.prototype.onAnimeHeightChange = function (height) {
        this.animeHeight = height;
        this.onWindowResize();
    };
    AppComponent.prototype.onWindowResize = function () {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.left = 0;
        this.top = 0;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__("../../../../../src/app/components/components.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_anime_loading_anime_component__ = __webpack_require__("../../../../../src/app/components/loading-anime/loading-anime.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__loading_anime_loading_anime_component__["a" /* LoadingAnimeComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__loading_anime_loading_anime_component__["a" /* LoadingAnimeComponent */]
        ],
        schemas: [
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* NO_ERRORS_SCHEMA */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* CUSTOM_ELEMENTS_SCHEMA */]
        ],
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/loading-anime/loading-anime-options.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=loading-anime-options.js.map

/***/ }),

/***/ "../../../../../src/app/components/loading-anime/loading-anime.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/loading-anime/loading-anime.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"loading-anime\" #el (window:resize)=\"onWindowResize()\">\n  <div *ngIf=\"!options?.isDataValid && !options?.isLoading\"\n       class=\"loading-anime\"\n       [ngClass]=\"options?.cssClass\">\n    <p class=\"error\" *ngIf=\"options?.error\">{{options?.error}}</p>\n    <p class=\"notification\" *ngIf=\"!options?.error\">{{options?.warning}}</p>\n  </div>\n\n  <div class=\"loader\"\n       [ngClass]=\"options?.cssClass\"\n       *ngIf=\"options?.isLoading\">\n    <div class=\"bounce1\"></div>\n    <div class=\"bounce2\"></div>\n    <div class=\"bounce3\"></div>\n    <div class=\"bounce4\"></div>\n    <div class=\"bounce5\"></div>\n    <div class=\"bounce6\"></div>\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/components/loading-anime/loading-anime.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading_anime_options__ = __webpack_require__("../../../../../src/app/components/loading-anime/loading-anime-options.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading_anime_options___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__loading_anime_options__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingAnimeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingAnimeComponent = (function () {
    function LoadingAnimeComponent() {
        this.widthChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.heightChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        this.onWindowResize();
    }
    LoadingAnimeComponent.prototype.ngOnInit = function () {
    };
    LoadingAnimeComponent.prototype.onWindowResize = function () {
        if (this.el) {
            this.widthChange.emit(this.el.nativeElement.innerWidth);
            this.heightChange.emit(this.el.nativeElement.innerHeight);
        }
    };
    return LoadingAnimeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ViewChild */])('el'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === "function" && _a || Object)
], LoadingAnimeComponent.prototype, "el", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__loading_anime_options__["LoadingAnimeOptions"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loading_anime_options__["LoadingAnimeOptions"]) === "function" && _b || Object)
], LoadingAnimeComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]) === "function" && _c || Object)
], LoadingAnimeComponent.prototype, "widthChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Output */])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]) === "function" && _d || Object)
], LoadingAnimeComponent.prototype, "heightChange", void 0);
LoadingAnimeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-loading-anime',
        template: __webpack_require__("../../../../../src/app/components/loading-anime/loading-anime.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/loading-anime/loading-anime.component.css")]
    }),
    __metadata("design:paramtypes", [])
], LoadingAnimeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=loading-anime.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map