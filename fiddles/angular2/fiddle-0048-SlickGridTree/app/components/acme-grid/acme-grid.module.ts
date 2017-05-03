import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AcmeGridComponent} from './acme-grid.component';
import {SearchBarComponent} from './search-bar/search-bar.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AcmeGridComponent,
    SearchBarComponent
  ],
  exports: [
    AcmeGridComponent,
    SearchBarComponent
  ]
})
export class AcmeGridModule {

}
