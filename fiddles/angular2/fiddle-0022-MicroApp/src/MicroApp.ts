import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Fiddle} from './component/Fiddle';

@Component({
    selector: 'app',
    template: `
   <fiddle>
      <div head>HEADER</div>
      <div menu>MENU</div>
      <div body>BODY</div>
   </fiddle>
  `,
    directives: [Fiddle]
})
export class MicroApp {
}
