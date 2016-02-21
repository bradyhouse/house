import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Splitter} from './component/Splitter';
import {Header} from './component/Header';
import {Navigation} from './component/Navigation';

@Component({
    selector: 'app',
    template: `
     <header></header>
     <navigation></navigation>
     <splitter [model]="splitterConfig"></splitter>`,
    directives: [Header, Navigation, Splitter]
})
export class View {
    get splitterConfig() {
       return {
            id: 1028,
            direction: 'left',
            width: '5px',
            height: '687px',
            left: '355px',
            right: 'auto',
            top: '45px',
            margin: '0px'
        }
    }

}

