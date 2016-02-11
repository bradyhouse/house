/// <reference path="typings/angular2/angular2.d.ts" />

import {
  Component,
  View,
  bootstrap,
} from "angular2/angular2";

@Component({
  selector: '{{FiddleName}}'
})
@View({
  template: `<article>Hello world</article>`
})
class {{FiddleName}} {
}

bootstrap({{FiddleName}});
