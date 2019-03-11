import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MockApiService } from './mock-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockApiService]
})
export class AppComponent {
  gridOptions: GridOptions;
  initialRowDataLoad$;
  rowDataUpdates$;

  constructor(mockApiService: MockApiService) {
    this.initialRowDataLoad$ = mockApiService.initialLoad();
    this.rowDataUpdates$ = mockApiService.byRowupdates();

    this.gridOptions = <GridOptions> {
      enableRangeSelection: true,
      columnDefs: this.createColumnDefs(),
      getRowNodeId: (data: any) => {
        // the code is unique, so perfect for the id
        return data.code;
      },
      onGridReady: () => {
        this.initialRowDataLoad$.subscribe(
          rowData => {
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) { // can be null when tabbing between the examples
              this.gridOptions.api.setRowData(rowData);
            }

            // now listen for updates
            // we process the updates with a transaction - this ensures that only the changes
            // rows will get re-rendered, improving performance
            this.rowDataUpdates$.subscribe((updates) => {
              if (this.gridOptions.api) { // can be null when tabbing between the examples
                this.gridOptions.api.updateRowData({update: updates});
              }
            });
          }
        );
      },

      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
    };
  }

  private createColumnDefs() {
    return [
      {headerName: 'Code', field: 'code', width: 70, resizable: true},
      {headerName: 'Name', field: 'name', width: 280, resizable: true},
      {
        headerName: 'Bid', field: 'bid', width: 100, resizable: true,
        cellClass: 'cell-number',
        valueFormatter: this.numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Mid', field: 'mid', width: 100, resizable: true,
        cellClass: 'cell-number',
        valueFormatter: this.numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Ask', field: 'ask', width: 100, resizable: true,
        cellClass: 'cell-number',
        valueFormatter: this.numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Volume', field: 'volume', width: 100, resizable: true,
        cellClass: 'cell-number',
        cellRenderer: 'agAnimateSlideCellRenderer'
      }
    ]
  }

  numberFormatter(params) {
    if (typeof params.value === 'number') {
      return params.value.toFixed(2);
    } else {
      return params.value;
    }
  }
}
