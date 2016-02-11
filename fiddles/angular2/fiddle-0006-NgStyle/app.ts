/// <reference path="typings/angular2/angular2.d.ts" />

import {
    Component,
    View,
    NgStyle,
    bootstrap,
} from "angular2/angular2";

@Component({
    selector: 'fiddle-0006-NgStyle'
})
@View({
    directives: [NgStyle],
    template: `
    <div [style.background-color]="'yellow'">
      Uses fixed yellow background
    </div>

    <div [ng-style]="{color: 'white', 'background-color': 'blue'}">
      Uses fixed white text on blue background
    </div>

    <div>
      <span [ng-style]="{color: 'red'}" [style.font-size.px]="fontSize">red text</span>
    </div>

    <div [ng-style]="style"></div>

    <div>
      <span [ng-style]="{color: color}">{{ color }} text</span>
    </div>

    <div [style.background-color]="color" style="color: white;">{{ color }} background</div>

    <div><input type="text" name="color" value="{{color}}" #colorinput></div>
    <div><input type="text" name="fontSize" value="{{fontSize}}" #fontinput></div>

    <button (click)="apply(colorinput.value, fontinput.value)">Apply settings</button>
  `
})
class Fiddle {
    color: string;
    fontSize: number;
    style: {
        'background-color': string,
        'border-radius': string,
        border?: string,
        width?: string,
        height?: string
    };

    constructor() {
        this.fontSize = 16;
        this.color = "blue";
        this.style = {
            'background-color': '#ccc',
            'border-radius': '50px',
            'height': '30px',
            'width': '30px',
        };
    }

    apply(color, fontSize) {
        this.color = color;
        this.fontSize = fontSize;
    }
}

bootstrap(Fiddle);
