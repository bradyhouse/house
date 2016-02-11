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
var angular2_2 = require("angular2/angular2");
var Fiddle = (function () {
    function Fiddle() {
    }
    Fiddle.prototype.onSubmit = function (value) {
        console.log('you submitted value: ', value);
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0010-SimpleForm'
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES],
            template: "\n  <div>\n    <h2>Demo Form: Sku</h2>\n    <form #f=\"form\"\n          (submit)=\"onSubmit(f.value)\">\n\n      <div class=\"form-group\">\n        <label for=\"skuInput\">SKU</label>\n        <input type=\"text\"\n               class=\"form-control\"\n               id=\"skuInput\"\n               placeholder=\"SKU\"\n               ng-control=\"sku\">\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
