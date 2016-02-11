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
var Fiddle = (function () {
    function Fiddle() {
        this.content = 'Some text';
    }
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0011-NgNonBindable'
        }),
        angular2_1.View({
            template: "\n  <div>\n    {{ content }}\n    <span ng-non-bindable>\n      <- This is what {{ content }} rendered\n    </span>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
