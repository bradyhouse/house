webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        Enterprise AgGrid ~ Custom Tooltip Component\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"https://github.com/bradyhouse/house/blob/master/fiddles/angular2-cli/fiddle-0036-EntAgGridToolTips\">\n          Fork Me On Github\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n<ag-grid-angular\n      #agGrid style=\"width: 100%; height: 100%;\" id=\"myGrid\" class=\"ag-theme-balham\" [columnDefs]=\"columnDefs\"\n       [masterDetail]=\"true\"\n       [modules]=\"modules\"\n       [keepDetailRows]=\"true\"\n       [defaultColDef]=\"defaultColDef\"\n       [keepDetailRowsCount]=\"keepDetailRowsCount\"\n       [detailCellRendererParams]=\"detailCellRendererParams\"\n       [defaultExportParams]=\"defaultExportParams\"\n       [frameworkComponents]=\"frameworkComponents\"\n       [excelStyles]=\"excelStyles\"\n       [rowData]=\"rowData\"\n       (firstDataRendered)=\"onFirstDataRendered($event)\"\n       (gridReady)=\"onGridReady($event)\"\n    ></ag-grid-angular>\n    <nav *ngIf=\"ifInstructions\" class=\"navbar navbar-expand navbar-dark bg-success fixed-bottom navbar-bottom\">\n      <div class=\"collapse navbar-collapse\">\n        <ul class=\"navbar-nav my-2 my-lg-0\">\n          <li class=\"nav-item\">\n            <span style=\"font-weight: 700; color: whitesmoke;\" >\n              Move your mouse over a cell\n            </span>\n          </li>\n        </ul>\n      </div>\n    </nav>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__ = __webpack_require__("./node_modules/@ag-grid-enterprise/all-modules/dist/es6/main.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





