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

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li id=\"description\" class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        Enterprise AgGrid ~ State Management\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a id=\"githubLink\" class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"https://github.com/bradyhouse/house/blob/master/fiddles/angular2-cli/fiddle-0037-EntAgGridStateManagement\">\n          Fork Me On Github\n        </a>\n      </li>\n\n    </ul>\n  </div>\n</nav>\n<app-header (event)=\"onHeaderClick($event)\"></app-header>\n<ag-grid-angular\n      #agGrid style=\"width: 100%; height: 100%;\" id=\"myGrid\" class=\"ag-theme-balham\" [columnDefs]=\"columnDefs\"\n       [masterDetail]=\"true\"\n       [modules]=\"modules\"\n       [keepDetailRows]=\"true\"\n       [defaultColDef]=\"defaultColDef\"\n       [keepDetailRowsCount]=\"keepDetailRowsCount\"\n       [detailCellRendererParams]=\"detailCellRendererParams\"\n       [defaultExportParams]=\"defaultExportParams\"\n       [frameworkComponents]=\"frameworkComponents\"\n       [excelStyles]=\"excelStyles\"\n       [rowData]=\"rowData\"\n       (firstDataRendered)=\"onFirstDataRendered($event)\"\n       (gridReady)=\"onGridReady($event)\"\n       (sortChanged)=\"onGridStateChanged()\"\n      (filterChanged)=\"onGridStateChanged()\"\n      (columnMoved)=\"onGridStateChanged()\"\n      (columnPinned)=\"onGridStateChanged()\"\n      (columnResized)=\"onGridStateChanged()\"\n      (columnVisible)=\"onGridStateChanged()\"\n    ></ag-grid-angular>\n    <nav *ngIf=\"ifInstructions\" class=\"navbar navbar-expand navbar-dark bg-success fixed-bottom navbar-bottom\">\n      <div class=\"collapse navbar-collapse\">\n        <ul class=\"navbar-nav my-2 my-lg-0\">\n          <li class=\"nav-item\">\n            <span id=\"instructions\" style=\"font-weight: 700; color: whitesmoke;\" >\n              Reconfigure the grid and then refresh your browser to See State Management in Action. Use the reset button to clear your settings.\n            </span>\n          </li>\n        </ul>\n      </div>\n    </nav>\n"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state_local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app__ = __webpack_require__("./src/app/app.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__state_state_service__ = __webpack_require__("./src/app/state/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_header_header_component__ = __webpack_require__("./src/app/components/header/header.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AppComponent = /** @class */ (function (_super) {
    __extends(AppComponent, _super);
    // tslint:disable-next-line: deprecation
    function AppComponent(http, stateService, localStorageService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.stateService = stateService;
        _this.localStorageService = localStorageService;
        _this.modules = __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__["a" /* AllModules */];
        _this.keepDetailRowsCount = 2;
        _this.ifInstructions = true;
        _this.isReady = false;
        return _this;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.localStorageService.read();
        this.localStorageService.updateStateService(this.stateService.type, this.stateService);
        this.configGrid();
    };
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
            _this.restoreGridState(data);
        });
        setTimeout(function () {
            _this.ifInstructions = false;
        }, 3000);
    };
    AppComponent.prototype.onGridStateChanged = function () {
        if (this.isReady) {
            this.stateService.gridState = this.captureGridState();
        }
    };
    AppComponent.prototype.onHeaderClick = function (eventType) {
        if (eventType === __WEBPACK_IMPORTED_MODULE_8__components_header_header_component__["a" /* EventType */].Reset) {
            this.stateService.gridState = {};
            window.location.reload();
        }
    };
    AppComponent.prototype.configGrid = function () {
        var _this = this;
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
                colId: 'account',
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
    };
    AppComponent.prototype.restoreGridState = function (data) {
        var _this = this;
        var state = this.stateService.gridState;
        console.log('restoreGridState > state', state);
        window.setTimeout(function () {
            if (_this.gridApi && _this.gridColumnApi && state) {
                if (state.columnState) {
                    _this.gridColumnApi.setColumnState(state.columnState);
                }
                if (state.columnGroupsState) {
                    _this.gridColumnApi.setColumnGroupState(state.columnGroupsState);
                }
                if (state.sortModel) {
                    _this.gridApi.setSortModel(state.sortModel);
                }
                if (state.filterModel) {
                    _this.gridApi.setFilterModel(state.filterModel);
                }
                _this.isReady = true;
            }
        }, 1000);
        this.rowData = data;
    };
    AppComponent.prototype.captureGridState = function () {
        if (this.gridApi && this.gridColumnApi) {
            return {
                columnState: this.gridColumnApi.getColumnState(),
                columnGroupsState: this.gridColumnApi.getColumnGroupState(),
                sortModel: this.gridApi.getSortModel(),
                filterModel: this.gridApi.getFilterModel()
            };
        }
        return null;
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_7__state_state_service__["a" /* StateService */],
            __WEBPACK_IMPORTED_MODULE_5__state_local_storage_local_storage_service__["a" /* LocalStorageService */]])
    ], AppComponent);
    return AppComponent;
}(__WEBPACK_IMPORTED_MODULE_6__app__["a" /* BaseComponent */]));



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__state_state_module__ = __webpack_require__("./src/app/state/state.module.ts");
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
                // tslint:disable-next-line: deprecation
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__["AgGridModule"].withComponents([__WEBPACK_IMPORTED_MODULE_6__components_tooltip_tooltip_component__["a" /* TooltipComponent */]]),
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_7__state_state_module__["a" /* StateModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        this.subscriptions = [];
    }
    BaseComponent.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    BaseComponent.prototype.clearSubscriptions = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    return BaseComponent;
}());



/***/ }),

