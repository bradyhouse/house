import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelHeaderComponent } from './panel-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PanelHeaderComponent],
  exports: [
    PanelHeaderComponent
  ]
})
export class PanelHeaderModule { }
