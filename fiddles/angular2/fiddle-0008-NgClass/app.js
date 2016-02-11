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
        this.isBordered = true;
        this.classList = ['blue', 'round'];
        this.toggleBorder();
    }
    Fiddle.prototype.toggleBorder = function () {
        this.isBordered = !this.isBordered;
        this.classesObj = {
            bordered: this.isBordered
        };
    };
    Fiddle.prototype.toggleClass = function (cssClass) {
        var pos = this.classList.indexOf(cssClass);
        if (pos > -1) {
            this.classList.splice(pos, 1);
        }
        else {
            this.classList.push(cssClass);
        }
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0008-NgClass'
        }),
        angular2_1.View({
            directives: [angular2_1.NgClass],
            template: "\n    <div [ng-class]=\"{bordered: false}\">This is never bordered</div>\n    <div [ng-class]=\"{bordered: true}\">This is always bordered</div>\n\n    <div [ng-class]=\"{bordered: isBordered}\">\n      This is a div with object literal. Border is {{ isBordered ? \"ON\" : \"OFF\" }}\n    </div>\n\n    <div [ng-class]=\"classesObj\">\n      This is a div with object var. Border is {{ classesObj.bordered ? \"ON\" : \"OFF\" }}\n    </div>\n\n    <button (click)=\"toggleBorder()\">Toggle</button>\n\n    <div class=\"selectors\">\n      <div>\n        <input type=\"checkbox\"\n               [checked]=\"classList.indexOf('blue') > -1\"\n               (click)=\"toggleClass('blue')\">\n        <span>Blue</span>\n      </div>\n\n      <div>\n        <input type=\"checkbox\"\n               [checked]=\"classList.indexOf('round') > -1\"\n               (click)=\"toggleClass('round')\">\n        <span>Round</span>\n      </div>\n    </div>\n\n    <div class=\"base\" [ng-class]=\"['blue', 'round']\">\n      This will always have a blue background and\n      round corners\n    </div>\n\n    <div class=\"base\" [ng-class]=\"classList\">\n      This is {{ classList.indexOf('blue') > -1 ? \"\" : \"NOT\" }} blue\n      and {{ classList.indexOf('round') > -1 ? \"\" : \"NOT\" }} round\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
