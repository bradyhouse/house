import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {Fiddle} from './Fiddle';
import * as meta from './meta';
import * as core from 'angular2/core';

console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();

declare var ag: any;
ag.grid.initialiseAgGridWithAngular2({ core: core });

enableProdMode();
bootstrap(Fiddle)
    .catch(err => console.error(err));


