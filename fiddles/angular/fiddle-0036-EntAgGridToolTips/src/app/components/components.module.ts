import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TooltipComponent
  ],
  declarations: [TooltipComponent]
})
export class ComponentsModule { }
