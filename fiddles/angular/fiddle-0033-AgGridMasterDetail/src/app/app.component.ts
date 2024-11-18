import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AllModules } from '@ag-grid-enterprise/all-modules';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  public modules: any[] = AllModules;
  private columnDefs;
  private detailCellRendererParams;
  private rowData;

  constructor(private http: Http) {
    this.columnDefs = [
      {
        field: 'name',
        cellRenderer: 'agGroupCellRenderer'
      },
      { field: 'account' },
      { field: 'calls' },
      {
        field: 'minutes',
        valueFormatter: 'x.toLocaleString() + "m"'
      }
    ];
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          { field: 'number' },
          {
            field: 'duration',
            valueFormatter: 'x.toLocaleString() + "s"'
          },
          { field: 'switchCode' }
        ],
        onFirstDataRendered: function(params) {
          params.api.sizeColumnsToFit();
        }
      },
      getDetailRowData: function(params) {
        params.successCallback(params.data.callRecords);
      }
    };
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
    setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json'
      )
      .map((res: Response) => res.json())
      .subscribe(data => {
        console.log(typeof data);
        this.rowData = data;
      });
  }
}