import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { HeightDirective } from './height.directive';

@Component({
  selector: 'app',
  directives: [[NgStyle, HeightDirective, NgIf]],
  template: `
    <div #panel [height]="panelHeight" [ngStyle]="{ backgroundColor: 'orange' }">
        <div *ngIf="redBarVisible" [ngStyle]="{backgroundColor: 'red', height: '20px', width: '100%' }"></div>
        <div [height]="panel" (heightChange)="onHeightChange($event)" [ngStyle]="{backgroundColor: 'blue', color: 'white'}">
          <H1>{{bluePanelHeight}}</H1>
        </div>
        <input type="button" value="Remove Red Bar" (click)="onRemoveButtonClick()" *ngIf="redBarVisible" />
        <input type="button" value="Show Red Bar" (click)="onShowButtonClick()" *ngIf="!redBarVisible" />
    </div>`

})
export class AppComponent {

  @ViewChild('panel') panel:ElementRef;

  redBarVisible:boolean = true;
  panelHeight:number;
  bluePanelHeight:number;


  constructor() {
    this.panelHeight = window.innerHeight;
    document.body.style.background = '#ffffff';
  }

  onRemoveButtonClick() {
    this.redBarVisible = false;
  }
  onShowButtonClick() {
    this.redBarVisible = true;
  }

  onHeightChange(panel:ElementRef) {
    this.bluePanelHeight = panel.nativeElement.getBoundingClientRect()['height'];
  }

}
