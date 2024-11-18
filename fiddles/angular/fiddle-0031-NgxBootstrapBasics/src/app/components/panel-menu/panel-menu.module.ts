import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuComponent } from './panel-menu.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [PanelMenuComponent, DropdownComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [PanelMenuComponent],
  entryComponents: [PanelMenuComponent]
})
export class PanelMenuModule { }
