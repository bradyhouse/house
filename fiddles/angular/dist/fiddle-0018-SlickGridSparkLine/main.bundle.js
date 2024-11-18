webpackJsonp([3],{

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

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div #container>\n  <div #table class=\"grid\" [ngStyle]=\"{'height': height + 'px'}\"></div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slick_grid_auto_size_service__ = __webpack_require__("../../../../../src/app/slick-grid-auto-size.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slick_grid_resize_service__ = __webpack_require__("../../../../../src/app/slick-grid-resize.service.ts");
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
    function AppComponent(_slickGridAutoSizeService, _slickGridResizeService) {
        this._slickGridAutoSizeService = _slickGridAutoSizeService;
        this._slickGridResizeService = _slickGridResizeService;
        this.height = window.innerHeight;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this._slickGridAutoSizeService.table = this.table.nativeElement;
        this._slickGridResizeService.init(this.container.nativeElement, this._slickGridAutoSizeService);
        this._render();
    };
    AppComponent.prototype.tooltipFormatter = function (sparkline, options, fields) {
        switch (fields.color) {
            case 'white':
                switch (fields.percent) {
                    case 25:
                        return 'Stage 3';
                    case 50:
                        return 'Stage 2';
                    default:
                        return 'Stage 1';
                }
            default:
                switch (fields.percent) {
                    case 25:
                        return 'Stage 1';
                    case 50:
                        return 'Stage 2';
                    case 75:
                        return 'Stage 3';
                    default:
                        return 'Stage 4';
                }
        }
    };
    AppComponent.prototype.sparkLineRender = function (cellNode, row, dataContext, colDef) {
        var _this = this;
        var vals = [
            dataContext['n2'], dataContext['n1']
        ], cell = $(cellNode);
        if (cell && cell.empty()) {
            cell.empty().sparkline(vals, {
                type: 'pie',
                sliceColors: ['white', 'green'],
                borderWidth: 1,
                offset: -90,
                tooltipFormatter: function (sparkline, options, fields) { return _this.tooltipFormatter(sparkline, options, fields); }
            });
        }
    };
    AppComponent.prototype.waitingFormatter = function (value) {
        return 'loading...';
    };
    AppComponent.prototype._render = function () {
        var _this = this;
        var alphabet = '', chartColumns = [{
                id: 'run',
                field: 'run',
                name: 'Run #',
                forceWidth: true
            }, {
                id: 'runTime',
                field: 'runTime',
                name: 'Time',
                forceWidth: true
            }, {
                id: 'stage',
                field: 'n1'
            }, {
                id: 'chart',
                name: 'Stage',
                sortable: false,
                formatter: function (value) { return _this.waitingFormatter(value); },
                rerenderOnResize: true,
                asyncPostRender: function (cellNode, row, dataContext, colDef) { return _this.sparkLineRender(cellNode, row, dataContext, colDef); }
            }], visibleChartColumns = [{
                id: 'run',
                field: 'run',
                name: 'Run #',
                forceWidth: true
            }, {
                id: 'runTime',
                field: 'runTime',
                name: 'Time',
                forceWidth: true
            }, {
                id: 'chart',
                name: 'Stage',
                sortable: false,
                formatter: function (value) { return _this.waitingFormatter(value); },
                rerenderOnResize: true,
                asyncPostRender: function (cellNode, row, dataContext, colDef) { return _this.sparkLineRender(cellNode, row, dataContext, colDef); }
            }], dataColumns = alphabet.split('').map(function (l, i) {
            return {
                id: l,
                field: l,
                name: String(l).toUpperCase(),
                forceWidth: true
            };
        }), columns = dataColumns.concat(chartColumns), visibleColumns = dataColumns.concat(visibleChartColumns), _columnFilters = {}, filter = function (item) {
            console.log(item);
            for (var columnId in _columnFilters) {
                if (columnId !== undefined && _columnFilters[columnId] !== '') {
                    if (columnId === 'chart') {
                        var val = String(item['n1']);
                        if (val !== _columnFilters['chart']) {
                            return false;
                        }
                    }
                    else {
                        var c = _this._grid.getColumns()[_this._grid.getColumnIndex(columnId)], val = String(item[c.field]), filterVal = String(_columnFilters[columnId]);
                        if (val.indexOf(filterVal) === -1) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }, options = {
            enableCellNavigation: true,
            showHeaderRow: true,
            explicitInitialization: true,
            headerRowHeight: 30,
            enableAsyncPostRender: true
        }, data = [];
        var date = new Date();
        var _loop_1 = function (i) {
            var item = {}, rndNum = Math.round(Math.random() * 4), phase = rndNum === 0 ? 1 : rndNum, phaseRemainder = 4 - phase;
            item['id'] = i;
            alphabet.split('').forEach(function (l, li) {
                if (li === 0) {
                    item[l] = i;
                }
                else {
                    item[l] = Math.round(Math.random() * 1000);
                }
            });
            date = moment(date).add(60, 'm').toDate();
            item['run'] = i + 1;
            item['runTime'] = moment(date).format('HH:mm');
            item['n1'] = phase;
            item['n2'] = phaseRemainder;
            data[i] = item;
        };
        for (var i = 0; i < 100; i++) {
            _loop_1(i);
        }
        this._dataView = new Slick.Data.DataView();
        this._dataView.setItems(data);
        this._dataView.setFilter(filter);
        this._grid = new Slick.Grid(this.table.nativeElement, this._dataView, columns, options);
        this._slickGridAutoSizeService.grid = this._grid;
        this._slickGridAutoSizeService.autoSizeColumns();
        this._dataView.onRowCountChanged.subscribe(function (e, args) {
            _this._grid.updateRowCount();
            _this._grid.render();
        });
        this._dataView.onRowsChanged.subscribe(function (e, args) {
            _this._grid.invalidateRows(args.rows);
            _this._grid.render();
        });
        $(this._grid.getHeaderRow()).delegate(':input', 'change keyup', function (e) {
            var columnId = $(e.currentTarget).data('columnId');
            if (columnId !== null) {
                _columnFilters[columnId] = $.trim($(e.currentTarget).val());
                _this._dataView.refresh();
            }
        });
        this._grid.onHeaderRowCellRendered.subscribe(function (e, args) {
            $(args.node).empty();
            $('<input type=\'text\'>')
                .data('columnId', args.column.id)
                .val(_columnFilters[args.column.id])
                .width('calc(92%)')
                .height('calc(.8em)')
                .appendTo(args.node);
        });
        this._grid.init();
        this._grid.invalidate();
        this._grid.render();
        this._grid.setColumns(visibleColumns);
        var mainGrid = $('.grid').eq(2), colFixedGrid = $('.grid').eq(1);
        colFixedGrid.find('.slick-header').height(mainGrid.find('.slick-header').height());
        colFixedGrid.find('.slick-header-columns').height(mainGrid.find('.slick-header-columns').outerHeight() * 3);
        colFixedGrid.find('.slick-header-column').outerHeight(colFixedGrid.find('.slick-header-columns').height());
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* ViewChild */])('table'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* ViewChild */])('container'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _b || Object)
], AppComponent.prototype, "container", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_1__slick_grid_auto_size_service__["a" /* SlickGridAutoSizeService */], __WEBPACK_IMPORTED_MODULE_2__slick_grid_resize_service__["a" /* SlickGridResizeService */]]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__slick_grid_auto_size_service__["a" /* SlickGridAutoSizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__slick_grid_auto_size_service__["a" /* SlickGridAutoSizeService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__slick_grid_resize_service__["a" /* SlickGridResizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__slick_grid_resize_service__["a" /* SlickGridResizeService */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
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
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/slick-grid-auto-size.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlickGridAutoSizeService; });
var SlickGridAutoSizeService = (function () {
    function SlickGridAutoSizeService() {
    }
    SlickGridAutoSizeService.prototype.autoSizeColumns = function () {
        if (this.grid && this.table) {
            var columns = this.grid.getColumns();
            this.resizeColumnsToFitText(columns);
            this.resizeColumnsToFillPanel(columns);
            this.grid.setColumns(columns);
            columns = null;
        }
    };
    SlickGridAutoSizeService.prototype.autoSizeColumnsForRow = function (row) {
        var _this = this;
        if (this.grid && row) {
            var columns = this.grid.getColumns();
            columns.forEach(function (column) {
                var value = row[column.field];
                if (column.formatter) {
                    value = column.formatter(null, null, value, column, row);
                }
                if (_this.table) {
                    var actualWidth = _this.getTextWidth(_this.table, value);
                    if (!column.forceWidth && column.width < actualWidth) {
                        column.width = column.forceWidth = actualWidth;
                    }
                }
                value = null;
            });
            this.grid.setColumns(columns);
            columns = null;
        }
    };
    SlickGridAutoSizeService.prototype.getTextWidth = function (table, value) {
        var dummyContainer = document.createElement('span');
        dummyContainer.className = 'slick-cell';
        dummyContainer.innerHTML = value;
        table.appendChild(dummyContainer);
        var width = dummyContainer.offsetWidth;
        table.removeChild(dummyContainer);
        dummyContainer = null;
        return width;
    };
    SlickGridAutoSizeService.prototype.resizeColumnsToFitText = function (columns) {
        var headers = this.table.getElementsByClassName('slick-column-name');
        Array.prototype.forEach.call(headers, function (header) {
            var column = _.find(columns, { name: header.textContent });
            if (column && !column.forceWidth) {
                column.width = header.offsetWidth + 30;
            }
            column = null;
        });
        headers = null;
    };
    SlickGridAutoSizeService.prototype.resizeColumnsToFillPanel = function (columns) {
        var totalWidth = this.calculateTotalWidth(columns);
        var panelWidth = this.table.offsetWidth - 18;
        if (totalWidth < panelWidth) {
            var addition_1 = (panelWidth - totalWidth) / columns.length;
            var padding_1 = 0;
            columns.forEach(function (column) {
                if (column.forceWidth) {
                    padding_1 += addition_1;
                }
                else {
                    column.width += addition_1 + padding_1;
                    padding_1 = 0;
                }
            });
        }
    };
    SlickGridAutoSizeService.prototype.calculateTotalWidth = function (columns) {
        var width = 0;
        columns.forEach(function (column) {
            width += column.width;
        });
        return width;
    };
    return SlickGridAutoSizeService;
}());

//# sourceMappingURL=slick-grid-auto-size.service.js.map

/***/ }),

/***/ "../../../../../src/app/slick-grid-resize.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlickGridResizeService; });
var SlickGridResizeService = (function () {
    function SlickGridResizeService() {
    }
    SlickGridResizeService.prototype.init = function (element, slickGridAutoSizeService) {
        var _this = this;
        this._resizeSensor = new ResizeSensor(element, function () {
            _this.resize(slickGridAutoSizeService);
        });
    };
    SlickGridResizeService.prototype.resize = function (slickGridAutoSizeService) {
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);
        }
        this._resizeTimeout = setTimeout(function () {
            if (slickGridAutoSizeService.grid) {
                slickGridAutoSizeService.grid.resizeCanvas();
                slickGridAutoSizeService.autoSizeColumns();
            }
        }, 100);
    };
    return SlickGridResizeService;
}());

//# sourceMappingURL=slick-grid-resize.service.js.map

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