export class TreeNode {

    expanded: boolean = false;
    checked: boolean = false;

    constructor(public name:string,
                public nodes:Array<TreeNode>) {
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    getIcon() {
        if (!this.nodes.length){
            return null;
        }
        if (this.expanded) {
            return '-';
        }
        return '+';
    }
    check() {
        this.checked = this.expanded = !this.checked;
        this.checkRecursive(this.checked);
    }
    checkRecursive(state:boolean) {
        this.nodes.forEach(node => {
            node.checked = node.expanded = state;
            node.checkRecursive(state);
        });
    }
}
