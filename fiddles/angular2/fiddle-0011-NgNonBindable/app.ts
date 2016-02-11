/// <reference path="typings/angular2/angular2.d.ts" />

import {
    Component,
    View,

    bootstrap,
} from "angular2/angular2";

@Component({
    selector: 'fiddle-0011-NgNonBindable'
})
@View({

    template: `
  <div>
    {{ content }}
    <span ng-non-bindable>
      <- This is what {{ content }} rendered
    </span>
  </div>
  `
})
class Fiddle {
    content: string;

    constructor() {
        this.content = 'Some text';
    }
}

bootstrap(Fiddle);
