import { EventEmitter, AbstractControl } from 'angular2/core';
import { TreeNode } from './TreeNode';
export declare class TreeViewController {
    queryEl: AbstractControl;
    isChecked: Boolean;
    store: Array<TreeNode>;
    uiClassPrefix: String;
    change: EventEmitter;
    constructor();
    changed(): void;
}
