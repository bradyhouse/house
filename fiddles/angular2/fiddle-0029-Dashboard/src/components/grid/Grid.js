var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var main_1 = require('ag-grid-ng2/main');
var GridDataService_1 = require('./store/GridDataService');
require('ag-grid-enterprise/main');
var GridController = (function () {
    function GridController(gridDataService) {
        this.gridDataService = gridDataService;
        this._rows = [];
        this._columns = [];
        this._gridOptions = {};
    }
    GridController.prototype.ngOnChanges = function () {
        this.configureRows();
    };
    GridController.prototype.configureRows = function () {
        var _this = this;
        this._rows = [];
        this.gridDataService.request(this.url).subscribe(function (res) {
            var rows = [];
            _this.filter.map(function (node) {
                var titleNodes = res.children.filter(function (child) {
                    return child.title == node;
                });
                if (titleNodes.length) {
                    titleNodes.map(function (titleNode) {
                        if (!titleNode.leaf) {
                            titleNode.children.map(function (child) {
                                rows.push(child);
                            });
                        }
                    }, rows);
                }
            }, rows);
            _this.configureColumns(rows[0]);
            _this._rows = rows;
        });
    };
    GridController.prototype.configureColumns = function (rec) {
        var columns = [];
        if (rec) {
            this._columns = [];
            Object.keys(rec).map(function (key) {
                if (key !== 'leaf' && key !== 'title') {
                    columns.push({ headerName: key, field: key });
                }
            });
            this._columns = columns;
        }
    };
    GridController.prototype.calculateRowCount = function () {
        if (this.gridOptions.api && this.rows.length) {
            var model = this.gridOptions.api.getModel();
            var totalRows = this.rowData.length;
            var processedRows = model.getRowCount();
            this._rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    };
    Object.defineProperty(GridController.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridController.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridController.prototype, "rowCount", {
        get: function () {
            return this._rowCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridController.prototype, "gridOptions", {
        get: function () {
            return this._gridOptions;
        },
        enumerable: true,
        configurable: true
    });
    GridController.prototype.onModelUpdated = function () {
        this.calculateRowCount();
    };
    GridController.prototype.onReady = function () {
        this.calculateRowCount();
    };
    GridController.prototype.onCellClicked = function ($event) {
    };
    GridController.prototype.onCellValueChanged = function ($event) {
    };
    GridController.prototype.onCellDoubleClicked = function ($event) {
    };
    GridController.prototype.onCellContextMenu = function ($event) {
    };
    GridController.prototype.onCellFocused = function ($event) {
    };
    GridController.prototype.onRowSelected = function ($event) {
    };
    GridController.prototype.onSelectionChanged = function () {
    };
    GridController.prototype.onBeforeFilterChanged = function () {
    };
    GridController.prototype.onAfterFilterChanged = function () {
    };
    GridController.prototype.onFilterModified = function () {
    };
    GridController.prototype.onBeforeSortChanged = function () {
    };
    GridController.prototype.onAfterSortChanged = function () {
    };
    GridController.prototype.onVirtualRowRemoved = function ($event) {
    };
    GridController.prototype.onRowClicked = function ($event) {
    };
    GridController.prototype.onQuickFilterChanged = function ($event) {
    };
    GridController.prototype.onColumnEvent = function ($event) {
    };
    GridController = __decorate([
        core_1.Component({
            selector: 'grid',
            moduleId: module.id,
            inputs: ['height', 'url', 'filter'],
            providers: [http_1.HTTP_PROVIDERS, GridDataService_1.GridDataService]
        }),
        core_1.View({
            templateUrl: 'grid.html',
            directives: [main_1.AgGridNg2]
        }), 
        __metadata('design:paramtypes', [GridDataService_1.GridDataService])
    ], GridController);
    return GridController;
})();
exports.GridController = GridController;
//# sourceMappingURL=Grid.js.map