import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaterangeComponent } from './daterange.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DaterangeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [DaterangeComponent],
  entryComponents: [DaterangeComponent]
})
export class DaterangeModule { }
