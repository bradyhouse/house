export declare class TreeNode {
    name: String;
    nodes: Array<TreeNode>;
    parent: TreeNode;
    expanded: boolean;
    checked: boolean;
    _selectedNodes: String[];
    constructor(name: String, nodes: Array<TreeNode>, parent: TreeNode);
    icon: string;
    isRoot: boolean;
    selectedNodes: any;
    toggle(): void;
    containsChecked(): boolean;
    containsName(name: any): boolean;
    check(callback: any): void;
    checkRecursive(state: boolean): void;
    select(callback: any): void;
}
