/// <reference path="typings/angular2/angular2.d.ts" />

import {
  Component,
  View,
  bootstrap,
} from "angular2/angular2";

@Component({
  selector: 'fiddle-0004-OutputBinding'
})
@View({
  template: `
    {{value}}
    <hr />
    <button (click)="increase()">Increase</button>
    <button (click)="decrease()">Decrease</button>`
})
class Fiddle {
    value: number;
    constructor() {
        this.value = 1;
    }
    increase() {
        this.value++;
    }
    decrease() {
        this.value--;
    }
}

bootstrap(Fiddle);
