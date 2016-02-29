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
            <ul class="tree-view" *ngSwitchWhen="true">
                <li *ngFor="#node of store | treeNodeChecked:node | treeNodeSearch:queryEl.value">
                    <span class="iconButton" (click)="node.toggle()">{{node.icon}}</span>
                    <input type="checkbox" [checked]="node.checked" (click)="node.check()" />
                    {{ node.name }}
                    <div *ngIf="node.expanded">
                        <treeview [store]="node.nodes" [queryEl]="queryEl"></treeview>
                    </div>
                </li>
            </ul>
            <ul class="tree-view" *ngSwitchDefault>
                <li *ngFor="#node of store | treeNodeSearch:queryEl.value">
                    <span class="iconButton" (click)="node.toggle()">{{node.icon}}</span>
                    <input type="checkbox" [checked]="node.checked" (click)="node.check()" />
                    {{ node.name }}
                    <div *ngIf="node.expanded">
                        <treeview [store]="node.nodes" [queryEl]="queryEl"></treeview>
                    </div>
                </li>
            </ul>
        </div>


    `,
    directives: [TreeView],
    inputs: ['store', 'queryEl', 'isChecked']
})
export class TreeView {
    queryEl: AbstractControl;
    isChecked: Boolean;
    store: Array<TreeNode>;

}