/***/ "./src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_header_component__ = __webpack_require__("./src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar_component__ = __webpack_require__("./src/app/components/toolbar/toolbar.component.ts");
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
                __WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__["a" /* TooltipComponent */],
                __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar_component__["a" /* ToolbarComponent */],
                __WEBPACK_IMPORTED_MODULE_3__header_header_component__["b" /* HeaderComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__["a" /* TooltipComponent */], __WEBPACK_IMPORTED_MODULE_3__header_header_component__["b" /* HeaderComponent */], __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar_component__["a" /* ToolbarComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/components/header/header.component.css":
/***/ (function(module, exports) {

module.exports = "table {\n    width: calc(100%) !important;\n    padding: 0;\n    margin: 0;\n}\n\ninput:focus {\n    outline: none;\n}\n\n.btn:focus {\n    outline: none;\n    background-color: var(--blue5);\n    border: 1px solid var(--blue6);\n    color: white;\n}\n\nbutton {\n    background-color: var(--blue5);\n    border: 1px solid var(--blue6);\n    color: white;\n}\n\nbutton:hover {\n    background-color: var(--blue6);\n    border: 1px solid var(--blue7);\n    color: white;\n}\n\nbutton:active {\n    background-color: var(--blue7);\n    -webkit-transform: translateX(1px);\n            transform: translateX(1px);\n}\n\n.badge--grey-2 {\n    background-color: var(--grey2);\n}\n\n.badge {\n    font-size: 1em;\n}\n\nstong {\n    color: white;\n}\n\n/*label {*/\n\n/*color: white !important;*/\n\n/*}*/\n\n/*.badge-medium {*/\n\n/*color: var(--blue7);*/\n\n/*}*/"

/***/ }),

/***/ "./src/app/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<app-toolbar [componentId]=\"'appHeader'\">\n  <div content>\n      <table>\n          <tr>\n              <td>\n                  <div style=\"text-align: right !important;\">\n                      <button [id]=\"'fiddleHeaderResetBtn'\" type=\"button\" class=\"btn btn--small\" (click)=\"onResetClick()\"><i class=\"fas fa-undo\"></i> Reset Grid</button>\n                  </div>\n              </td>\n          </tr>\n      </table>\n  </div>\n</app-toolbar>\n"

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventType;
(function (EventType) {
    EventType["Export"] = "Export";
    EventType["Refresh"] = "Refresh";
    EventType["Reset"] = "Reset";
})(EventType || (EventType = {}));
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.event = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HeaderComponent.prototype.onResetClick = function () {
        this.event.emit(EventType.Reset);
    };
    HeaderComponent.prototype.onExportClick = function () {
        this.event.emit(EventType.Export);
    };
    HeaderComponent.prototype.onRefreshClick = function () {
        this.event.emit(EventType.Refresh);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], HeaderComponent.prototype, "event", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("./src/app/components/header/header.component.html"),
            styles: [__webpack_require__("./src/app/components/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.css":
/***/ (function(module, exports) {

module.exports = "* {\n    background-color: var(--grey2) !important;\n    color: white;\n}\n\n.panel--raised {\n    margin: 0;\n    padding: .5em 1em;\n    font-size: .75em;\n}"

/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div [id]=\"componentId || 'toolbar1'\" class=\"panel--raised\">\n  <div class=\"panel__body\">\n      <ng-content select=\"[content]\"></ng-content>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ToolbarComponent.prototype, "componentId", void 0);
    ToolbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-toolbar',
            template: __webpack_require__("./src/app/components/toolbar/toolbar.component.html"),
            styles: [__webpack_require__("./src/app/components/toolbar/toolbar.component.css")]
        })
    ], ToolbarComponent);
    return ToolbarComponent;
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

/***/ "./src/app/state/local-storage/local-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
        this.params = new Map();
        this.options = {
            appKey: 'fiddle',
            blackList: []
        };
        if (window.localStorage) {
            this.isLocalStorageSupported = true;
        }
        else {
            console.warn('Local Storage is not supported');
        }
    }
    LocalStorageService.prototype.read = function () {
        var _this = this;
        if (this.isLocalStorageSupported) {
            Object.keys(window.localStorage).forEach(function (key) {
                var value = _this.getItem(key);
                if (value !== null && value !== undefined) {
                    _this.params[key] = value;
                }
            });
        }
    };
    LocalStorageService.prototype.updateStateService = function (key, stateService) {
        var _this = this;
        this.params.set(key, this.getItem(key));
        if (key !== this.options.appKey) {
            stateService.isReady = false;
        }
        var state = this.params.get(key);
        Object.keys(state).forEach(function (property) {
            var privateProperty = '_' + property;
            if (privateProperty in stateService && property !== 'type') {
                var isValid = _this.options.blackList.indexOf(property) === -1;
                if (isValid) {
                    var value = state[property];
                    if (stateService.hasOwnProperty(privateProperty)) {
                        if (stateService[privateProperty] && stateService[privateProperty].constructor === __WEBPACK_IMPORTED_MODULE_1_immutable__["List"]) {
                            if (!value || value.constructor !== Array) {
                                value = [];
                            }
                            stateService[privateProperty] = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])(value);
                        }
                        else {
                            stateService[privateProperty] = value;
                        }
                    }
                }
            }
        });
        if (key !== this.options.appKey) {
            stateService.isReady = true;
        }
    };
    LocalStorageService.prototype.write = function (key, value, stateType) {
        if (!this.params.has(stateType)) {
            this.params[stateType] = {};
        }
        this.params.set(stateType, value);
        this.setItem(stateType, this.params.get(stateType));
    };
    LocalStorageService.prototype.clear = function (stateType) {
        this.params.set(stateType, {});
        this.setItem(stateType, this.params.get(stateType));
    };
    LocalStorageService.prototype.getItem = function (key) {
        var value;
        if (this.isLocalStorageSupported) {
            if (window.localStorage[key]) {
                try {
                    value = JSON.parse(window.localStorage[key]);
                }
                catch (e) {
                    value = {};
                }
            }
        }
        return value;
    };
    LocalStorageService.prototype.setItem = function (key, value) {
        if (this.isLocalStorageSupported) {
            window.localStorage[key] = JSON.stringify(value);
        }
    };
    LocalStorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LocalStorageService);
    return LocalStorageService;
}());



