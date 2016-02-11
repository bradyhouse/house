/// <reference path="typings/angular2/angular2.d.ts" />

import {
    Component,
    View,
    NgClass,
    bootstrap,
} from "angular2/angular2";

@Component({
    selector: 'fiddle-0008-NgClass'
})
@View({
    directives: [NgClass],
    template: `
    <div [ng-class]="{bordered: false}">This is never bordered</div>
    <div [ng-class]="{bordered: true}">This is always bordered</div>

    <div [ng-class]="{bordered: isBordered}">
      This is a div with object literal. Border is {{ isBordered ? "ON" : "OFF" }}
    </div>

    <div [ng-class]="classesObj">
      This is a div with object var. Border is {{ classesObj.bordered ? "ON" : "OFF" }}
    </div>

    <button (click)="toggleBorder()">Toggle</button>

    <div class="selectors">
      <div>
        <input type="checkbox"
               [checked]="classList.indexOf('blue') > -1"
               (click)="toggleClass('blue')">
        <span>Blue</span>
      </div>

      <div>
        <input type="checkbox"
               [checked]="classList.indexOf('round') > -1"
               (click)="toggleClass('round')">
        <span>Round</span>
      </div>
    </div>

    <div class="base" [ng-class]="['blue', 'round']">
      This will always have a blue background and
      round corners
    </div>

    <div class="base" [ng-class]="classList">
      This is {{ classList.indexOf('blue') > -1 ? "" : "NOT" }} blue
      and {{ classList.indexOf('round') > -1 ? "" : "NOT" }} round
    </div>
  `
})
class Fiddle {
    isBordered: boolean;
    classesObj: Object;
    classList: Array<string>;

    constructor() {
        this.isBordered = true;
        this.classList = ['blue', 'round'];
        this.toggleBorder();
    }

    toggleBorder() {
        this.isBordered = !this.isBordered;
        this.classesObj = {
            bordered: this.isBordered
        };
    }

    toggleClass(cssClass) {
        var pos = this.classList.indexOf(cssClass);
        if (pos > -1) {
            this.classList.splice(pos, 1);
        } else {
            this.classList.push(cssClass)
        }
    }
}

bootstrap(Fiddle);
