import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PanelComponent],
  exports: [
    PanelComponent
  ]
})
export class PanelModule { }
