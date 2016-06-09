import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';
import {customElement} from 'aurelia-framework';

@customElement('container')
@autoinject()
export class Container {
     name = 'Container';
     overridableContext = '';
     boundContext = '';

     constructor() {
          console.log("%c" + this.name + ' constructor', "color: green; background-color: yellow;");
          console.log(arguments);
     }

     activate() {
          console.log("%c" + this.name + ' activate', "color: green; background-color: yellow;");
          console.log(arguments);
     }

     created(owningView, view) {
          console.log("%c" + this.name + ' created', "color: green; background-color: yellow;");
          console.log(owningView);
          console.log(view)
     }

     bind(bindingContext, overrideContext) {
          console.log("%c" + this.name + ' bind', "color: green; background-color: yellow;");
          console.log(bindingContext);
          console.log(overrideContext);
          this.overridableContext = JSON.stringify(overrideContext);
          this.boundContext = JSON.stringify(bindingContext);
     }

     attached() {
          console.log("%c" + this.name + ' attached', "color: green; background-color: yellow;");
          console.log(arguments);
     }

     detached() {
          console.log("%c" + this.name + ' detached', "color: green; background-color: yellow;");
          console.log(arguments);
     }

     unbind() {
          console.log("%c" + this.name + ' unbind', "color: green; background-color: yellow;");
          console.log(arguments);
     }

}
