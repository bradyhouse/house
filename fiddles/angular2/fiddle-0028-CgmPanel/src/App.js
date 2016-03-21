var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("angular2/bundles/angular2-polyfills");
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var browser_1 = require("angular2/platform/browser");
require('rxjs/add/operator/map');
require('rxjs/add/operator/scan');
require('rxjs/add/operator/share');
var JsonDataService_1 = require("./store/JsonDataService");
var JsonDataStore_1 = require("./store/JsonDataStore");
var Chart_1 = require("./component/chart/Chart");
var App = (function () {
    function App(jsonDataStore) {
        this.jsonDataStore = jsonDataStore;
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
                uiCls: "chart"
            };
        },
        enumerable: true,
        configurable: true
    });
    App = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [JsonDataStore_1.JsonDataStore, JsonDataService_1.JsonDataService, http_1.HTTP_PROVIDERS]
        }),
        core_1.View({
            template: "\n        <div>\n            <chart [uiCls]=\"chartConfig.uiCls\" [store]=\"jsonDataStore\" [nodes]=\"selectedNodes\" [height]=\"chartHeight\"></chart>\n        </div>\n    ",
            directives: [Chart_1.Chart]
        }), 
        __metadata('design:paramtypes', [JsonDataStore_1.JsonDataStore])
    ], App);
    return App;
})();
exports.App = App;
browser_1.bootstrap(App);
//# sourceMappingURL=App.js.map