var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var TreeView_1 = require('./TreeView');
var TreeNode_1 = require('./TreeNode');
var TreeDataService_1 = require('./TreeDataService');
var TreeController = (function () {
    function TreeController(treeDataService) {
        this.treeDataService = treeDataService;
        this.query = "";
        this.isChecked = false;
        this.nodeCheckChange = new core_1.EventEmitter();
        this.root = new TreeNode_1.TreeNode("root", [], null);
    }
    TreeController.prototype.ngOnInit = function () {
        var _this = this;
        this.treeDataService.request(this.url).subscribe(function (res) {
            if (res.children) {
                res.children.map(function (parentNode) {
                    var rootChildNode = new TreeNode_1.TreeNode(parentNode.title, [], this.root);
                    if (!parentNode.leaf) {
                        parentNode.children.map(function (child) {
                            rootChildNode.nodes.push(new TreeNode_1.TreeNode(child.name.toUpperCase(), [], rootChildNode));
                        });
                        rootChildNode.nodes.sort(function (a, b) {
                            return parseFloat(a.checking) - parseFloat(b.checking);
                        });
                    }
                    this.root.nodes.push(rootChildNode);
                }, _this);
            }
        });
    };
    TreeController.prototype.onResetClick = function () {
        this.isChecked = false;
        this.root.nodes.map(function (node) {
            node.expanded = false;
            node.checked = false;
            node.nodes.map(function (node) {
                node.expanded = false;
                node.checked = false;
            });
        });
        document.getElementById('queryEl').value = "";
    };
    TreeController.prototype.onShowSelectedClick = function () {
        this.isChecked = !this.isChecked;
    };
    TreeController.prototype.changed = function () {
        this.nodeCheckChange.next({
            nodes: this.root.selectedNodes
        });
    };
    TreeController = __decorate([
        core_1.Component({
            selector: 'tree',
            inputs: ['height', 'uiClassPrefix', 'url'],
            providers: [http_1.HTTP_PROVIDERS, TreeDataService_1.TreeDataService],
            events: ['nodeCheckChange']
        }),
        core_1.View({
            template: "\n        <table class=\"{{uiClassPrefix}}-table\">\n            <tr>\n                <td nowrap=\"true\" class=\"{{uiClassPrefix}}-toolbar\">\n                    <input class=\"{{uiClassPrefix}}-search-field\" id=\"queryEl\" type=\"text\" placeholder=\"Search\" #queryEl (keyup)=\"0\">&nbsp;\n                    <button class=\"{{uiClassPrefix}}-btn btn btn-default btn-xs\" (click)=\"onShowSelectedClick()\">\n                        <span class=\"fa fa-list-ul\" title=\"Show selected\"></span>\n                    </button>&nbsp;\n                    <button class=\"{{uiClassPrefix}}-btn btn btn-default btn-xs\" (click)=\"onResetClick()\">\n                        <span class=\"fa fa-times\" title=\"Unselect all\"></span>\n                    </button>\n                </td>\n            </tr>\n            <tr>\n                <td>\n                    <div class=\"{{uiClassPrefix}}-scrollbox\" style=\" height: {{height}}px;\">\n                    <treeview (change)=\"changed()\" [store]=\"root.nodes\" [uiClassPrefix]=\"uiClassPrefix\" [queryEl]=\"queryEl\" [isChecked]=\"isChecked\"></treeview>\n                    </div>\n                </td>\n            </tr>\n        </table>\n  ",
            directives: [TreeView_1.TreeViewController]
        })
    ], TreeController);
    return TreeController;
})();
exports.TreeController = TreeController;
//# sourceMappingURL=Tree.js.map