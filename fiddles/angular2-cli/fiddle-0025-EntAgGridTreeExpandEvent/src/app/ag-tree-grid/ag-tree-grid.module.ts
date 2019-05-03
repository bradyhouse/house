import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgTreeGridComponent } from './ag-tree-grid.component';
import {AgGridModule} from 'ag-grid-angular/main';

import 'ag-grid-enterprise';

@NgModule({
  declarations: [AgTreeGridComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    AgTreeGridComponent
  ]
})
export class AgTreeGridModule { }
