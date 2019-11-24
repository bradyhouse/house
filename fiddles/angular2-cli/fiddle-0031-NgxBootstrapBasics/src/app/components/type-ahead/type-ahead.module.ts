import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TypeAheadComponent } from './type-ahead.component';
import { TypeaheadModule as BsTypeAheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [TypeAheadComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    BsTypeAheadModule.forRoot(),
  ],
  exports: [TypeAheadComponent],
  entryComponents: [TypeAheadComponent]
})
export class TypeAheadModule { }
