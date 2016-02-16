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
function skuValidator(control) {
    if (!control.value.match(/^123/)) {
        return { invalidSku: true };
    }
}
var Fiddle = (function () {
    function Fiddle(fb) {
        this.myForm = fb.group({
            "sku": ["", angular2_3.Validators.compose([
                    angular2_3.Validators.required, skuValidator])]
        });
        this.sku = this.myForm.controls['sku'];
    }
    Fiddle.prototype.onSubmit = function (value) {
        console.log('you submitted value: ', value);
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0014-CustomFormValidation'
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES, angular2_2.NgIf],
            template: "\n  <div>\n    <h2>Demo Form: with custom validations</h2>\n    <form [ng-form-model]=\"myForm\"\n          (submit)=\"onSubmit(myForm.value)\">\n\n      <div class=\"form-group\"\n          [class.has-error]=\"!sku.valid && sku.touched\">\n        <label for=\"skuInput\">SKU</label>\n        <input type=\"text\"\n               class=\"form-control\"\n               id=\"skuInput\"\n               placeholder=\"SKU\"\n               [ng-form-control]=\"sku\">\n         <div *ng-if=\"!sku.valid\"\n           class=\"bg-warning\">SKU is invalid</div>\n         <div *ng-if=\"sku.hasError('required')\"\n           class=\"bg-warning\">SKU is required</div>\n         <div *ng-if=\"sku.hasError('invalidSku')\"\n           class=\"bg-warning\">SKU must begin with <tt>123</tt></div>\n      </div>\n\n      <div *ng-if=\"!myForm.valid\"\n        class=\"bg-warning\">Form is invalid</div>\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [angular2_2.FormBuilder])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
