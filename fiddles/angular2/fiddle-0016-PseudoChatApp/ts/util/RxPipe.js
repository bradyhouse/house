var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var pipes_1 = require("angular2/pipes");
function isObservable(obs) {
    return obs && typeof obs.subscribe === "function";
}
var RxStrategy = (function () {
    function RxStrategy() {
    }
    RxStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.subscribe(updateLatestValue, function (e) { throw e; });
    };
    RxStrategy.prototype.dispose = function (subscription) { subscription.dispose(); };
    RxStrategy.prototype.onDestroy = function (subscription) { subscription.dispose(); };
    return RxStrategy;
})();
var _rxStrategy = new RxStrategy();
var RxPipe = (function (_super) {
    __extends(RxPipe, _super);
    function RxPipe(_ref) {
        _super.call(this, _ref);
        this._ref = _ref;
    }
    RxPipe.prototype.supports = function (obs) { return isObservable(obs); };
    RxPipe.prototype._selectStrategy = function (obj) {
        return _rxStrategy;
    };
    RxPipe = __decorate([
        angular2_1.Pipe({ name: "rx" }), 
        __metadata('design:paramtypes', [Object])
    ], RxPipe);
    return RxPipe;
})(pipes_1.AsyncPipe);
exports.RxPipe = RxPipe;
exports.rxPipeInjectables = [
    angular2_1.bind(RxPipe).toValue(RxPipe)
];
