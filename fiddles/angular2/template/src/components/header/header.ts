import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'header',
  moduleId: module.id,
  directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header{}
