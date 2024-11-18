import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import { HeaderComponent } from './header/header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TooltipComponent,
    ToolbarComponent,
    HeaderComponent
  ],
  declarations: [TooltipComponent, HeaderComponent, ToolbarComponent]
})
export class ComponentsModule { }
