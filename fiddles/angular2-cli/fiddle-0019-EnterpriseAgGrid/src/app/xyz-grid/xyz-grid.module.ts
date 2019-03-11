import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XyzGridComponent } from './xyz-grid.component';
import { DateComponent } from '../date/date.component';
import { HeaderComponent } from './header/header.component';
import { HeaderGroupComponent } from './header-group/header-group.component';

@NgModule({
  declarations: [XyzGridComponent, DateComponent, HeaderComponent, HeaderGroupComponent],
  imports: [
    CommonModule
  ],
  exports: [
    XyzGridComponent
  ]
})
export class XyzGridModule { }
