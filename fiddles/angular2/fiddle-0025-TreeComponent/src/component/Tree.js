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
var Tree = (function () {
    function Tree(service) {
        this.service = service;
        this.query = "";
        this.isChecked = false;
        this.root = new TreeNode_1.TreeNode("root", [], null);
    }
    Tree.prototype.ngOnInit = function () {
        var _this = this;
        this.service.request(this.url).subscribe(function (res) {
            if (res.children) {
                res.children.map(function (parentNode) {
                    var rootChildNode = new TreeNode_1.TreeNode(parentNode.title, [], this.root);
                    if (!parentNode.leaf) {
                        parentNode.children.map(function (child) {
                            rootChildNode.nodes.push(new TreeNode_1.TreeNode(child.title, [], rootChildNode));
                        });
                        rootChildNode.nodes.sort(function (a, b) {
                            return a.name < b.name;
                        });
                    }
                    this.root.nodes.push(rootChildNode);
                }, _this);
            }
        });
    };
    Tree.prototype.onResetClick = function () {
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
    Tree.prototype.onShowSelectedClick = function () {
        this.isChecked = !this.isChecked;
    };
    Tree = __decorate([
        core_1.Component({
            selector: 'tree',
            template: "\n        <table class=\"{{uiClassPrefix}}-table\">\n            <tr>\n                <td nowrap=\"true\" class=\"{{uiClassPrefix}}-toolbar\">\n                    <input class=\"{{uiClassPrefix}}-search-field\" id=\"queryEl\" type=\"text\" placeholder=\"Search\" #queryEl (keyup)=\"0\">&nbsp;\n                    <button class=\"{{uiClassPrefix}}-btn btn btn-default btn-xs\" (click)=\"onShowSelectedClick()\">\n                        <span class=\"fa fa-list-ul\" title=\"Show selected\"></span>\n                    </button>&nbsp;\n                    <button class=\"{{uiClassPrefix}}-btn btn btn-default btn-xs\" (click)=\"onResetClick()\">\n                        <span class=\"fa fa-times\" title=\"Unselect all\"></span>\n                    </button>\n                </td>\n            </tr>\n            <tr>\n                <td>\n                    <div id=\"scrollbox\" class=\"{{uiClassPrefix}}-scrollbox\" style=\" height: {{height}}px;\">\n                    <treeview [store]=\"root.nodes\" [uiClassPrefix]=\"uiClassPrefix\" [queryEl]=\"queryEl\" [isChecked]=\"isChecked\"></treeview>\n                    </div>\n                </td>\n            </tr>\n        </table>\n\n  ",
            directives: [TreeView_1.TreeView],
            inputs: ['height', 'uiClassPrefix', 'url'],
            providers: [http_1.HTTP_PROVIDERS, TreeDataService_1.TreeDataService]
        })
    ], Tree);
    return Tree;
})();
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map