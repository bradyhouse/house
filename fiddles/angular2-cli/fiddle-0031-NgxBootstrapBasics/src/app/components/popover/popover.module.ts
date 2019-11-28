import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverModule as BsPopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [PopoverComponent],
  imports: [
    CommonModule,
    BsPopoverModule.forRoot()
  ],
  exports: [PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class PopoverModule { }
