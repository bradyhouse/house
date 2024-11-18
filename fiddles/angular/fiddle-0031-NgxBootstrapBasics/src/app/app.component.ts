import { Component } from '@angular/core';
import { PanelMenu, PanelMenuEvent, DropdownItemEnum } from './components/panel-menu/panel-menu.options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  panelMenuOptions: PanelMenu;
  panelHeight: number;
  titles: string[];
  content: string[];
  isPreferences: boolean;

  constructor() {
    this.titles = [
      'Dropdown',
      'Modal',
      'Tooltip',
      'Popover',
      'Daterange',
      'Typeahead'
    ];
    this.content = [
      'Click the menu link <i class="mdi mdi-arrow-top-right"></i>',
      'Click the icon<i class="mdi mdi-arrow-top-right"></i>',
      'Mouse over the icon<i class="mdi mdi-arrow-top-right"></i>',
      'Mouse over the icon<i class="mdi mdi-arrow-top-right"></i>',
      'Click the textbox<i class="mdi mdi-arrow-top-right"></i>',
      'Type in the textbox<i class="mdi mdi-arrow-top-right"></i>'
    ];
    this.panelHeight = Math.floor(.90 * window.innerHeight);
    this.panelMenuOptions = {
      collapse: true,
      fullScreen: true,
      dropdown: [
        DropdownItemEnum.Export,
        DropdownItemEnum.Filter,
        DropdownItemEnum.Reset
      ]
    };
  }

  onEvents(event: any) {
    this.content[0] = JSON.stringify(event);
  }

  

}
