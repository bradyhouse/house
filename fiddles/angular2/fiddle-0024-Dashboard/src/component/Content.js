var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Chart_1 = require('./chart/Chart');
var Tree_1 = require('./tree/Tree');
var DataJsonApi_1 = require('./DataJsonApi');
var meta = require('../meta');
var ContentController = (function () {
    function ContentController(dataJsonApi) {
        this.dataJsonApi = dataJsonApi;
        this._selectedNodes = [];
        this.chartData = [];
        this.treeNodes = [];
        this.treeUrl = meta.urls.data;
        this.treeClass = "tree";
        this.rowData = [];
        this.columnDefs = [];
    }
    ContentController.prototype.configureGrid = function () {
        var _this = this;
        this.rowData = [];
        this.columnDefs = [];
        this.dataJsonApi.request().subscribe(function (res) {
            var accounts = [];
            _this.selectedNodes.map(function (node) {
                var titleNodes = res.children.filter(function (child) {
                    return child.title == node;
                });
                if (titleNodes.length) {
                    titleNodes.map(function (titleNode) {
                        if (!titleNode.leaf) {
                            titleNode.children.map(function (child) {
                                accounts.push(child);
                            });
                        }
                    }, accounts);
                }
            }, accounts);
            _this.columnDefs = _this.parseColumns(accounts[0]);
            _this.rowData = accounts;
        });
    };
    ContentController.prototype.parseColumns = function (rec) {
        var columns = [];
        if (rec) {
            Object.keys(rec).map(function (key) {
                if (key !== 'leaf' && key !== 'title') {
                    columns.push({ headerName: key, field: key });
                }
            });
        }
        return columns;
    };
    ContentController.prototype.onTreeNodeCheckChange = function (event) {
        var me = this;
        me._selectedNodes = [];
        event.nodes.map(function (node) {
            me._selectedNodes.push(node);
        }, me);
        me.configureGrid();
    };
    Object.defineProperty(ContentController.prototype, "selectedNodes", {
        get: function () {
            return this._selectedNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentController.prototype, "gridOptions", {
        get: function () {
            return {
                enableFilter: true,
                enableColResize: true,
                rowSelection: 'single',
                enableSorting: true
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentController.prototype, "height", {
        get: function () {
            return window.innerHeight - 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentController.prototype, "gridHeight", {
        get: function () {
            return this.rowData.length > 0 ? Math.floor(this.height / 2) - 4 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentController.prototype, "chartHeight", {
        get: function () {
            return this.rowData.length > 0 ? Math.floor(this.height / 2) - 4 : this.height - 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentController.prototype, "treeHeight", {
        get: function () {
            return this.height - 50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentController.prototype, "chartConfig", {
        get: function () {
            return {
                url: meta.urls.data,
                uiCls: "chart"
            };
        },
        enumerable: true,
        configurable: true
    });
    ContentController = __decorate([
        core_1.Component({
            selector: 'content',
            providers: [http_1.HTTP_PROVIDERS, DataJsonApi_1.DataJsonApi]
        }),
        core_1.View({
            template: "\n     <div class=\"wrapper\" style=\"height: {{height}}px;\">\n        <tree [uiClassPrefix]=\"treeClass\" class=\"tree\" (nodeCheckChange)=\"onTreeNodeCheckChange($event)\" [height]=\"treeHeight\" [url]=\"treeUrl\"></tree>\n        <div class=\"main\">\n                <chart [uiCls]=\"chartConfig.uiCls\" [nodes]=\"selectedNodes\" [height]=\"chartHeight\" [url]=\"chartConfig.url\"></chart>\n                <ag-grid-ng2 class=\"ag-fresh\"\n                    style=\"width: 100%; height: {{gridHeight}}px; color: black;\"\n                    [gridOptions]=\"gridOptions\"\n                    [columnDefs]=\"columnDefs\"\n                    [rowData] = \"rowData\">\n                </ag-grid-ng2>\n        </div>\n    </div>",
            directives: [window.ag.grid.AgGridNg2, Chart_1.Chart, Tree_1.TreeController]
        })
    ], ContentController);
    return ContentController;
})();
exports.ContentController = ContentController;
//# sourceMappingURL=Content.js.map