import { AfterViewInit, Component } from '@angular/core';
import { AgTreeGridImpl, AgTreeGridOptions, AgTreeGridEvent} from './ag-tree-grid/interfaces/index';
import { AgTreeGridEvents } from './ag-tree-grid/enums/index';
import { HttpClient } from '@angular/common/http';
import {  ICellRendererComp, ICellRendererParams } from 'ag-grid/main'; 

type Branch = {
  country: string;
  sport: string;
};


@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit, AgTreeGridImpl {

  // #region properties 

  options: AgTreeGridOptions;

  autoGroupColumnDef: any = {
    headerName: 'Athlete',
    field: 'athlete',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { checkbox: true,
      suppressCount: false,
      innerRenderer: (params: ICellRendererParams) => this._onCellRender(params)
    }
    //cellRenderer: (params: ICellRendererParams) => this._onCellRender(params),
    //cellRendererParams: { checkbox: true,
    //  suppressCount: true
    //}
  };

  columnDef: any[] = [
    {
      headerName: 'Gold',
      field: 'gold',
      width: 100,
      aggFunc: 'sum',
      hide: true
    },
    {
      headerName: 'Silver',
      field: 'silver',
      width: 100,
      aggFunc: 'sum',
      hide: true
    },
    {
      headerName: 'Bronze',
      field: 'bronze',
      width: 100,
      aggFunc: 'sum',
      hide: true
    },
    {
      headerName: 'Total',
      field: 'total',
      width: 100,
      aggFunc: 'sum',
      hide: true
    },
    {
      headerName: 'Age',
      field: 'age',
      width: 90,
      checkboxSelection: true,
      aggFunc: 'sum',
      hide: true
    },
    {
      headerName: 'Country',
      field: 'country',
      width: 120,
      rowGroupIndex: 0,
      hide: true
    },
    {
      headerName: 'Year',
      field: 'year',
      width: 90,
      hide: true
    },
    {
      headerName: 'Date',
      field: 'date',
      width: 110,
      hide: true
    },
    {
      headerName: 'Sport',
      field: 'sport',
      width: 110,
      rowGroupIndex: 1,
      hide: true
    }
  ];

  // #endregion
  // #region internal properties

  private _firstCellParams: ICellRendererParams;

  // #endregion
  // #region constructor 
  constructor(private _http: HttpClient) {
    this.options = {
      autoGroupColumnDef: this.autoGroupColumnDef,
      columnDefs: this.columnDef
    }
  }
  // #endregion
  // #region AfterViewInit implementation
  
  ngAfterViewInit(): void {
    console.debug(this.constructor.name + '.ngAfterViewInit');
    this._http
      .get(
        './assets/data.json'
      )
      .subscribe((data: any) => {
        this.options.rowData = data;
        console.clear();
      });
  }

  // #endregion
  // #region AgTreeGridImpl implementation
  
  agTreeGridOnEvent(event: AgTreeGridEvent): void {
    console.debug(this.constructor.name + '.onEvents');
    switch(event.type) {
      case AgTreeGridEvents.selectBubble:
        console.debug('select bubble'); 
        console.debug(event.data.api.getSelectedRows());
        break;
    }

  }
  // #endregion
  // #region internal methods

  private _trunkFactory(data: any[]): Branch[] {
    let _branchMap: any = {};
    data.forEach((row: any) => {
       const _id: string = row.country + '-' + row.sport;
       const _branch: Branch = { country: row.country, sport: row.sport };
       if(!_branchMap[_id]) {
         _branchMap[_id] = _branch;
       }      
    });
    const _branchKeys = Object.keys(_branchMap);
    return _branchKeys.map((_branchKey: any) => { return _branchMap[_branchKey]; });
  }

  private _onCellRender(params: ICellRendererParams) {
    if (!this._firstCellParams) {
      this._firstCellParams = params;
      console.debug(this.constructor.name + '.onCellRender');
      console.debug(params);
    }
    /*switch(params.node.field) {
      case 'country':
        return params.value;
      case 'sport':
        return '&#9;<mat-icon class="mdi mdi-chevron-up" aria-hidden="true"></mat-icon>&nbsp;<i>'+ params.node.field + '</i>:&nbsp;' +  params.value;
      default: 
        return '<span style="color: blue; padding: 5px;">' +  params.value + '</span>';
    }*/
    return params.value;
  }


  // #endregion

}

