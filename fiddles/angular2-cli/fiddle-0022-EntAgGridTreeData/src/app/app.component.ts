import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: HTMLElement;

  private gridApi: any;
  private gridColumnApi: any;
  private groupDefaultExpanded: any;
  private getDataPath: Function;
  private getRowNodeId: Function;
  private autoGroupColumnDef: any;
  private columnDefs: any[];
  private defaultColDef: any;
  private rowData: any[];
  private rowSelection: any;
  private style: { width: string; height: string };

  constructor(private http: HttpClient) {
    this.columnDefs = [];
    this.getDataPath = (data: any) => {
      return data.path;
    };
    this.groupDefaultExpanded = true;

    this.getRowNodeId = (data: any) => {
      return data.id;
    };
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      suppressMenu: true,
      filter: 'agTextColumnFilter'
    };
    this.autoGroupColumnDef = {
      headerName: 'Brews',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true,
        suppressCount: false
      }
    };
    this.rowSelection = 'multiple';

  }

  onResize(event: any): void {
    this.stretchGrid(event.target.innerWidth, event.target.innerHeight);
  }

  stretchGrid(width: number, height: number): void {
    this.style = {
      width: width + 'px',
      height: (height - 40) + 'px'
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'assets/data.json'
      )
      .subscribe((data: any) => {
        this.rowData = data;
      });


    this.stretchGrid(window.innerWidth, window.innerHeight);
    this.gridApi.sizeColumnsToFit();
  }


 onQuickFilterChanged(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
  }
}

