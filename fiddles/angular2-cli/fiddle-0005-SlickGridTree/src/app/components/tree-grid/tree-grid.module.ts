import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TreeGridComponent} from './tree-grid.component';
import {FilterBarComponent} from './filter-bar/filter-bar.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    TreeGridComponent,
    FilterBarComponent
  ],
  exports: [
    TreeGridComponent
  ]
})
export class TreeGridModule {

}
