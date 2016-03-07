var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Tree_1 = require('./component/Tree');
var meta = require('./meta');
var AppController = (function () {
    function AppController() {
    }
    Object.defineProperty(AppController.prototype, "treeUrl", {
        get: function () {
            return meta.urls.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppController.prototype, "treeUiClassPrefix", {
        get: function () {
            return "tree";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppController.prototype, "treeHeight", {
        get: function () {
            return window.innerHeight - 100;
        },
        enumerable: true,
        configurable: true
    });
    AppController = __decorate([
        core_1.Component({
            selector: 'app'
        }),
        core_1.View({
            template: "\n        <div header></div>\n        <tree class=\"tree\" [uiClassPrefix]=\"treeUiClassPrefix\" [height]=\"treeHeight\" [url]=\"treeUrl\"></tree>\n    ",
            directives: [Tree_1.TreeController]
        })
    ], AppController);
    return AppController;
})();
exports.AppController = AppController;
//# sourceMappingURL=App.js.map