import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import 'ag-grid-enterprise';

@Component({
  selector: 'rich-grid',
  templateUrl: 'rich-grid.component.html',
  styleUrls: ['rich-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RichGridComponent {

  @ViewChild('agGrid') agGrid: any;
  style: { width: string; height: string; };
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  rowData: any[];

  constructor() {
    this.rowData = [];
    this.columnDefs = [
      {
        headerName: 'Country',
        field: 'country',
        width: 120,
        rowGroup: true,
        enableRowGroup: true
      },
      {
        headerName: 'Year',
        field: 'year',
        width: 90,
        rowGroup: true,
        enableRowGroup: true,
        enablePivot: true
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 110
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 110
      },
      {
        headerName: 'Gold',
        field: 'gold',
        width: 100,
        aggFunc: 'sum'
      },
      {
        headerName: 'Silver',
        field: 'silver',
        width: 100,
        aggFunc: 'sum'
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
        width: 100,
        aggFunc: 'sum'
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
    this.style = { width: window.innerWidth + 'px', height: window.innerHeight + 'px' };
    this.createRowData();
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.setPivotColumns(['year']);
    this.gridColumnApi.setRowGroupColumns(['country']);
    this.stretchGrid(window.innerWidth, window.innerHeight);

  }

  onResize(event: any): void {
    this.stretchGrid(event.target.innerWidth, event.target.innerHeight);
  }

  private stretchGrid(width: number, height: number): void {
    this.style = {
      width: width + 'px',
      height: (height - (height * .1)) + 'px'
    };
  }

  private createRowData() {
    fetch('assets/data.json').then((response: any) => {
      return response.json();
    }).then((data: any) => {
      this.rowData = data;
    });
  }


}
