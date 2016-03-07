var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var ChartDataService_1 = require('./ChartDataService');
var Nvd3Component_1 = require('./Nvd3Component');
var Chart = (function () {
    function Chart(chartDataService) {
        this.chartDataService = chartDataService;
        this.data = [];
    }
    Chart.prototype.ngOnChanges = function () {
        var _this = this;
        var me = this;
        if (me.nodes.length) {
            me.chartDataService.request(this.url).subscribe(function (res) {
                var store = [];
                if (res.children && _this.nodes.length) {
                    _this.nodes.map(function (node) {
                        var titleNodes = res.children.filter(function (child) {
                            return child.title == node;
                        });
                        if (titleNodes.length) {
                            titleNodes.map(function (titleNode) {
                                if (!titleNode.leaf) {
                                    titleNode.children.map(function (child) {
                                        store.push(child);
                                    });
                                }
                            }, store);
                        }
                    }, store);
                }
                window.setTimeout(function () {
                    me.bind(store);
                }, 200);
            });
        }
        else {
            this.data.shift();
        }
    };
    Chart.prototype.bind = function (data) {
        var root = {
            key: this.nodes,
            values: []
        };
        data.sort(function (a, b) {
            return parseFloat(a.checking) - parseFloat(b.checking);
        });
        data.map(function (item) {
            var namePieces = item.name.split(' '), lastName = namePieces && namePieces.length > 1 ? namePieces[1].toUpperCase() : item.name.toUpperCase();
            root.values.push({
                "label": lastName,
                "color": parseFloat(item.checking) < 0 ? "red" : "green",
                "value": item.checking
            });
        }, root);
        this.data.shift();
        this.data.push(root);
    };
    Object.defineProperty(Chart.prototype, "message", {
        get: function () {
            return this.nodes.length ? "loading" : "Select an Account";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "chartOptions", {
        get: function () {
            return {
                chart: {
                    id: 'chart1',
                    type: 'discreteBarChart',
                    margin: {
                        top: 10,
                        right: 10,
                        bottom: 70,
                        left: 55
                    },
                    x: function (d) {
                        return d.label;
                    },
                    y: function (d) {
                        return d.value;
                    },
                    showValues: false,
                    valueFormat: function (d) {
                        return d3.format(',.4f')(d);
                    },
                    duration: 30,
                    rotateLabels: 45,
                    showValues: false,
                    showLegend: true,
                    staggerLabels: true,
                    noData: this.message,
                    xAxis: {
                        axisLabel: 'Account'
                    },
                    yAxis: {
                        axisLabel: 'Checking Balance'
                    }
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            template: "\n        <div class=\"{{uiCls}}-scrollbox\" style=\"width: 100%; height: {{height}}px;\">\n            <nvd3-component [options]=\"chartOptions\" [data]=\"data\"></nvd3-component>\n        </div>\n    ",
            inputs: ['uiCls', 'height', 'nodes', 'url'],
            directives: [Nvd3Component_1.Nvd3Component],
            providers: [http_1.HTTP_PROVIDERS, ChartDataService_1.ChartDataService]
        })
    ], Chart);
    return Chart;
})();
exports.Chart = Chart;
//# sourceMappingURL=Chart.js.map