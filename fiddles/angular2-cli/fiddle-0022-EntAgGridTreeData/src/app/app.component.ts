import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild('agGrid') agGrid;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];

  private style: { width: string; height: string };

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Athconste',
        field: 'athconste',
        width: 150
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 90
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 120,
        enableRowGroup: true
      },
      {
        headerName: 'Year',
        field: 'year',
        width: 90
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 110,
        comparator: dateComparator
      },
      {
        headerName: 'Medals',
        children: [
          {
            headerName: 'Total',
            field: 'total',
            columnGroupShow: 'closed',
            width: 125
          },
          {
            headerName: 'Gold',
            field: 'gold',
            columnGroupShow: 'open',
            width: 125
          },
          {
            headerName: 'Silver',
            field: 'silver',
            columnGroupShow: 'open',
            width: 125
          },
          {
            headerName: 'Bronze',
            field: 'bronze',
            columnGroupShow: 'open',
            width: 125
          }
        ]
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
  }

  printState() {
    const colState = this.gridColumnApi.getColumnState();
    const groupState = this.gridColumnApi.getColumnGroupState();
    const sortState = this.gridApi.getSortModel();
    const filterState = this.gridApi.getFilterModel();
    console.log('***********************');
    console.log('colState: ', colState);
    console.log('groupState: ', groupState);
    console.log('sortState: ', sortState);
    console.log('filterState: ', filterState);
    console.log('***********************');
  }

  saveState() {
    window.localStorage['fiddle-0021-columnState'] = JSON.stringify(this.gridColumnApi.getColumnState());
    window.localStorage['fiddle-0021-groupState'] = JSON.stringify(this.gridColumnApi.getColumnGroupState());
    window.localStorage['fiddle-0021-sortModel'] = JSON.stringify(this.gridApi.getSortModel());
    window.localStorage['fiddle-0021-filterState'] = JSON.stringify(this.gridApi.getFilterModel());
    console.log('column state saved');
  }

  restoreState() {

    const columnState: any = window.localStorage['fiddle-0021-columnState'],
      groupState: any = window.localStorage['fiddle-0021-groupState'],
      sortModel: any = window.localStorage['fiddle-0021-sortModel'],
      filterState: any = window.localStorage['fiddle-0021-filterState'];

    if (columnState) {
      this.gridColumnApi.setColumnState(JSON.parse(columnState));
    }
    if (groupState) {
      this.gridColumnApi.setColumnGroupState(JSON.parse(groupState));
    }
    if (sortModel) {
      this.gridApi.setSortModel(JSON.parse(sortModel));
    }
    if (filterState) {
      this.gridApi.setFilterModel(JSON.parse(filterState));
    }
    console.log('column state restored');
  }

  resetState() {
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.resetColumnGroupState();
    this.gridApi.setSortModel(null);
    this.gridApi.setFilterModel(null);
    console.log('column state reset');
  }

  showAthconste(show) {
    this.gridColumnApi.setColumnVisible('athconste', show);
  }

  showMedals(show) {
    this.gridColumnApi.setColumnsVisible(['total', 'gold', 'silver', 'bronze'], show);
  }

  pinAthconste(pin) {
    this.gridColumnApi.setColumnPinned('athconste', pin);
  }

  pinAge(pin) {
    this.gridColumnApi.setColumnPinned('age', pin);
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      .subscribe((data: any) => {
        this.rowData = data;
      });

    params.api.addGlobalListener(function(type, event) {
      if (type.indexOf('column') >= 0) {
        console.log('Got column event: ', event);
      }
    });

    this.stretchGrid(window.innerWidth, window.innerHeight);
  }
}

function dateComparator(date1, date2) {
  const date1Number = monthToComparableNumber(date1);
  const date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = date.substring(6, 10);
  const monthNumber = date.substring(3, 5);
  const dayNumber = date.substring(0, 2);
  const result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return result;
}
