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

  onGridReady(params: any) {
    console.debug(this.constructor.name + '.onGridReady');
    this._gridApi = params.api;
    this._stretchGrid(window.innerWidth, window.innerHeight);
    this._gridApi.sizeColumnsToFit();    
  }

  onSelectionChanged(event: any) {
    console.debug(this.constructor.name + '.onSelectionChanged');
    console.debug(event);
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
    console.clear();
    console.debug(this.constructor.name + '.onRowClicked');
    const _isExpanded: boolean = params.node.expanded;
    console.debug(this.constructor.name + ' params.node.expanded = ' + _isExpanded);
    const _actionType = params.event.target.getAttribute('grid-action');
    console.debug('params');
    console.debug(params); 
    console.debug('actionType = ' + _actionType);
    if (_actionType) {
      switch(_actionType) {
        case 'none':
          return false;
        case 'request':
          params.event.target.setAttribute('style', 'display: none !important');
          this.events.emit({
            type: AgTreeGridEvents.nodeRequest,
            data: params
          });
          return false;
        default:
          params.node.setExpanded(!_isExpanded);
          if (!_isExpanded) {
            this.events.emit({
              type: AgTreeGridEvents.expandBubble,
              data: params
            });
          }
      }
    }
  }

  onRowGroupOpened(params: any) {
    console.debug(this.constructor.name + '.onRowGroupOpened');
    const _isExpanded: boolean = params.node.expanded;
    console.debug(this.constructor.name + ' params.node.expanded = ' + _isExpanded);
    console.debug(params);
    const _node: any = params.node;
    const _level: number = _node.level;
    const _children: any[] = _level === 1 ? _node.allLeafChildren : [];
    const _pseudoChild: any = _children.length === 1 ? _children[0] : null;
    const _firstChild: any = _node.allLeafChildren.length > 0 ? _node.allLeafChildren[0] : null;
    const _model: any = _pseudoChild && _pseudoChild.data ? _pseudoChild.data : null;
    console.debug('this._isLoading(_model, loading...) = ' + this._isLoading(_model, 'loading...'));
    if (this._isLoading(_model, 'loading...')) {
      params.node.setExpanded(false);
      return false;
    } else if ( _level === 1 && _firstChild && _firstChild.data && this._isLoading(_firstChild.data, 'loading...')) {
      this._gridApi.updateRowData({ remove: [_firstChild.data] });
    }      
  }

  // #endregion

  // #region internal methods

  private _isLoading(obj: any, query: string): boolean {
    if (obj && query) {
      for (const key in obj) {
        const value = obj[key];
        if (typeof value !== 'object' && String(value).toLowerCase().trim() === query.toLowerCase().trim()) {
          console.debug(obj);
          return true;
        }
      }
    }
    return false;
  }

  private _bubble(params: any) {
    const _isExpanded: boolean = params.node.expanded;
    
  }

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
        case 'nodesRequest':
        item.currentValue.then((data: any) => {
          this._gridApi.updateRowData({ add: data });
        });
        break;
    }
  }

  // #endregion
}
