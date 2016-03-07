import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';
import {TreeController} from './component/Tree';
import * as meta from './meta';


@Component({
    selector: 'app'
})
@View({
    template: `
        <div header></div>
        <tree class="tree" [uiClassPrefix]="treeUiClassPrefix" [height]="treeHeight" [url]="treeUrl"></tree>
    `,
    directives: [TreeController]
})
export class AppController {

    get treeUrl() {
        return meta.urls.data;
    }
    get treeUiClassPrefix() {
        return "tree";
    }
    get treeHeight() {
        return  window.innerHeight - 100;
    }

}
