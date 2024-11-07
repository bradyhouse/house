import { NgModule } from '@angular/core';
import { PanelMenuModule } from './panel-menu/panel-menu.module';
import { ModalModule } from './modal/modal.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { PopoverModule } from './popover/popover.module';
import { DaterangeModule } from './daterange/daterange.module';
import { TypeAheadModule } from './type-ahead/type-ahead.module';

@NgModule({
  declarations: [],
  exports: [
    PanelMenuModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    DaterangeModule,
    TypeAheadModule
  ],
  imports: [ModalModule, ModalModule, TooltipModule, PopoverModule,DaterangeModule, TypeAheadModule]
})
export class ComponentsModule { }
