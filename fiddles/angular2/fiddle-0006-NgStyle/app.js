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
        this.fontSize = 16;
        this.color = "blue";
        this.style = {
            'background-color': '#ccc',
            'border-radius': '50px',
            'height': '30px',
            'width': '30px',
        };
    }
    Fiddle.prototype.apply = function (color, fontSize) {
        this.color = color;
        this.fontSize = fontSize;
    };
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0006-NgStyle'
        }),
        angular2_1.View({
            directives: [angular2_1.NgStyle],
            template: "\n    <div [style.background-color]=\"'yellow'\">\n      Uses fixed yellow background\n    </div>\n\n    <div [ng-style]=\"{color: 'white', 'background-color': 'blue'}\">\n      Uses fixed white text on blue background\n    </div>\n\n    <div>\n      <span [ng-style]=\"{color: 'red'}\" [style.font-size.px]=\"fontSize\">red text</span>\n    </div>\n\n    <div [ng-style]=\"style\"></div>\n\n    <div>\n      <span [ng-style]=\"{color: color}\">{{ color }} text</span>\n    </div>\n\n    <div [style.background-color]=\"color\" style=\"color: white;\">{{ color }} background</div>\n\n    <div><input type=\"text\" name=\"color\" value=\"{{color}}\" #colorinput></div>\n    <div><input type=\"text\" name=\"fontSize\" value=\"{{fontSize}}\" #fontinput></div>\n\n    <button (click)=\"apply(colorinput.value, fontinput.value)\">Apply settings</button>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
