/// <reference path="typings/angular2/angular2.d.ts" />

import {
    Component,
    View,
    NgSwitch,
    NgSwitchWhen,
    NgSwitchDefault,
    bootstrap,
} from "angular2/angular2";

@Component({
    selector: 'fiddle-0007-NgSwitch'
})
@View({
    directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault],
    template: `
    <div>Current choice is: {{ choice }}</div>

    <ul [ng-switch]="choice">
      <li *ng-switch-when="1">First choice</li>
      <li *ng-switch-when="2">Second choice</li>
      <li *ng-switch-when="3">Third choice</li>
      <li *ng-switch-when="4">Fourth choice</li>
      <li *ng-switch-when="2">Second choice, again</li>
      <li *ng-switch-default>Default choice</li>
    </ul>

    <div style="margin-top: 20px;">
      <button (click)="nextChoice()">Next choice</button>
    </div>
  `
})
class Fiddle {
    choice: number;

    constructor() {
        this.choice = 1;
    }

    nextChoice() {
        this.choice += 1;

        if (this.choice > 5) {
            this.choice = 1;
        }
    }
}

bootstrap(Fiddle);
