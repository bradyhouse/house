var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Fiddle = (function () {
    function Fiddle() {
    }
    Fiddle = __decorate([
        core_1.Component({
            selector: 'fiddle'
        }),
        core_1.View({
            template: "\n     <div style=\"text-align: center;\">\n        <div head>\n          <svg id=\"logo1\">\n            <path\n                id=\"logo\"\n                stroke=\"black\"\n                stroke-width=\"1\"\n                d=\"M 256 116 203 28 100 34 57 127 119 209 221 193 254 95 183 20 84 48 62 148 140 215 236 177 247 75 162 17 71 65 71 168 162 216 247 158 236 56 140 18 62 85 84 185 183 213 254 138 221 40 119 24 57 106 100 199 203 205 z\"\n                fill=\"lime\">\n            </path>\n          </svg>\n          <ng-content></ng-content>\n        </div>\n        <div menu>\n            <ng-content select=\"[menu]\"></ng-content>\n        </div>\n        <div body>\n            <ng-content select=\"[body]\"></ng-content>\n        </div>\n        <div footer>\n          \u00A9 copyright\n        </div>\n      </div>"
        })
    ], Fiddle);
    return Fiddle;
})();
exports.Fiddle = Fiddle;
//# sourceMappingURL=Fiddle.js.map