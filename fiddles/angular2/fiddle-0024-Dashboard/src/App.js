var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Content_1 = require('./component/Content');
var Header_1 = require('./component/Header');
var App = (function () {
    function App() {
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <header>\n        </header>\n        <content>\n            <div center>\n            </div>\n            <div west>\n                <code>NAVIGATION</code>\n            </div>\n        </content>\n  ",
            directives: [Header_1.Header, Content_1.ContentController]
        })
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=App.js.map