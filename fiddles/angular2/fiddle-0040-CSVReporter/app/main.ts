import { bootstrap }    from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppComponent } from './app.component';
import { DataService}  from './global/data.service';
import * as meta from './meta';

console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();

enableProdMode();
bootstrap(AppComponent, [DataService])
    .catch(err => console.error(err));