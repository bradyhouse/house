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
    function Fiddle(fb) {
        this.heading = "Enter a different value";
        this.myForm = fb.group({
            "heading": [this.heading]
        });
    }
    Fiddle.prototype.onSubmit = function (form) {
        console.log('you entered: ', form);
        this.heading = form.heading;
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0012-FormBuilder'
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES],
            template: "\n  <div>\n    <h2>Form Builder</h2>\n    <hr/>\n    {{heading}}\n    <hr/>\n    <form [ng-form-model]=\"myForm\"\n          (submit)=\"onSubmit(myForm.value)\">\n\n      <div class=\"form-group\">\n        <label for=\"headingInput\">Heading:</label>\n        <input type=\"text\"\n               class=\"form-control\"\n               id=\"headingInput\"\n               placeholder=\"Heading\"\n               [ng-form-control]=\"myForm.controls['heading']\">\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [angular2_2.FormBuilder])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
