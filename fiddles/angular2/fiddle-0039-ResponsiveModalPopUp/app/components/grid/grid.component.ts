import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';


@Component({
     selector: 'grid-component',
     templateUrl: './app/components/grid/grid.component.html',
     styleUrls: ['./app/components/grid/grid.component.css'],
     directives: [[AgGridNg2]]
})
export class GridComponent {

     @Output() rowselected:EventEmitter<any> = new EventEmitter();
     @Input() rowData:Array<any>;
     @Input() columnDefs:Array<any>;

     constructor() {
     }

     private onRowSelected($event):void {
          this.rowselected.emit($event.node);
     }

     private onCellValueChanged($event):void {
          console.log($event);
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

