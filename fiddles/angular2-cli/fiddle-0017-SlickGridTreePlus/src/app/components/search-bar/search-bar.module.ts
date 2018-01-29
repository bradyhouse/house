import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './index';

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ]
})

export class SearchBarModule {
}
