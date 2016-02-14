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
            "heading": ["Enter a value", angular2_3.Validators.required]
        });
        this.heading = this.myForm.controls['heading'];
    }
    Fiddle.prototype.onSubmit = function (form) {
        console.log('you entered: ', form);
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0013-FormValidator'
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES, angular2_2.NgIf],
            template: "\n  <div>\n    <h4>Angular2: Form Validators</h4>\n    <div *ng-if=\"heading.value!='Enter a value' && heading.valid\">\n        <hr/>\n        You entered: {{heading.value}}\n        <hr/>\n    </div>\n\n    <form [ng-form-model]=\"myForm\" (submit)=\"onSubmit(myForm.value)\">\n\n      <div class=\"form-group\">\n\n        <label for=\"headingInput\">Form Input:</label>\n\n        <input type=\"text\"\n               class=\"form-control\"\n               id=\"headingInput\"\n               placeholder=\"Heading\"\n               [ng-form-control]=\"myForm.controls['heading']\">\n\n        <div *ng-if=\"heading.hasError('required')\" class=\"bg-warning\">Enter something!</div>\n\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n\n    </form>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [angular2_2.FormBuilder])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
