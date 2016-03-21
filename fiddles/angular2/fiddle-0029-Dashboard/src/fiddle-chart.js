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
var Chart_1 = require('./components/chart/Chart');
var App = (function () {
    function App() {
        this._selectedNodes = ['GREEN_KIRBY'];
    }
    Object.defineProperty(App.prototype, "height", {
        get: function () {
            return window.innerHeight - 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "selectedNodes", {
        get: function () {
            return this._selectedNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "chartHeight", {
        get: function () {
            return this.height - 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "chartConfig", {
        get: function () {
            return {
                uiCls: "chart",
                url: "data/data.json"
            };
        },
        enumerable: true,
        configurable: true
    });
    App = __decorate([
        core_1.Component({
            selector: 'app',
            moduleId: module.id,
            template: "\n        <chart [uiCls]=\"chartConfig.uiCls\" [nodes]=\"selectedNodes\" [height]=\"chartHeight\" [url]=\"chartConfig.url\"></chart>\n    ",
            directives: [Chart_1.Chart],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=fiddle-chart.js.map