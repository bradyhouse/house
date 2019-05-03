import { AfterViewInit, Component } from '@angular/core';
import { AgTreeGridImpl, AgTreeGridOptions, AgTreeGridEvent} from './ag-tree-grid/interfaces/index';
import { AgTreeGridEvents } from './ag-tree-grid/enums/index';
import { HttpClient } from '@angular/common/http';
import {  ICellRendererComp, ICellRendererParams } from 'ag-grid/main'; 

type Branch = {
  country: string;
  sport: string;
  athlete: string;
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
    headerName: '',
    field: 'athlete',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { checkbox: true,
      suppressCount: false,
      innerRenderer: (params: ICellRendererParams) => this._onCellRender(params)
    }
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
        'assets/data.json'
      )
      .subscribe((data: any) => {
        this.options.rowData = this._trunkFactory(data);
        console.clear();
      });
  }

  // #endregion
  // #region AgTreeGridImpl implementation
  
  AgTreeGridOnEvent(event: AgTreeGridEvent): void {
    console.debug(this.constructor.name + '.onEvents');
    switch(event.type) {
      case AgTreeGridEvents.selectBubble:
        console.debug('select bubble'); 
        console.debug(event.data.api.getSelectedRows());
        console.debug('grid state:');
        console.debug(event.gridState);
        break;
      case AgTreeGridEvents.nodeRequest:
        console.debug('node request');
        this.options.nodesRequest = this._requestPromiseFactory(event.data);
        break;
    }
  }

  // #endregion
  // #region internal methods

  private _trunkFactory(data: any[]): Branch[] {
    console.debug(this.constructor.name + '._trunkFactory');
    let _branchMap: any = {};
    data.forEach((row: any) => {
       const _id: string = row.country + '-' + row.sport;
       const _branch: Branch = { country: row.country, sport: row.sport, athlete: 'loading...' };
       if(!_branchMap[_id]) {
         _branchMap[_id] = _branch;
       }      
    });
    const _branchKeys = Object.keys(_branchMap);
    const _trunk = _branchKeys.map((_branchKey: any) => { return _branchMap[_branchKey]; });
    console.debug('data: ');
    console.debug(_trunk);
    return _trunk;
  }

  private _leafFactory(data: any[], country: string, sport: string) {
    console.debug(this.constructor.name + '._trunkFactory');
    let _branchMap: any = {};
    
    data.forEach((node: any) => {
      if(node.country.toLowerCase().trim() === country.toLowerCase().trim() && 
         node.sport.toLowerCase().trim() === sport.toLowerCase().trim()) {
          const _id: string = node.country + '-' + node.sport + '-' + node.athlete;
          const _branch: Branch = { country: node.country, sport: node.sport, athlete: node.athlete };
          if(!_branchMap[_id]) {
            _branchMap[_id] = _branch;
          }   
      }
    });
    const _branchKeys = Object.keys(_branchMap);
    const _leaves = _branchKeys.map((_branchKey: any) => { return _branchMap[_branchKey]; });
    return _leaves;
  }

  _requestPromiseFactory(data: any): Promise<any> {
    console.debug(this.constructor.name + '._requestPromiseFactory');
    if (data && data.node) {
      const _node: any = data.node;
      const _sport: string = _node.key;
      const _country: string = _node.parent.key;
      const _firstChild: any = _node.allLeafChildren.length > 0 ? _node.allLeafChildren[0] : null;
      console.debug('sport = ' + _sport);
      console.debug('country = ' + _country);
      return this._http.get('assets/data.json')
      .toPromise()
      .then((res: any) => {
        console.debug('fetch > then > res:');
        window.setTimeout(() => {
          _node.setExpanded(true);
        }, 500);
        return this._leafFactory(res, _country, _sport);
      })
      .catch(this._onFetchError);
    }
    return Promise.reject('Invalid Parameters');
  }

  private _onFetchError(error:any) {
    if (error) {
      console.error(error);
    }
  }

  private _onCellRender(params: ICellRendererParams) {
    if (!this._firstCellParams) {
      this._firstCellParams = params;
      console.debug(this.constructor.name + '.onCellRender');
      console.debug(params);
    }
    switch(params.node.field) {
      case 'sport':
        return '<span grid-action="none">' + params.value + '</span>' + '<mat-icon class="mdi mdi-plus-box float-right" grid-action="request" aria-hidden="true"></mat-icon>';
      default: 
        return params.value;
    }
  }


  // #endregion

}

