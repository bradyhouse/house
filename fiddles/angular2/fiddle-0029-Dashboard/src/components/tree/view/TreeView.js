var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var TreeNodeSearchPipe_1 = require('./pipe/TreeNodeSearchPipe');
var TreeNodeCheckedPipe_1 = require('./pipe/TreeNodeCheckedPipe');
var TreeViewController = (function () {
    function TreeViewController() {
        this.change = new core_1.EventEmitter();
    }
    TreeViewController.prototype.changed = function () {
        this.change.next();
    };
    TreeViewController = __decorate([
        core_1.Component({
            selector: 'treeview',
            inputs: ['store', 'queryEl', 'isChecked', 'uiClassPrefix']
        }),
        core_1.View({
            templateUrl: 'components/tree/view/treeview.html',
            styleUrls: ['components/tree/view/treeview.css'],
            pipes: [TreeNodeSearchPipe_1.TreeNodeSearchPipe, TreeNodeCheckedPipe_1.TreeNodeCheckedPipe],
            directives: [TreeViewController]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeViewController);
    return TreeViewController;
})();
exports.TreeViewController = TreeViewController;
//# sourceMappingURL=TreeView.js.map