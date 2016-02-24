import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';
import {Directory} from './Directory';

@Component({
    selector: 'treeview',
    template: `
        <ul>
            <li *ngFor="#dir of store">
                <span class="iconButton" (click)="dir.toggle()">{{dir.getIcon()}}</span>
                <input type="checkbox" [checked]="dir.checked" (click)="dir.check()" />
                {{ dir.name }}
                <div *ngIf="dir.expanded">
                    <ul>
                        <li *ngFor="#file of dir.files">{{file}}</li>
                    </ul>
                    <treeview [store]="dir.directories"></treeview>
                </div>
            </li>
        </ul>
    `,
    directives: [TreeView],
    inputs: ['store']
})
export class TreeView {
    store: Array<Directory>;
}
