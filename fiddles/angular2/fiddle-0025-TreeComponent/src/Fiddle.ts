import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Tree} from './component/Tree';



@Component({
    selector: 'app',
    template: `
        <tree></tree>
    `,
    directives: [Tree]
})
export class Fiddle {

}
