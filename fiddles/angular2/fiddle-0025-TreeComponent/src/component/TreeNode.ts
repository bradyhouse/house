export class TreeNode {

    expanded:boolean = false;
    checked:boolean = false;

    constructor(public name:String,
                public nodes:Array<TreeNode>,
                public parent:TreeNode) {
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    containsChecked() {
        checkedNodes:TreeNode;
        if (this.nodes && this.nodes.length) {
            checkedNodes = this.nodes.filter(function (node) {
                return node.checked;
            });
        }
        return checkedNodes.length > 0;

    }

    containsName(name) {
        var query = name;
        matchingNodes:TreeNode;
        if (this.nodes && this.nodes.length) {
            matchingNodes = this.nodes.filter(node => {
                return node.name.includes(query);
            });
        }
        return matchingNodes.length > 0;
    }

    get icon() {
        if (!this.nodes.length) {
            return null;
        }
        if (this.expanded) {
            return '-';
        }
        return '+';
    }

    check() {
        this.checked = this.expanded = !this.checked;
        if (this.parent) {
            this.parent.checked = this.parent.containsChecked();
        }
        this.checkRecursive(this.checked);

    }

    checkRecursive(state:boolean) {
        this.nodes.forEach(node => {
            node.checked = node.expanded = state;
            node.checkRecursive(state);
        });
    }
}
