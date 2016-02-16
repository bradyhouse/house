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
var angular2_3 = require('angular2/angular2');
var Fiddle = (function () {
    function Fiddle(fb) {
        this.myForm = fb.group({
            "productName": ["", angular2_3.Validators.required]
        });
    }
    Fiddle.prototype.onSubmit = function (value) {
        console.log('you submitted value: ', value);
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0015-NgModel'
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES, angular2_2.NgIf],
            template: "\n  <div>\n    <h2>Demo Form: with ng-model</h2>\n    <form [ng-form-model]=\"myForm\"\n          (submit)=\"onSubmit(myForm.value)\">\n\n      <div class=\"form-group\">\n        <label for=\"productNameInput\">Product Name</label>\n        <input type=\"text\"\n               class=\"form-control\"\n               id=\"productNameInput\"\n               placeholder=\"Product Name\"\n               [ng-form-control]=\"myForm.find('productName')\"\n               [(ng-model)]=\"productName\">\n      </div>\n\n      <div *ng-if=\"!myForm.valid\"\n        class=\"bg-warning\">Form is invalid</div>\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n\n    <div>\n      The product name is: {{productName}}\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [angular2_2.FormBuilder])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
