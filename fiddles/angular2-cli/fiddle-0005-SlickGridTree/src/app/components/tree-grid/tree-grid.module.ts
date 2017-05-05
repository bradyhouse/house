import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TreeGridComponent} from './tree-grid.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    TreeGridComponent,
    NavBarComponent
  ],
  exports: [
    TreeGridComponent
  ]
})
export class TreeGridModule {

}
