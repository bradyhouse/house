import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';

import {  ICellRendererComp, ICellRendererParams } from 'ag-grid/main'; 

import {
  AgTreeGridOptions,
  AgTreeGridEvent
} from './interfaces/index';

import {
  AgTreeGridCmds,
  AgTreeGridEvents
} from './enums/index';

import { Events } from '../interfaces/events';
import { truncate } from 'fs';


@Component({
  selector: 'app-ag-tree-grid',
  templateUrl: 'ag-tree-grid.component.html',
  styleUrls: ['ag-tree-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgTreeGridComponent implements OnChanges, DoCheck {

  @ViewChild('agGrid') agGrid: HTMLElement;
  @Output() events: EventEmitter<AgTreeGridEvent>;
  @Input() options: AgTreeGridOptions;
  
  // #region Internal Properties
  private _firstCellParams: ICellRendererParams;
  private _differ: KeyValueDiffer<any, any>;
  private _isUpdate: boolean;
  private _gridApi: any;
  private _columnDefs: any;
  private _rowSelection: any;
  private _autoGroupColumnDef: any;
  private _defaultColDef: any;
  private _rowData: any;
  private _style: { width: string; height: string };

  //#endregion

  // #region Constructor

  constructor(private _differs: KeyValueDiffers) {

    this.events = new EventEmitter();
    this._rowSelection = 'multiple';
    this._defaultColDef = {
      sortable: true,
      resizable: true,
      suppressMenu: true,
      filter: 'agTextColumnFilter'
    };
    this._autoGroupColumnDef = {
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true,
        suppressCount: true
       }
    };

  }

  // #endregion

  // #region OnChanges Implementation

  ngOnChanges(changes: any): void {
    console.debug(this.constructor.name + '.ngOnChanges');

    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create();
      }
    }
  }

  // #endregion

  // #region DoCheck Implementation

  ngDoCheck(): void {
    if (this._differ) {
      const changes: any = this._differ.diff(this.options);
      if (changes) {
        changes.forEachChangedItem((item: any) => {
          this._applyChange(item);
        });
        changes.forEachAddedItem((item: any) => {
          this._applyChange(item);
        });
      }
    }
  }

  // #endregion

  // #region Event Handlers

  onResize(event: any): void {
    console.debug(this.constructor.name + '.onResize');

    this._stretchGrid(event.target.innerWidth, event.target.innerHeight);
  }

  /*onSelectionChanged() {
    const selectedRows = this._gridApi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach((selectedRow, index) => {
      if (index > 5) {
        return;
      }
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    if (selectedRows.length >= 5) {
      selectedRowsString += ' - and ' + (selectedRows.length - 5) + ' others';
    }
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }*/

  onGridReady(params: any) {
    console.debug(this.constructor.name + '.onGridReady');
    this._gridApi = params.api;
    this._stretchGrid(window.innerWidth, window.innerHeight);
    this._gridApi.sizeColumnsToFit();    
  }

  onModelUpdated(event: any) {
    
    console.debug(this.constructor.name + '.onModelUpdated');
    this.events.emit({
      type: AgTreeGridEvents.expandBubble,
      data: event
    });
  }

  onSelectionChanged(event: any) {
    console.debug(this.constructor.name + '.onSelectionChanged');
    this.events.emit({
      type: AgTreeGridEvents.selectBubble,
      data: event
    });
  }

  onQuickFilterChanged(event: any) {
    console.debug(this.constructor.name + '.onQuickFilterChanged');
   
    this._gridApi.setQuickFilter(event.target.value);
  }

  onRowClicked(params: any) {
    console.debug(this.constructor.name + '.onRowClicked');
     console.debug(params);
     if (params.node.expanded) {
      params.node.expanded = false; 
     } else {
      params.node.expanded = true; 
     }
     this._gridApi.onGroupExpandedOrCollapsed(params.rowIndex)
  }

  onCellRender(params: ICellRendererParams) {
    if (!this._firstCellParams) {
      this._firstCellParams = params;
      console.debug(this.constructor.name + '.onCellRender');
      console.debug(params);
    }
    switch(params.node.field) {
      case 'country':
        return '<mat-icon class="pull-left mdi mdi-chevron-up" aria-hidden="true"></mat-icon>&nbsp;<i>' + params.node.field + '</i>:&nbsp;' + params.value;
      case 'sport':
        return '&#9;<mat-icon class="mdi mdi-chevron-up" aria-hidden="true"></mat-icon>&nbsp;<i>'+ params.node.field + '</i>:&nbsp;' +  params.value;
      default: 
        return '<span style="color: blue; padding: 5px;">' +  params.value + '</span>';
    }

  }

  // #endregion

  // #region internal methods

  private _stretchGrid(width: number, height: number): void {
    console.debug(this.constructor.name + '._stretchGrid');

    this._style = {
      width: width + 'px',
      height: (height - 40) + 'px'
    };
  }

  private _applyChange(item: any): void {
    console.debug(this.constructor.name + '._applyChange');
    switch (item.key) {
      case 'columnDefs':
        this._columnDefs = this.options.columnDefs;
        break;
      case 'rowData':
        this._rowData = this.options.rowData;
        break;
      case 'autoGroupColumnDef':

        

        this._autoGroupColumnDef = this.options.autoGroupColumnDef;
        break;
    }
  }

  // #endregion
}
