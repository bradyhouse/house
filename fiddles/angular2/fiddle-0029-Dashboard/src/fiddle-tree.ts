import {Component, View} from 'angular2/core';
import {TreeController} from './components/tree/Tree';

@Component({
    selector: 'app',
    moduleId: module.id
})
@View({
    template: `
     <div class="wrapper" style="height: {{height}}px;">
        <tree [uiClassPrefix]="treeClass" class="tree" (nodeCheckChange)="onTreeNodeCheckChange($event)" [height]="treeHeight" [url]="treeUrl"></tree>
    </div>`,
    directives: [TreeController]

})
export class App {

    _selectedNodes: String[] = [];
    url:String;

    constructor() {
        this.treeUrl="data/data.json";
        this.treeClass= "tree";
    }

    get height() {
        return window.innerHeight - 60;
    }

    get selectedNodes() {
        return this._selectedNodes;
    }

    onTreeNodeCheckChange(event) {
        this._selectedNodes = [];
        event.nodes.map(function(node){
            this._selectedNodes.push(node);
        }, this);
        console.log(this.selectedNodes);
    }
    get treeHeight() {
        return this.height;
    }

}
