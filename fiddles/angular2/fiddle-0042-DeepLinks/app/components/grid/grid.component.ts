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
     @Output() ready:EventEmitter<any> = new EventEmitter();
     @Output() valuechange:EventEmitter<any> = new EventEmitter();
     @Input() width:number;
     @Input() height:number;
     @Input() rowData:any;
     @Input() columnDefs:Array<any>;

     private _api:GridApi;

     constructor() {
          console.log('grid - constructor');
     }

     onRowSelected($event):void {
          if ($event.node.selected && this._api) {
               let floatingRows:Array<any> = this.filterRowData($event.node.id, true);
               this._api.setFloatingTopRowData(floatingRows);
          } else {
               this._api.setFloatingTopRowData([]);

          }
          this.rowselected.emit($event.node);
     }

     onCellValueChanged($event) {
          this.valuechange.emit($event);
     }

     onGridReady($event) {
          console.log('grid - onGridReady');
          this._api = $event.api;
          this.ready.emit($event);
     }

     get gridHeight():number {
          return this.height ? this.height : window.innerHeight;
     }

     get gridOptions():GridOptions {
          return {
               showToolPanel: false,
               enableFilter: true,
               rowHeight: 35,
               enableColResize: true,
               enableSorting: true,
               getRowStyle: function(params) {
                    if (params.node.floating) {
                         return {'font-weight': 'bold'}
                    }
               },
               floatingTopRowData: []
          }
     }

     filterRowData(index:number):Array<any> {
          return this.rowData.filter(function(row:any, i:number) {
               if (i === index) {
                    return row;
               }
          });
     }

}

