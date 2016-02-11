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
        this.choice = 1;
    }
    Fiddle.prototype.nextChoice = function () {
        this.choice += 1;
        if (this.choice > 5) {
            this.choice = 1;
        }
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0007-NgSwitch'
        }),
        angular2_1.View({
            directives: [angular2_1.NgSwitch, angular2_1.NgSwitchWhen, angular2_1.NgSwitchDefault],
            template: "\n    <div>Current choice is: {{ choice }}</div>\n\n    <ul [ng-switch]=\"choice\">\n      <li *ng-switch-when=\"1\">First choice</li>\n      <li *ng-switch-when=\"2\">Second choice</li>\n      <li *ng-switch-when=\"3\">Third choice</li>\n      <li *ng-switch-when=\"4\">Fourth choice</li>\n      <li *ng-switch-when=\"2\">Second choice, again</li>\n      <li *ng-switch-default>Default choice</li>\n    </ul>\n\n    <div style=\"margin-top: 20px;\">\n      <button (click)=\"nextChoice()\">Next choice</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
