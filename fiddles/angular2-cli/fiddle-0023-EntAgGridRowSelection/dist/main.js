(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/ag-tree-grid/ag-tree-grid.component.css":
/*!*********************************************************!*\
  !*** ./src/app/ag-tree-grid/ag-tree-grid.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ag-tree-grid {\n  zoom: 150%;\n}\n\n.ag-tree-grid-filter {\n  width: 100%;\n  background-color: #000;\n  color: white;\n  border: none;\n  outline: none;\n  --webkit-input-placeholder: white;\n  zoom: 150%;\n}\n\ninput[type=\"text\"], textarea {\n  padding: 7px 10px;\n  font-size: 14px;\n  background: #000;\n  color: lime;\n}\n\n.ag-header,\n.ag-header-viewport {\n  display: none !important;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWctdHJlZS1ncmlkL2FnLXRyZWUtZ3JpZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsV0FBVztFQUNYLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osWUFBWTtFQUNaLGFBQWE7RUFDYixpQ0FBaUM7RUFDakMsVUFBVTtBQUNaOztBQUdBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztBQUVBOztFQUVFLHdCQUF3QjtBQUMxQiIsImZpbGUiOiJzcmMvYXBwL2FnLXRyZWUtZ3JpZC9hZy10cmVlLWdyaWQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZy10cmVlLWdyaWQge1xuICB6b29tOiAxNTAlO1xufVxuXG4uYWctdHJlZS1ncmlkLWZpbHRlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgLS13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXI6IHdoaXRlO1xuICB6b29tOiAxNTAlO1xufVxuXG5cbmlucHV0W3R5cGU9XCJ0ZXh0XCJdLCB0ZXh0YXJlYSB7XG4gIHBhZGRpbmc6IDdweCAxMHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGJhY2tncm91bmQ6ICMwMDA7XG4gIGNvbG9yOiBsaW1lO1xufVxuXG4uYWctaGVhZGVyLFxuLmFnLWhlYWRlci12aWV3cG9ydCB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/ag-tree-grid/ag-tree-grid.component.html":
/*!**********************************************************!*\
  !*** ./src/app/ag-tree-grid/ag-tree-grid.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<input class=\"ag-tree-grid-filter\" (keyup)=\"onQuickFilterChanged($event)\" type=\"text\" id=\"quickFilterInput\" placeholder=\"Type text to filter...\"/>\n<div class=\"ag-tree-grid\" [ngStyle]=\"_style\" (window:resize)=\"onResize($event)\">\n  <ag-grid-angular\n    #agGrid\n    style=\"width: 100%; height: 100%;\"\n    id=\"myGrid\"\n    class=\"ag-theme-balham\"\n    [columnDefs]=\"this._columnDefs\"\n    [rowData]=\"this._rowData\"\n    [rowSelection]=\"this._rowSelection\"\n    [groupSelectsChildren]=\"true\"\n    [suppressRowClickSelection]=\"false\"\n    [toolPanelSuppressSideButtons]=\"true\"\n    [animateRows]=\"true\"\n    [defaultColDef]=\"this._defaultColDef\"\n    [autoGroupColumnDef]=\"this._autoGroupColumnDef\"\n    (gridReady)=\"onGridReady($event)\"\n    (modelUpdated)=\"onModelUpdated($event)\"\n    (selectionChanged)=\"onSelectionChanged($event)\"\n    (rowClicked)=\"onRowClicked($event)\"\n  ></ag-grid-angular>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/ag-tree-grid/ag-tree-grid.component.ts":
/*!********************************************************!*\
  !*** ./src/app/ag-tree-grid/ag-tree-grid.component.ts ***!
  \********************************************************/
/*! exports provided: AgTreeGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgTreeGridComponent", function() { return AgTreeGridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _enums_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/index */ "./src/app/ag-tree-grid/enums/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AgTreeGridComponent = /** @class */ (function () {
    // endregion
    function AgTreeGridComponent(_changeDetector, _differs) {
        this._changeDetector = _changeDetector;
        this._differs = _differs;
        this.events = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._rowSelection = 'multiple';
        this._defaultColDef = {
            sortable: true,
            resizable: true,
            suppressMenu: true,
            filter: 'agTextColumnFilter'
        };
        this._autoGroupColumnDef = {
            headerName: 'Athlete',
            field: 'athlete',
            width: 350,
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: { checkbox: true }
        };
    }
    // region OnChanges Implementation
    AgTreeGridComponent.prototype.ngOnChanges = function (changes) {
        if ('options' in changes) {
            var value = changes['options'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create();
            }
        }
    };
    // endregion
    // region DoCheck Implementation
    AgTreeGridComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this._differ) {
            var changes = this._differ.diff(this.options);
            if (changes) {
                changes.forEachChangedItem(function (item) {
                    _this._applyChange(item);
                });
                changes.forEachAddedItem(function (item) {
                    _this._applyChange(item);
                });
            }
        }
    };
    // endregion
    AgTreeGridComponent.prototype.onResize = function (event) {
        this.stretchGrid(event.target.innerWidth, event.target.innerHeight);
    };
    /*onSelectionChanged() {
      const selectedRows = this._gridApi.getSelectedRows();
      let selectedRowsString = '';
      selectedRows.forEach((selectedRow, index) => {
        if (index > 5) {
          return;
        }
        if (index !== 0) {
          selectedRowsString += ', ';
        }
        selectedRowsString += selectedRow.athlete;
      });
      if (selectedRows.length >= 5) {
        selectedRowsString += ' - and ' + (selectedRows.length - 5) + ' others';
      }
      document.querySelector('#selectedRows').innerHTML = selectedRowsString;
    }*/
    AgTreeGridComponent.prototype.onGridReady = function (params) {
        console.debug('onGridReady');
        this._gridApi = params.api;
        this.stretchGrid(window.innerWidth, window.innerHeight);
        this._gridApi.sizeColumnsToFit();
    };
    AgTreeGridComponent.prototype.onModelUpdated = function (event) {
        this.events.emit({
            type: _enums_index__WEBPACK_IMPORTED_MODULE_1__["AgTreeGridEvents"].expandBubble,
            data: event
        });
    };
    AgTreeGridComponent.prototype.onSelectionChanged = function (event) {
        this.events.emit({
            type: _enums_index__WEBPACK_IMPORTED_MODULE_1__["AgTreeGridEvents"].selectBubble,
            data: event
        });
    };
    AgTreeGridComponent.prototype.onQuickFilterChanged = function (event) {
        this._gridApi.setQuickFilter(event.target.value);
    };
    AgTreeGridComponent.prototype.onRowClicked = function (params) {
        console.dir(params);
        if (params.node.expanded) {
            params.node.expanded = false;
        }
        else {
            params.node.expanded = true;
        }
        this._gridApi.onGroupExpandedOrCollapsed(params.rowIndex);
    };
    AgTreeGridComponent.prototype.stretchGrid = function (width, height) {
        this._style = {
            width: width + 'px',
            height: (height - 40) + 'px'
        };
    };
    AgTreeGridComponent.prototype._applyChange = function (item) {
        switch (item.key) {
            case 'columnDefs':
                this._columnDefs = this.options.columnDefs;
                break;
            case 'rowData':
                this._rowData = this.options.rowData;
                break;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('agGrid'),
        __metadata("design:type", Object)
    ], AgTreeGridComponent.prototype, "agGrid", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], AgTreeGridComponent.prototype, "events", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AgTreeGridComponent.prototype, "options", void 0);
    AgTreeGridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ag-tree-grid',
            template: __webpack_require__(/*! ./ag-tree-grid.component.html */ "./src/app/ag-tree-grid/ag-tree-grid.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./ag-tree-grid.component.css */ "./src/app/ag-tree-grid/ag-tree-grid.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"]])
    ], AgTreeGridComponent);
    return AgTreeGridComponent;
}());



