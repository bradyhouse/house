import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Dropdown } from './dropdown.options';

import { PanelMenuEvent } from '../panel-menu.options';

@Component({
  selector: 'app-panel-menu-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  @Input()
  options: Dropdown;

  @Output()
  events: EventEmitter<PanelMenuEvent>;

  constructor() {
    this.events = new EventEmitter();
  }

  onOptionClick(option: Dropdown) {
    this.events.emit({
      type: option.id,
      data: option.data
    });
  }

}
