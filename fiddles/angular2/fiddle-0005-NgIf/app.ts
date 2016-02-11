/// <reference path="typings/angular2/angular2.d.ts" />

import {
    Component,
    View,
    bootstrap,
    NgIf,
} from "angular2/angular2";

@Component({
    selector: 'fiddle-0005-NgIf'
})
@View({
    template: `
    <div *ng-if="greaterThanFive()">
        It's greater than 5!
    </div>
    <hr/>
    {{value}}
    <hr />
    <button (click)="increase()">Increase</button>
    <button (click)="decrease()">Decrease</button>`,
    directives: [NgIf]
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
    greaterThanFive() {
        return this.value > 5 ? true : false;
    }
}

bootstrap(Fiddle);
