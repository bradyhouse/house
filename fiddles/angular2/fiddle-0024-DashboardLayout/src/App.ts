import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Content} from './component/Content';
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
    directives: [Header, Content]
})
export class App {}
