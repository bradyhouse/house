var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var verticalbar_chart_1 = require('./verticalbar/verticalbar-chart');
var meta = require('./meta');
var App = (function () {
    function App() {
        this._height = window.innerHeight;
        this._width = window.innerWidth;
    }
    Object.defineProperty(App.prototype, "chartHeight", {
        get: function () {
            return this._height - 50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "chartWidth", {
        get: function () {
            return this._width - 50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "chartUrl", {
        get: function () {
            return meta.urls.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "chartCls", {
        get: function () {
            return "chart";
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.onResize = function (window) {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <div style=\"width: 500px;\">\n            <verticalbar-chart [cls]=\"chartCls\"\n                [height]=\"chartHeight\"\n                [width]=\"chartWidth\"\n                (resize)=\"onResize($event)\"\n                [url]=\"chartUrl\"></verticalbar-chart>\n        </div>\n    ",
            directives: [verticalbar_chart_1.VerticalbarChart]
        })
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map