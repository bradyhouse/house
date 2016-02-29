import {Component, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/core';
import * as core from 'angular2/core';
import {TreeNode} from './TreeNode';
import {TreeNodeSearchPipe} from './TreeNodeSearchPipe';
import {TreeNodeCheckedPipe} from './TreeNodeCheckedPipe';

@Component({
    selector: 'treeview',
    pipes: [TreeNodeSearchPipe, TreeNodeCheckedPipe],
    template: `
        <ng-content select="[header]"></ng-content>

        <div [ngSwitch]="isChecked">
            <ul class="{{uiClassPrefix}}-view" *ngSwitchWhen="true">
                <li *ngFor="#node of store | treeNodeChecked:node | treeNodeSearch:queryEl.value">
                    <span class="{{uiClassPrefix}}-nodeButton" (click)="node.toggle()">{{node.icon}}</span>
                    <input type="checkbox" [checked]="node.checked" (click)="node.check()" />
                    {{ node.name }}
                    <div *ngIf="node.expanded">
                        <treeview  [store]="node.nodes" [uiClassPrefix]="uiClassPrefix" [queryEl]="queryEl"></treeview>
                    </div>
                </li>
            </ul>
            <ul class="{{uiClassPrefix}}-view" *ngSwitchDefault>
                <li *ngFor="#node of store | treeNodeSearch:queryEl.value">
                    <span class="{{uiClassPrefix}}-nodeButton" (click)="node.toggle()">{{node.icon}}</span>
                    <input type="checkbox" [checked]="node.checked" (click)="node.check()" />
                    {{ node.name }}
                    <div *ngIf="node.expanded">
                        <treeview [store]="node.nodes" [uiClassPrefix]="uiClassPrefix" [queryEl]="queryEl"></treeview>
                    </div>
                </li>
            </ul>
        </div>
    `,
    directives: [TreeView],
    inputs: ['store', 'queryEl', 'isChecked', 'uiClassPrefix']
})
export class TreeView {
    queryEl:AbstractControl;
    isChecked:Boolean;
    store: Array<TreeNode>;
    uiClassPrefix:String;

}
