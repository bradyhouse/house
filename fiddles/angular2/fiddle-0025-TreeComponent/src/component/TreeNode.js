var TreeNode = (function () {
    function TreeNode(name, nodes, parent) {
        this.name = name;
        this.nodes = nodes;
        this.parent = parent;
        this.expanded = false;
        this.checked = false;
    }
    TreeNode.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    TreeNode.prototype.containsChecked = function () {
        checkedNodes: TreeNode;
        if (this.nodes && this.nodes.length) {
            checkedNodes = this.nodes.filter(function (node) {
                return node.checked;
            });
        }
        return checkedNodes.length > 0;
    };
    TreeNode.prototype.containsName = function (name) {
        var query = name;
        matchingNodes: TreeNode;
        if (this.nodes && this.nodes.length) {
            matchingNodes = this.nodes.filter(function (node) {
                return node.name.includes(query);
            });
        }
        return matchingNodes.length > 0;
    };
    Object.defineProperty(TreeNode.prototype, "icon", {
        get: function () {
            if (!this.nodes.length) {
                return null;
            }
            if (this.expanded) {
                return '-';
            }
            return '+';
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.check = function () {
        this.checked = this.expanded = !this.checked;
        if (this.parent) {
            this.parent.checked = this.parent.containsChecked();
        }
        this.checkRecursive(this.checked);
    };
    TreeNode.prototype.checkRecursive = function (state) {
        this.nodes.forEach(function (node) {
            node.checked = node.expanded = state;
            node.checkRecursive(state);
        });
    };
    return TreeNode;
})();
exports.TreeNode = TreeNode;
//# sourceMappingURL=TreeNode.js.map