import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';
import {TreeNode} from './TreeNode';

@Component({
    selector: 'treeview',
    template: `
        <div id="scrollbox" style="height: {{height}}px; overflow:auto; background-color: white;">
           <div id="content">
                <ul class="treeview">
                    <li *ngFor="#node of store">
                        <span class="iconButton" (click)="node.toggle()">{{node.getIcon()}}</span>
                        <input type="checkbox" [checked]="node.checked" (click)="node.check()" />
                        {{ node.name }}
                        <div *ngIf="node.expanded">
                            <treeview [store]="node.nodes"></treeview>
                        </div>
                    </li>
                </ul>
           </div>
        </div>
    `,
    directives: [TreeView],
    inputs: ['store', 'height']
})
export class TreeView {
    store: Array<TreeNode>;
    height: number;

}
