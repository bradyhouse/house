import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { BgColorDirective } from './bg-color.directive';

@Component({
  selector: 'app',
  directives: [[NgStyle, BgColorDirective]],
  template: `
    <div [bg-color]="color" [bg-color-default]="'violet'" [ngStyle]="{height: panelHeight + 'px', padding: '20px'}">
        <input type="radio" name="colors" (click)="color='green'">Green
        <input type="radio" name="colors" (click)="color='orange'">Orange
        <input type="radio" name="colors" (click)="color='black'">Black
    </div>`
})
export class AppComponent {

  panelHeight:string;

  constructor() {
    this.panelHeight = window.innerHeight;
    document.body.style.background = '#ffffff';
  }

}
