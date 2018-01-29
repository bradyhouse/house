import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeGridComponent } from './tree-grid.component';
import { SearchBarModule } from '../search-bar/search-bar.module';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SearchBarModule,
    CommonModule
  ],
  declarations: [
    TreeGridComponent
  ],
  exports: [
    TreeGridComponent
  ]
})
export class TreeGridModule {

}
