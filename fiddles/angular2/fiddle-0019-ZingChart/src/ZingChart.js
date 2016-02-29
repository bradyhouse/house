var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Chart = (function () {
    function Chart(config) {
        this.id = config['id'];
        this.data = config['data'];
        this.height = config['height'] || 300;
        this.width = config['width'] || 600;
    }
    return Chart;
})();
var ZingChart = (function () {
    function ZingChart(zone) {
        this.zone = zone;
    }
    ZingChart.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            zingchart.render({
                id: _this.chart['id'],
                data: _this.chart['data'],
                width: _this.chart['width'],
                height: _this.chart['height']
            });
        });
    };
    ZingChart.prototype.ngOnDestroy = function () {
        zingchart.exec(this.chart['id'], 'destroy');
    };
    ZingChart = __decorate([
        core_1.Component({
            selector: 'zingchart',
            inputs: ['chart'],
            template: "\n   <div id='{{chart.id}}'></div>\n  "
        })
    ], ZingChart);
    return ZingChart;
})();
exports.ZingChart = ZingChart;
//# sourceMappingURL=ZingChart.js.map