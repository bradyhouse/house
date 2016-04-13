var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var verticalbar_chart_service_1 = require('./verticalbar-chart.service');
var verticalbar_1 = require('./verticalbar');
var VerticalbarChart = (function () {
    function VerticalbarChart(verticalBarService) {
        this.verticalBarService = verticalBarService;
        this.resize = new core_1.EventEmitter();
    }
    VerticalbarChart.prototype.ngOnInit = function () {
        var _this = this;
        this.verticalBarService.request(this.url).subscribe(function (res) {
            if (res.items) {
                _this._data = res.items;
            }
        });
    };
    VerticalbarChart.prototype.onWindowResize = function (event) {
        var srcElement = event ? event.srcElement : null, window = srcElement && srcElement.window ? srcElement.window : null, height = window ? window.innerHeight : null, width = window ? window.innerWidth : null;
        if (width && height) {
            this.chart.reconfigure(width, height);
            this.resize.emit(window);
        }
    };
    VerticalbarChart.prototype.onChartConfigured = function (chart) {
        this._chart = chart;
    };
    Object.defineProperty(VerticalbarChart.prototype, "chart", {
        get: function () {
            return this._chart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalbarChart.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalbarChart.prototype, "options", {
        get: function () {
            return {
                width: this.width,
                height: this.height
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], VerticalbarChart.prototype, "height");
    __decorate([
        core_1.Input()
    ], VerticalbarChart.prototype, "width");
    __decorate([
        core_1.Input()
    ], VerticalbarChart.prototype, "url");
    __decorate([
        core_1.Input()
    ], VerticalbarChart.prototype, "cls");
    __decorate([
        core_1.Output()
    ], VerticalbarChart.prototype, "resize");
    VerticalbarChart = __decorate([
        core_1.Component({
            selector: 'verticalbar-chart',
            template: "\n        <verticalbar\n            (window:resize)=\"onWindowResize($event)\"\n            (configured)=\"onChartConfigured($event)\"\n\n            [options]=\"options\"\n            [data]=\"data\">\n        </verticalbar>",
            directives: [verticalbar_1.Verticalbar],
            providers: [http_1.HTTP_PROVIDERS, verticalbar_chart_service_1.VerticalbarChartService]
        })
    ], VerticalbarChart);
    return VerticalbarChart;
})();
exports.VerticalbarChart = VerticalbarChart;
//# sourceMappingURL=verticalbar-chart.js.map