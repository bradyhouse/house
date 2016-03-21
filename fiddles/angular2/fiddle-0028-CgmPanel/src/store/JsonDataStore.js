var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var JsonDataService_1 = require("./JsonDataService");
var RawData_1 = require("../model/RawData");
var immutable_1 = require('immutable');
var asObservable_1 = require("./asObservable");
var Rx_1 = require("rxjs/Rx");
var JsonDataStore = (function () {
    function JsonDataStore(jsonDataService) {
        this.jsonDataService = jsonDataService;
        this._data = new Rx_1.BehaviorSubject(immutable_1.List([]));
        this.loadRawData();
    }
    Object.defineProperty(JsonDataStore.prototype, "data", {
        get: function () {
            return asObservable_1.asObservable(this._data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonDataStore.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    JsonDataStore.prototype.loadRawData = function () {
        var _this = this;
        this.jsonDataService.request("data.json")
            .subscribe(function (res) {
            var nodes = res.json().map(function (node) {
                return new RawData_1.RawData({ title: node.title, children: node.children });
            });
            _this._data.next(immutable_1.List(nodes));
        }, function (err) { return console.log("Error retrieving data"); });
    };
    JsonDataStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [JsonDataService_1.JsonDataService])
    ], JsonDataStore);
    return JsonDataStore;
})();
exports.JsonDataStore = JsonDataStore;
//# sourceMappingURL=JsonDataStore.js.map