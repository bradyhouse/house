import {Component} from 'angular2/core';
import {Toolbar} from './toolbar/toolbar';
import {Dashboard} from './dashboard/dashboard';

@Component({
  selector: 'content',
  moduleId: module.id,
  templateUrl: './content.html',
  styleUrls: ['./content.css'],
  directives: [Toolbar, Dashboard]
})
export class Content{}