/***/ }),

/***/ "./src/app/ag-tree-grid/ag-tree-grid.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/ag-tree-grid/ag-tree-grid.module.ts ***!
  \*****************************************************/
/*! exports provided: AgTreeGridModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgTreeGridModule", function() { return AgTreeGridModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ag_tree_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ag-tree-grid.component */ "./src/app/ag-tree-grid/ag-tree-grid.component.ts");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ag-grid-angular/main */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ag-grid-enterprise */ "./node_modules/ag-grid-enterprise/main.js");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AgTreeGridModule = /** @class */ (function () {
    function AgTreeGridModule() {
    }
    AgTreeGridModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_ag_tree_grid_component__WEBPACK_IMPORTED_MODULE_2__["AgTreeGridComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3__["AgGridModule"].withComponents([])
            ],
            exports: [
                _ag_tree_grid_component__WEBPACK_IMPORTED_MODULE_2__["AgTreeGridComponent"]
            ]
        })
    ], AgTreeGridModule);
    return AgTreeGridModule;
}());



/***/ }),

/***/ "./src/app/ag-tree-grid/enums/ag-tree-grid-cmds.ts":
/*!*********************************************************!*\
  !*** ./src/app/ag-tree-grid/enums/ag-tree-grid-cmds.ts ***!
  \*********************************************************/
