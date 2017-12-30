import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent {
  title = 'click a button (above)';
  menuState = 'out';
  classes: any;


  toggleRight() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  constructor() {
    this.classes = {
      left: false,
      bottom: false,
      right: false
    }
  }
}
