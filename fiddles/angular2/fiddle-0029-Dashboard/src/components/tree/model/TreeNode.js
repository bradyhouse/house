var TreeNode = (function () {
    function TreeNode(name, nodes, parent) {
        this.name = name;
        this.nodes = nodes;
        this.parent = parent;
        this.expanded = false;
        this.checked = false;
        if (!parent) {
            this._selectedNodes = [];
        }
        else {
            this._selectedNodes = null;
        }
    }
    Object.defineProperty(TreeNode.prototype, "displayName", {
        get: function () {
            if (this.name.length > 16) {
                return this.name.substring(0, 16) + '...';
            }
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(TreeNode.prototype, "isRoot", {
        get: function () {
            return this._selectedNodes ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "selectedNodes", {
        get: function () {
            if (this.parent) {
                return this.parent.selectedNodes;
            }
            else {
                return this._selectedNodes;
            }
        },
        set: function (nodes) {
            if (this.parent) {
                this.parent.selectedNodes = nodes;
            }
            else {
                this._selectedNodes = nodes;
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    TreeNode.prototype.containsChecked = function () {
        var checkedNodes = [];
        if (this.nodes && this.nodes.length) {
            checkedNodes = this.nodes.filter(function (node) {
                return node.checked;
            });
        }
        return checkedNodes.length > 0;
    };
    TreeNode.prototype.containsName = function (name) {
        var query = name, matchingNodes = [];
        if (this.nodes && this.nodes.length) {
            matchingNodes = this.nodes.filter(function (node) {
                return node.name.includes(query);
            });
        }
        return matchingNodes.length > 0;
    };
    TreeNode.prototype.check = function (callback) {
        var me = this;
        me.checked = me.expanded = !me.checked;
        if (me.parent) {
            me.parent.checked = me.parent.containsChecked();
            if (me.parent.isRoot) {
                me.select(callback);
            }
        }
        me.checkRecursive(me.checked);
    };
    TreeNode.prototype.checkRecursive = function (state) {
        this.nodes.forEach(function (node) {
            node.checked = node.expanded = state;
            node.checkRecursive(state);
        });
    };
    TreeNode.prototype.select = function (callback) {
        var me = this, nodeName = me.name;
        if (me.checked) {
            if (me.selectedNodes.indexOf(nodeName) == -1) {
                me.selectedNodes.push(nodeName);
                me.selectedNodes.sort(function (a, b) {
                    return b < a;
                });
            }
        }
        else {
            me.selectedNodes = me.selectedNodes.filter(function (node) {
                return node != nodeName;
            });
        }
        if (callback) {
            callback.apply(me);
        }
    };
    return TreeNode;
})();
exports.TreeNode = TreeNode;
//# sourceMappingURL=TreeNode.js.map