/*! exports provided: AgTreeGridCmds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgTreeGridCmds", function() { return AgTreeGridCmds; });
var AgTreeGridCmds;
(function (AgTreeGridCmds) {
    AgTreeGridCmds[AgTreeGridCmds["ShowAll"] = 1] = "ShowAll";
    AgTreeGridCmds[AgTreeGridCmds["ShowSelected"] = 2] = "ShowSelected";
    AgTreeGridCmds[AgTreeGridCmds["ClearSelected"] = 3] = "ClearSelected";
    AgTreeGridCmds[AgTreeGridCmds["Reload"] = 4] = "Reload";
    AgTreeGridCmds[AgTreeGridCmds["ExpandAll"] = 5] = "ExpandAll";
    AgTreeGridCmds[AgTreeGridCmds["CollapseAll"] = 6] = "CollapseAll";
    AgTreeGridCmds[AgTreeGridCmds["SelectAll"] = 7] = "SelectAll";
    AgTreeGridCmds[AgTreeGridCmds["Export"] = 8] = "Export";
    AgTreeGridCmds[AgTreeGridCmds["showLoader"] = 9] = "showLoader";
    AgTreeGridCmds[AgTreeGridCmds["hideLoader"] = 10] = "hideLoader";
    AgTreeGridCmds[AgTreeGridCmds["invalidate"] = 11] = "invalidate";
})(AgTreeGridCmds || (AgTreeGridCmds = {}));


/***/ }),

/***/ "./src/app/ag-tree-grid/enums/ag-tree-grid-events.ts":
/*!***********************************************************!*\
  !*** ./src/app/ag-tree-grid/enums/ag-tree-grid-events.ts ***!
  \***********************************************************/
/*! exports provided: AgTreeGridEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgTreeGridEvents", function() { return AgTreeGridEvents; });
var AgTreeGridEvents;
(function (AgTreeGridEvents) {
    AgTreeGridEvents[AgTreeGridEvents["cmd"] = 1] = "cmd";
    AgTreeGridEvents[AgTreeGridEvents["nodeChange"] = 2] = "nodeChange";
    AgTreeGridEvents[AgTreeGridEvents["filter"] = 3] = "filter";
    AgTreeGridEvents[AgTreeGridEvents["selectBubble"] = 4] = "selectBubble";
    AgTreeGridEvents[AgTreeGridEvents["nodeRequest"] = 5] = "nodeRequest";
    AgTreeGridEvents[AgTreeGridEvents["expandBubble"] = 6] = "expandBubble";
})(AgTreeGridEvents || (AgTreeGridEvents = {}));


/***/ }),

/***/ "./src/app/ag-tree-grid/enums/index.ts":
/*!*********************************************!*\
  !*** ./src/app/ag-tree-grid/enums/index.ts ***!
  \*********************************************/
