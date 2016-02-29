var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TreeNodeSearchPipe_1 = require('./TreeNodeSearchPipe');
var TreeNodeCheckedPipe_1 = require('./TreeNodeCheckedPipe');
var TreeView = (function () {
    function TreeView() {
    }
    TreeView = __decorate([
        core_1.Component({
            selector: 'treeview',
            pipes: [TreeNodeSearchPipe_1.TreeNodeSearchPipe, TreeNodeCheckedPipe_1.TreeNodeCheckedPipe],
            template: "\n        <ng-content select=\"[header]\"></ng-content>\n\n        <div [ngSwitch]=\"isChecked\">\n            <ul class=\"{{uiClassPrefix}}-view\" *ngSwitchWhen=\"true\">\n                <li *ngFor=\"#node of store | treeNodeChecked:node | treeNodeSearch:queryEl.value\">\n                    <span class=\"{{uiClassPrefix}}-nodeButton\" (click)=\"node.toggle()\">{{node.icon}}</span>\n                    <input type=\"checkbox\" [checked]=\"node.checked\" (click)=\"node.check()\" />\n                    {{ node.name }}\n                    <div *ngIf=\"node.expanded\">\n                        <treeview  [store]=\"node.nodes\" [uiClassPrefix]=\"uiClassPrefix\" [queryEl]=\"queryEl\"></treeview>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"{{uiClassPrefix}}-view\" *ngSwitchDefault>\n                <li *ngFor=\"#node of store | treeNodeSearch:queryEl.value\">\n                    <span class=\"{{uiClassPrefix}}-nodeButton\" (click)=\"node.toggle()\">{{node.icon}}</span>\n                    <input type=\"checkbox\" [checked]=\"node.checked\" (click)=\"node.check()\" />\n                    {{ node.name }}\n                    <div *ngIf=\"node.expanded\">\n                        <treeview [store]=\"node.nodes\" [uiClassPrefix]=\"uiClassPrefix\" [queryEl]=\"queryEl\"></treeview>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    ",
            directives: [TreeView],
            inputs: ['store', 'queryEl', 'isChecked', 'uiClassPrefix']
        })
    ], TreeView);
    return TreeView;
})();
exports.TreeView = TreeView;
//# sourceMappingURL=TreeView.js.map