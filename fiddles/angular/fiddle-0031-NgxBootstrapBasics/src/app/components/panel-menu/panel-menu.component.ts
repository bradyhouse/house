import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { PanelMenuEvent, PanelMenu } from './panel-menu.options';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css']
})
export class PanelMenuComponent {

  @Input()
  options: PanelMenu;

  @Output()
  events: EventEmitter<any>;

  constructor() {
    this.events = new EventEmitter();
  }

  onToggle(type: string) {
    this.options[type] = !this.options[type];
    this.events.emit({type, data: this.options[type]});
  }

  onEvents(event: any) {
    this.events.emit(event);
  }

}
