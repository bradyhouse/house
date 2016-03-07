var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var DataJsonApi_1 = require('./DataJsonApi');
var ZingChart_1 = require('./ZingChart');
var View = (function () {
    function View(dataJsonApi) {
        this.dataJsonApi = dataJsonApi;
    }
    View.prototype.ngOnInit = function () {
        var _this = this;
        this.dataJsonApi.request().subscribe(function (res) {
            _this.total = res.total;
            if (res.data) {
                _this.columnDefs = _this.parseColumns(res.data[0]);
                _this.configureChart(res.data);
                _this.dataJsonApi.request().subscribe(function (res) {
                    if (res) {
                        _this.rowData = res.data;
                    }
                });
            }
        });
    };
    View.prototype.configureChart = function (data) {
        var ages = [], checking = [], savings = [];
        data.map(function (item) {
            ages.push(item.age);
            checking.push(item.checking);
            savings.push(item.savings);
        });
        this.charts = [{
                id: 'chart-1',
                align: 'center',
                width: "100%",
                data: {
                    type: 'line',
                    "plotarea": {
                        "adjust-layout": true
                    },
                    padding: "40px",
                    "scale-x": {
                        "label": {
                            "text": "Checking vs. Savings",
                            "color": "#ffffff"
                        }
                    },
                    backgroundColor: "#333333",
                    tooltip: {
                        padding: 5,
                        offsetY: -5,
                        borderColor: "none",
                        placement: "node:top",
                        borderRadius: 5,
                        text: "%plot-text <br> Value : %v"
                    },
                    series: [{
                            values: savings
                        }, {
                            values: checking
                        }]
                },
                height: 300
            }];
    };
    View.prototype.parseColumns = function (rec) {
        var columns = [];
        if (rec) {
            Object.keys(rec).map(function (key) {
                columns.push({ headerName: key, field: key });
            });
        }
        return columns;
    };
    Object.defineProperty(View.prototype, "gridOptions", {
        get: function () {
            return {
                showToolPanel: true,
                enableFilter: true,
                enableColResize: true,
                rowSelection: 'single',
                enableSorting: true
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return window.innerHeight - 425;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "header", {
        get: function () {
            return metadata.fiddleHeader;
        },
        enumerable: true,
        configurable: true
    });
    View = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div class=\"enter-stage-south\">\n        <div class=\"col-lg-12\">\n            <div class=\"page-header\">\n                <h4 id=\"navbar\">&nbsp;{{header}}</h4>\n            </div>\n            <div class=\"row\">\n                <zingchart *ngFor=\"#chartObj of charts\" [chart]='chartObj'></zingchart>\n            </div>\n            <div class=\"row\">\n                <ag-grid-ng2 class=\"ag-dark\" style=\"height: {{height}}px; width: 100%;\"\n                    [gridOptions]=\"gridOptions\"\n                    [columnDefs]=\"columnDefs\"\n                    [rowData] = \"rowData\">\n                </ag-grid-ng2>\n            </div>\n        </div>\n    </div>",
            directives: [window.ag.grid.AgGridNg2, ZingChart_1.ZingChart],
            providers: [http_1.HTTP_PROVIDERS, DataJsonApi_1.DataJsonApi]
        })
    ], View);
    return View;
})();
exports.View = View;
//# sourceMappingURL=View.js.map