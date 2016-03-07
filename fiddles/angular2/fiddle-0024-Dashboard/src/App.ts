import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {ContentController} from './component/Content';
import {Header} from './component/Header';


@Component({
    selector: 'app',
    template: `
        <header>
        </header>
        <content>
            <div center>
            </div>
            <div west>
                <code>NAVIGATION</code>
            </div>
        </content>
  `,
    directives: [Header, ContentController]
})
export class App {}
