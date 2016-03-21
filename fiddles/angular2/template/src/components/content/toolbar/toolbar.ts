import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
  selector: 'toolbar',
  moduleId: module.id,
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES],
})
export class Toolbar {}



