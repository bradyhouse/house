import {Component, ViewEncapsulation} from 'angular2/core';
import {Header} from '../header/header';
import {Sidebar} from '../sidebar/sidebar';
import {Content} from '../content/content';

@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: './app.html',
  directives: [Header, Sidebar, Content],
  encapsulation: ViewEncapsulation.None
})
export class App {}
