import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions, GridApi} from 'ag-grid/main';


@Component({
     selector: 'grid-component',
     templateUrl: './app/components/grid/grid.component.html',
     directives: [[AgGridNg2]]
})
export class GridComponent {

     @Output() rowselected:EventEmitter<any> = new EventEmitter();
     @Output() ready:EventEmitter<GridApi> = new EventEmitter();
     @Output() valuechange:EventEmitter<any> = new EventEmitter();
     @Input() rowData:any;
     @Input() columnDefs:Array<any>;

     constructor() {
     }

     private onRowSelected($event):void {
          this.rowselected.emit($event.node);
     }

     private onCellValueChanged($event):void {
          this.valuechange.emit($event);
     }

     private onGridReady($event):void {
          this.ready.emit($event);
     }

     get height():number {
          return window.innerHeight - 125;
     }

     get gridOptions():GridOptions {
          return {
               showToolPanel: false,
               enableFilter: false,
               headerHeight: 22,
               enableColResize: true,
               enableSorting: true
          }
     }
}

