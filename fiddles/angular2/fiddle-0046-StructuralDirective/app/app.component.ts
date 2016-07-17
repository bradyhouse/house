import { Component } from '@angular/core';
import { FubarDirective } from './fubar.directive';

@Component({
  selector: 'app',
  directives: [[FubarDirective]],
  template: `
    <button
    (click)="condition = !condition"
    [style.background] = "condition ? 'orangered': 'lightgreen'"
    >
    Set 'condition' to {{condition ? 'False': 'True'}}
  </button>
  <p *ngIf="condition">
  condition is true and ngIf is true.
  </p>
  <p *ngIf="!condition">
    condition is false and ngIf is false.
  </p>
  <p *fubar="condition">
    condition is false and fubar is true.
  </p>
  <p *fubar="!condition">
    condition is true and fubar is false.
  </p>
  `
})
export class AppComponent {
  constructor() {
    document.body.style.background = '#ffffff';
  }
  condition = true;
}
