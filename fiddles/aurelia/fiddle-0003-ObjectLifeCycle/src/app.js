import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';
import {Container} from './container';

@autoinject
export class App {
  name = 'app';

  constructor() {
    console.log("%c" + this.name + ' constructor', "color: red; background-color: yellow;");
    console.log(arguments);
  }

  activate(){
    console.log("%c" + this.name + ' activate', "color: red; background-color: yellow;");
    console.log(arguments);
  }

  created(owningView, myView) {
    console.log("%c" + this.name + ' created', "color: red; background-color: yellow;");
    console.log(owningView);
    console.log(myView);
  }

  bind(bindingContext, overrideContext) {
    console.log("%c" + this.name + ' bind', "color: red; background-color: yellow;");
    console.log(bindingContext);
    console.log(overrideContext);
  }

  attached() {
    console.log("%c" + this.name + ' attached', "color: red; background-color: yellow;");
    console.log(arguments);
    console.log(this);
  }

}
