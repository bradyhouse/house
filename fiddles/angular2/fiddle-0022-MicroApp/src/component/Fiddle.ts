import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';

@Component({
    selector: 'fiddle',
})
@View({
    template: `
     <div style="text-align: center;">
        <div head>
          <svg id="logo1">
            <path
                id="logo"
                stroke="black"
                stroke-width="1"
                d="M 256 116 203 28 100 34 57 127 119 209 221 193 254 95 183 20 84 48 62 148 140 215 236 177 247 75 162 17 71 65 71 168 162 216 247 158 236 56 140 18 62 85 84 185 183 213 254 138 221 40 119 24 57 106 100 199 203 205 z"
                fill="lime">
            </path>
          </svg>
          <ng-content></ng-content>
        </div>
        <div menu>
            <ng-content select="[menu]"></ng-content>
        </div>
        <div body>
            <ng-content select="[body]"></ng-content>
        </div>
        <div footer>
          © copyright
        </div>
      </div>`
})
export class Fiddle {
    constructor(){}
}