function cell(text, styleId) {
    if (styleId === void 0) { styleId = null; }
    return {
        styleId: styleId,
        data: {
            type: /^\d+$/.test(text) ? 'Number' : 'String',
            value: String(text)
        }
    };
}
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.modules = __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__["a" /* AllModules */];
        this.keepDetailRowsCount = 2;
        this.ifInstructions = true;
        this.columnDefs = [{
                field: 'name',
                cellRenderer: 'agGroupCellRenderer',
                cellClass: 'body',
                tooltipField: 'name',
                tooltipComponentParams: {
                    tooltip: 'Customer\'s Name or nickname or alias or whatever'
                }
            },
            {
                field: 'account',
                cellClass: 'body',
                tooltipField: 'account',
                tooltipComponentParams: {
                    tooltip: 'Six digit System Generated Customer\'s Account Number'
                }
            },
            {
                field: 'calls',
                cellClass: 'body',
                tooltipField: 'calls',
                tooltipComponentParams: {
                    tooltip: 'Total Calls Involving this Customer'
                }
            },
            {
                field: 'minutes',
                valueFormatter: 'x.toLocaleString() + "m"',
                cellClass: 'bodyFloat',
                tooltipField: 'minutes',
                tooltipComponentParams: {
                    tooltip: 'Duration of all Calls Involving this Specific Customer'
                }
            },
            {
                field: 'Comment',
                cellClass: 'body'
            },
            {
                field: 'rating',
                cellClass: 'body',
                tooltipField: 'rating',
                tooltipComponentParams: {
                    tooltip: 'customer\'s rating'
                }
            }
        ];
        this.defaultColDef = {
            filter: true,
            resizable: true,
            sortable: true,
            tooltipComponent: 'fiddleTooltipComponent'
        };
        this.frameworkComponents = {
            fiddleTooltipComponent: __WEBPACK_IMPORTED_MODULE_3__components_tooltip_tooltip_component__["a" /* TooltipComponent */]
        };
        this.detailCellRendererParams = {
            detailGridOptions: {
                columnDefs: [{
                        field: 'callId',
                        tooltipField: 'callId',
                        tooltipComponentParams: {
                            tooltip: 'Id used to Identify the Call'
                        }
                    },
                    {
                        field: 'direction',
                        tooltipField: 'direction',
                        tooltipComponentParams: {
                            tooltip: 'Inbound or Outbound Call'
                        }
                    },
                    {
                        field: 'number',
                        tooltipField: 'number',
                        tooltipComponentParams: {
                            tooltip: 'The Caller\'s Phone Number'
                        }
                    },
                    {
                        field: 'duration',
                        tooltipField: 'duration',
                        valueFormatter: 'x.toLocaleString() + "s"',
                        tooltipComponentParams: {
                            tooltip: 'Length of all Call'
                        }
                    },
                    {
                        field: 'switchCode',
                        tooltipField: 'switchCode',
                        tooltipComponentParams: {
                            tooltip: 'Switch Board Indicator'
                        }
                    }
                ],
                defaultColDef: {
                    filter: true,
                    resizable: true,
                    sortable: true,
                    tooltipComponent: 'fiddleTooltipComponent'
                },
                frameworkComponents: {
                    fiddleTooltipComponent: __WEBPACK_IMPORTED_MODULE_3__components_tooltip_tooltip_component__["a" /* TooltipComponent */]
                },
                onFirstDataRendered: function (params) {
                    _this.autoSizeAllColumns(params);
                }
            },
            getDetailRowData: function (params) {
                setTimeout(function () {
                    params.successCallback(params.data.callRecords);
                }, 2000);
            },
            template: '<div style="height: 100%; background-color: var(--blue6); padding: 10px;">' +
                '  <div ref="eDetailGrid" style="height: 100%;"></div>' +
                '</div>',
            sheetName: 'EntAgGridHierarchicalExport',
            fileName: 'fiddle-0035',
            columnWidth: '20'
        };
        this.defaultExportParams = {
            getCustomContentBelowRow: function (params) {
                if (params.node.data.callRecords && params.node.data.callRecords.length) {
                    return [
                        [
                            cell(''),
                            cell('callId', 'header'),
                            cell('direction', 'header'),
                            cell('number', 'header'),
                            cell('duration', 'header'),
                            cell('switchCode', 'header')
                        ]
                    ].concat(params.node.data.callRecords.map(function (record) {
                        return [
                            cell(''),
                            cell(record.callId, 'body'),
                            cell(record.direction, 'body'),
                            cell(record.number, 'body'),
                            cell(record.duration, 'body'),
                            cell(record.switchCode, 'body')
                        ];
                    }), [
                        []
                    ]);
                }
                return false;
            }
        };
        this.excelStyles = [{
                id: 'header',
                interior: {
                    color: '#007BFF',
                    pattern: 'Solid'
                },
                font: {
                    color: '#FFFFFF'
                },
                alignment: {
                    horizontal: 'Left',
                    vertical: 'Middle'
                }
            },
            {
                id: 'headerNum',
                interior: {
                    color: '#007BFF',
                    pattern: 'Solid'
                },
                alignment: {
                    horizontal: 'Right',
                    vertical: 'Middle'
                }
            },
            {
                id: 'body',
                interior: {
                    color: '#ebf9ff',
                    pattern: 'DiagCross'
                }
            },
            {
                id: 'bodyInt',
                interior: {
                    color: '#ebf9ff',
                    pattern: 'Solid'
                },
                numberFormat: {
                    format: '#,##0_);[Red](#,##0)'
                },
                alignment: {
                    horizontal: 'Right',
                    vertical: 'Middle'
                }
            },
            {
                id: 'bodyFloat',
                numberFormat: {
                    format: '0.00'
                },
                interior: {
                    color: '#ebf9ff',
                    pattern: 'Solid'
                },
                alignment: {
                    horizontal: 'Right',
                    vertical: 'Middle'
                }
            },
        ];
    }
    AppComponent.prototype.onFirstDataRendered = function (params) {
        this.autoSizeAllColumns(params);
    };
    AppComponent.prototype.onGridReady = function (params) {
        var _this = this;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.http
            .get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(typeof data);
            _this.rowData = data;
        });
        setTimeout(function () {
            _this.ifInstructions = false;
        }, 3000);
    };
    AppComponent.prototype.autoSizeAllColumns = function (params) {
        var allColumnIds = [];
        params.columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });
        params.columnApi.autoSizeColumns(allColumnIds, false);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__ = __webpack_require__("./node_modules/@ag-grid-community/angular/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__("./src/app/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__["AgGridModule"].withComponents([__WEBPACK_IMPORTED_MODULE_6__components_tooltip_tooltip_component__["a" /* TooltipComponent */]]),
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__["a" /* TooltipComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__["a" /* TooltipComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/components/tooltip/tooltip.component.css":
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  width: auto;\n  min-width: 200px;\n  max-width: 250px;\n  height: auto;\n  border: 1px solid var(--blue6);\n  background-color: var(--blue7);\n  overflow: hidden;\n  pointer-events: none;\n  -webkit-transition: opacity 1s;\n  transition: opacity 1s;\n  padding: 5px;\n  -webkit-filter: drop-shadow(4px 4px 4px gray);\n          filter: drop-shadow(4px 4px 4px gray);\n}\n\n:host.ag-tooltip-hiding {\n  opacity: 0;\n}\n\n.custom-tooltip p {\n  margin: 5px;\n  white-space: nowrap;\n}\n\n.custom-tooltip {\n  font-weight: bold;\n}\n"

/***/ }),

/***/ "./src/app/components/tooltip/tooltip.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"custom-tooltip\">\n  {{tooltipText}}\n</div>\n"

/***/ }),

/***/ "./src/app/components/tooltip/tooltip.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TooltipComponent = /** @class */ (function () {
    function TooltipComponent() {
    }
    TooltipComponent.prototype.agInit = function (params) {
        this.params = params;
        this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        this.tooltipText = this.params.tooltip || 'n/a';
    };
    TooltipComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-tooltip',
            template: __webpack_require__("./src/app/components/tooltip/tooltip.component.html"),
            styles: [__webpack_require__("./src/app/components/tooltip/tooltip.component.css")]
        })
    ], TooltipComponent);
    return TooltipComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__ = __webpack_require__("./node_modules/@ag-grid-enterprise/all-modules/dist/es6/main.js");





fetch('assets/license.json').then(function (response) {
    return response.json();
}).then(function (data) {
    __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__["b" /* LicenseManager */].setLicenseKey(data.license);
    if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
    }
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
        .catch(function (err) { return console.error(err); });
});


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map