/*! exports provided: AgTreeGridEvents, AgTreeGridCmds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ag_tree_grid_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ag-tree-grid-events */ "./src/app/ag-tree-grid/enums/ag-tree-grid-events.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AgTreeGridEvents", function() { return _ag_tree_grid_events__WEBPACK_IMPORTED_MODULE_0__["AgTreeGridEvents"]; });

/* harmony import */ var _ag_tree_grid_cmds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ag-tree-grid-cmds */ "./src/app/ag-tree-grid/enums/ag-tree-grid-cmds.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AgTreeGridCmds", function() { return _ag_tree_grid_cmds__WEBPACK_IMPORTED_MODULE_1__["AgTreeGridCmds"]; });





/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fiddle {\n  zoom: 150%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFVO0FBQ1oiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5maWRkbGUge1xuICB6b29tOiAxNTAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<nav class=\"navbar navbar-expand navbar-dark bg-danger navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link fiddle\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\"\n           href=\"https://github.com/bradyhouse/house/tree/master/fiddles/angular2-cli/fiddle-0020-EntAgGridPivot\">\n          Fork Me On Github\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>-->\n<app-ag-tree-grid [options]=\"options\" (events)=\"onEvents($event)\"></app-ag-tree-grid>\n\n"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ag_tree_grid_enums_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ag-tree-grid/enums/index */ "./src/app/ag-tree-grid/enums/index.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_http) {
        this._http = _http;
        this.options = {
            columnDefs: [
                {
                    headerName: 'Gold',
                    field: 'gold',
                    width: 100,
                    aggFunc: 'sum',
                    hide: true
                },
                {
                    headerName: 'Silver',
                    field: 'silver',
                    width: 100,
                    aggFunc: 'sum',
                    hide: true
                },
                {
                    headerName: 'Bronze',
                    field: 'bronze',
                    width: 100,
                    aggFunc: 'sum',
                    hide: true
                },
                {
                    headerName: 'Total',
                    field: 'total',
                    width: 100,
                    aggFunc: 'sum',
                    hide: true
                },
                {
                    headerName: 'Age',
                    field: 'age',
                    width: 90,
                    checkboxSelection: true,
                    aggFunc: 'sum',
                    hide: true
                },
                {
                    headerName: 'Country',
                    field: 'country',
                    width: 120,
                    rowGroupIndex: 0,
                    hide: true
                },
                {
                    headerName: 'Year',
                    field: 'year',
                    width: 90,
                    hide: true
                },
                {
                    headerName: 'Date',
                    field: 'date',
                    width: 110,
                    hide: true
                },
                {
                    headerName: 'Sport',
                    field: 'sport',
                    width: 110,
                    rowGroupIndex: 1,
                    hide: true
                }
            ]
        };
    }
    AppComponent.prototype.onEvents = function (event) {
        switch (event.type) {
            case _ag_tree_grid_enums_index__WEBPACK_IMPORTED_MODULE_1__["AgTreeGridEvents"].selectBubble:
                console.debug('select bubble');
                console.debug(event.data.api.getSelectedRows());
                break;
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._http
            .get('./assets/data.json')
            .subscribe(function (data) {
            _this.options.rowData = data;
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'my-app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppComponent);
    return AppComponent;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ag_tree_grid_ag_tree_grid_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ag-tree-grid/ag-tree-grid.module */ "./src/app/ag-tree-grid/ag-tree-grid.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


 // <-- NgModel lives here
// HttpClient


// ag-grid

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _ag_tree_grid_ag_tree_grid_module__WEBPACK_IMPORTED_MODULE_4__["AgTreeGridModule"]
            ],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



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
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ag-grid-enterprise */ "./node_modules/ag-grid-enterprise/main.js");
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__);





fetch('assets/license.json').then(function (response) {
    return response.json();
}).then(function (data) {
    ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_4__["LicenseManager"].setLicenseKey(data.license);
    if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(function (err) { return console.error(err); });
});


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/e13542/github/house_master/fiddles/angular2-cli/fiddle-0023-EntAgGridRowSelection/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map