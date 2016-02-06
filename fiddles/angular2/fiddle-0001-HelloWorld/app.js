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
var HelloWorld = (function () {
    function HelloWorld() {
        this.names = ['bill clinton', 'bernie sanders', 'ran paul'];
    }
    HelloWorld = __decorate([
        angular2_1.Component({
            selector: 'hello-world'
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor],
            template: "\n    <ul>\n        <li *ng-for=\"#name of names\">Hello, <i>{{ name }}</i></li>\n    </ul>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], HelloWorld);
    return HelloWorld;
})();
angular2_1.bootstrap(HelloWorld);
