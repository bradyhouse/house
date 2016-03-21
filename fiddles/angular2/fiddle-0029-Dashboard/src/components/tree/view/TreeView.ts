import { Component, View, EventEmitter, AbstractControl, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/core';
import {TreeNode} from '../model/TreeNode';
import {TreeNodeSearchPipe} from './pipe/TreeNodeSearchPipe';
import {TreeNodeCheckedPipe} from './pipe/TreeNodeCheckedPipe';

@Component({
    selector: 'treeview',
    inputs: ['store', 'queryEl', 'isChecked', 'uiClassPrefix']
})
@View({
    templateUrl: 'components/tree/view/treeview.html',
    styleUrls: ['components/tree/view/treeview.css'],
    pipes: [TreeNodeSearchPipe, TreeNodeCheckedPipe],
    directives: [TreeViewController]
})
export class TreeViewController {
    queryEl:AbstractControl;
    isChecked:Boolean;
    store:Array<TreeNode>;
    uiClassPrefix:String;
    change:EventEmitter;

    constructor() {
        this.change = new EventEmitter();
    }

    changed() {
        this.change.next();
    }
}
