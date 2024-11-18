import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { PanelModule } from './panel/panel.module';
import { SelectListModule } from './select-list/select-list.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    PanelModule,
    SelectListModule
  ],
  declarations: [],
  exports: [
    HeaderModule,
    PanelModule,
    SelectListModule
  ]
})
export class ComponentsModule { }
