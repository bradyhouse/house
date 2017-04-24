import { Component } from '@angular/core';


@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: './app/sidebar/sidebar.component.html',
  styleUrls: ['./app/sidebar/sidebar.component.css']
})
export class SidebarComponent {

  options: any;

  get height():number {
    return window.innerHeight - (Math.floor(.09 * window.innerHeight));
  }
  get width():number {
    return Math.floor(.20 * window.innerWidth);
  }

  constructor() {
    this.options = {
      columns: [
        {
          field: 'value'
        }
      ],
      rows: [
        {
          value: 'a'
        },
        {
          value: 'b'
        },
        {
          value: 'c'
        },
        {
          value: 'd'
        }
      ]
    }
  }

}
