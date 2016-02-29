import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Tree} from './component/Tree';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <tree [uiClass]="tree" [height]="treeHeight" [url]="treeUrl"></tree>
    `,
    directives: [Tree]
})
export class App {
    constructor() {
        this.treeUrl=meta.urls.data;
        this.uiClass="tree";
        this.treeHeight = window.innerHeight - 250;
    }
}
