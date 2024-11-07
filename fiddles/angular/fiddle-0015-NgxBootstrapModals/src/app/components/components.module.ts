import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent, ModalContentComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent, ModalContentComponent],
  entryComponents: [ModalContentComponent],

  exports: [
    ModalComponent
  ]
})
export class ComponentsModule { }
