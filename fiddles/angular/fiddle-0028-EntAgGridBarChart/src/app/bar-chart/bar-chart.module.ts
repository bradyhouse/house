import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [BarChartComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [BarChartComponent],
  entryComponents: [BarChartComponent]
})
export class BarChartModule { }
