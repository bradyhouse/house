import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';
import {TreeNode} from './TreeNode';

@Component({
    selector: 'displaynodes',
    inputs: ["nodes"]
})
@View({
    template: `{{nodes}}&nbsp;`
})
export class DisplayNodes {

    nodes:String;
    constructor() {}

}
