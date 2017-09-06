import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { PanelHeaderModule } from './panel-header/panel-header.module';

@NgModule({
  imports: [
    CommonModule,
    PanelHeaderModule
  ],
  declarations: [PanelComponent],
  exports: [
    PanelComponent
  ]
})
export class PanelModule { }
