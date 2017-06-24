import {
    Component,
    View,
    EventEmitter,
    AbstractControl,
    NgSwitch,
    NgSwitchWhen, NgSwitchDefault} from 'angular2/core';
import * as core from 'angular2/core';
import {TreeNode} from './TreeNode';
import {TreeNodeSearchPipe} from './TreeNodeSearchPipe';
import {TreeNodeCheckedPipe} from './TreeNodeCheckedPipe';

@Component({
    selector: 'treeview',
    inputs: ['store', 'queryEl', 'isChecked', 'uiClassPrefix']
})
@View({
    template: `
        <div [ngSwitch]="isChecked">
            <ul class="{{uiClassPrefix}}-view" *ngSwitchWhen="true">
                <li *ngFor="#node of store | treeNodeChecked:node | treeNodeSearch:queryEl.value">
                    <span class="{{uiClassPrefix}}-nodeButton" (click)="node.toggle()">{{node.icon}}</span>
                    <input type="checkbox" [checked]="node.checked" (click)="node.check(changed())" />
                    {{ node.name }}
                    <div *ngIf="node.expanded">
                        <treeview  [store]="node.nodes" [uiClassPrefix]="uiClassPrefix" [queryEl]="queryEl"></treeview>
                    </div>
                </li>
            </ul>
            <ul class="{{uiClassPrefix}}-view" *ngSwitchDefault>
                <li *ngFor="#node of store | treeNodeSearch:queryEl.value">
                    <span class="{{uiClassPrefix}}-nodeButton" (click)="node.toggle()">{{node.icon}}</span>
                    <input *ngIf="node.selectable" type="checkbox" [checked]="node.checked" (click)="node.check(changed())" />
                    {{ node.name }}
                    <div *ngIf="node.expanded">
                        <treeview [store]="node.nodes" [uiClassPrefix]="uiClassPrefix" [queryEl]="queryEl"></treeview>
                    </div>
                </li>
            </ul>
        </div>
    `,
    pipes: [TreeNodeSearchPipe, TreeNodeCheckedPipe],
    directives: [TreeViewController]
})
export class TreeViewController {
    queryEl:AbstractControl;
    isChecked:Boolean;
    store: Array<TreeNode>;
    uiClassPrefix:String;
    change:EventEmitter;
    constructor() {
        this.change = new EventEmitter();
    }
    changed() {
         this.change.next();
    }


}
