/// <reference path="typings/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var angular2_1 = require("angular2/angular2");
var Fiddle = (function () {
    function Fiddle() {
        this.value = 1;
    }
    Fiddle.prototype.increase = function () {
        this.value++;
    };
    Fiddle.prototype.decrease = function () {
        this.value--;
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0004-OutputBinding'
        }),
        angular2_1.View({
            template: "\n    {{value}}\n    <hr />\n    <button (click)=\"increase()\">Increase</button>\n    <button (click)=\"decrease()\">Decrease</button>"
        })
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
//# sourceMappingURL=app.js.map