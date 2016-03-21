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
var Grid_1 = require('./components/grid/Grid');
var App = (function () {
    function App() {
        this._selectedNodes = ['GREEN_KIRBY'];
        this._url = "data/data.json";
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
    Object.defineProperty(App.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    App = __decorate([
        core_1.Component({
            selector: 'app',
            moduleId: module.id
        }),
        core_1.View({
            template: "\n        <grid [height]=\"height\" [url]=\"url\" [filter]=\"selectedNodes\"></grid>\n    ",
            directives: [Grid_1.GridController]
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=fiddle-grid.js.map