/***/ }),

/***/ "./src/app/state/state.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_service__ = __webpack_require__("./src/app/state/state.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var StateModule = /** @class */ (function () {
    function StateModule() {
    }
    StateModule_1 = StateModule;
    StateModule.forRoot = function () {
        return {
            ngModule: StateModule_1,
            providers: [__WEBPACK_IMPORTED_MODULE_2__local_storage_local_storage_service__["a" /* LocalStorageService */], __WEBPACK_IMPORTED_MODULE_3__state_service__["a" /* StateService */]]
        };
    };
    StateModule = StateModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
            ],
            declarations: [],
            providers: [__WEBPACK_IMPORTED_MODULE_2__local_storage_local_storage_service__["a" /* LocalStorageService */], __WEBPACK_IMPORTED_MODULE_3__state_service__["a" /* StateService */]]
        })
    ], StateModule);
    return StateModule;
    var StateModule_1;
}());



/***/ }),

/***/ "./src/app/state/state.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__("./src/app/state/state.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StateService = /** @class */ (function () {
    function StateService(localStorageService) {
        var _this = this;
        this.localStorageService = localStorageService;
        this._isReady = false;
        this._type = __WEBPACK_IMPORTED_MODULE_4__state__["a" /* PersistedTypesEnum */].localStorageKey;
        this._isPreloader = true;
        this._gridState = {};
        this.isReadyChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._isReadyObserver = observer; }).share();
        this.gridStateChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._gridStateObserver = observer; }).share();
        this.typeChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._typeObserver = observer; }).share();
    }
    Object.defineProperty(StateService.prototype, "isPreloader", {
        get: function () {
            return this._isPreloader;
        },
        set: function (newValue) {
            if (this._isPreloader !== newValue) {
                this._isPreloader = newValue;
                if (this._isPreloaderObserver) {
                    this._isPreloaderObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "isReady", {
        get: function () {
            return this._isReady;
        },
        set: function (newValue) {
            if (this._isReady !== newValue) {
                this._isReady = newValue;
                if (this._isReadyObserver) {
                    this._isReadyObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "gridState", {
        get: function () {
            return this._gridState;
        },
        set: function (newValue) {
            if (!_.isEqual(newValue, this._gridState)) {
                this._gridState = newValue;
                if (this.isReady) {
                    this.updateState(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* PersistedTypesEnum */].gridState, { gridState: newValue });
                }
                if (this._gridStateObserver) {
                    this._gridStateObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (newValue) {
            if (this._type !== newValue) {
                this._type = newValue;
                if (this._typeObserver) {
                    this._typeObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.updateState = function (key, value, type) {
        if (type === void 0) { type = null; }
        if (this.type) {
            this.localStorageService.write(key, value, this.type);
        }
    };
    StateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__local_storage_local_storage_service__["a" /* LocalStorageService */]])
    ], StateService);
    return StateService;
}());



/***/ }),

/***/ "./src/app/state/state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersistedTypesEnum; });
var PersistedTypesEnum = /** @class */ (function () {
    function PersistedTypesEnum() {
    }
    PersistedTypesEnum.localStorageKey = 'fiddle-0037';
    PersistedTypesEnum.gridState = 'gridState';
    return PersistedTypesEnum;
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