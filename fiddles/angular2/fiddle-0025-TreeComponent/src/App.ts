import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Tree} from './component/Tree';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <tree [uiClassPrefix]="treeUiClassPrefix" [height]="treeHeight" [url]="treeUrl"></tree>
    `,
    directives: [Tree]
})
export class App {

    get treeUrl() {
        return meta.urls.data;
    }

    get treeUiClassPrefix() {
        return "tree";
    }

    get treeHeight() {
        return  window.innerHeight - 50;
    }

}
