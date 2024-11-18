import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ModalComponent, PopUpComponent],
  imports: [
    CommonModule,
    BsModalModule.forRoot()
  ],
  exports: [ModalComponent],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
