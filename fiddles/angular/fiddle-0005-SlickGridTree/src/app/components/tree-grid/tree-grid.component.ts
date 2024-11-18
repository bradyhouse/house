import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';


import {Subscriptions} from '../shared/subscriptions';

import {
  TreeGridEventsService,
  TreeGridResizeService,
  TreeGridNodeService
} from './services/index';

import {
  TreeGridInterface,
  TreeGridEventInterface
} from './interfaces/index';

import {
  TreeGridCmds,
  TreeGridEvents
} from './enums/index';

declare let Slick: any;

@Component({
  selector: 'tree-grid',
  moduleId: module.id,
  templateUrl: 'tree-grid.component.html',
  styleUrls: ['tree-grid.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    TreeGridEventsService,
    TreeGridResizeService,
    TreeGridNodeService
  ]
})
export class TreeGridComponent extends Subscriptions implements OnChanges, AfterViewInit, DoCheck {

  @Output() events: EventEmitter<TreeGridEventInterface>;
  @Input() options: TreeGridInterface;
  @ViewChild('containerEl') containerEl: ElementRef;
  @ViewChild('gridEl') gridEl: ElementRef;

  filter: string;
  height: number;
  loading: boolean;
  isDataValid: boolean;

  private _differ: KeyValueDiffer<string, any> = null;
  private _grid: any;
  private _gridOptions: any;
  private _renderTimeout: any;
  private _isUpdate: boolean;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              private _resizeService: TreeGridResizeService,
              private _eventService: TreeGridEventsService,
              private _nodesService: TreeGridNodeService) {
    super();
    this.loading = true;
    this.filter = null;
    this.events = new EventEmitter();
    this.height = 0;
    this._gridOptions = {
      nodeHeight: 27,
      headerRowHeight: 0,
      topPanelHeight: 0,
      enableColumnReorder: false,
      showHeaderRow: false,
      editable: false
    };
    this.isDataValid = false;


    this.subscriptions.push(_nodesService.selectedNodesChange$
      .subscribe(
        (nodes: any) => this.onSelectedNodesChange(nodes)
      ));

    this.subscriptions.push(_eventService.dataViewRowsChange$
      .subscribe(
        () => this.onDataViewRowsChange()
      ));

  }

  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create(this._changeDetector);
      }
    }
  }

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

  ngAfterViewInit(): void {
    this.containerEl.nativeElement.setAttribute('class', 'tree-grid-container');
  }

  onFilterChanged(filter: string): void {
    if (this.filter !== filter) {
      this.filter = filter;
      if (this._nodesService.dataView) {
        this._nodesService.dataView.refresh();
      }
    }
  }

  onDataViewRowsChange(): void {
    this._resize();
  }

  onWindowResize(): void {
    this._resize();
  }

  onSelectedNodesChange(nodes: any): void {
    this.events.emit({
      type: TreeGridEvents.nodeChange,
      data: nodes
    });
  }

  bubbleCmd(cmd: TreeGridCmds): void {
    this.events.emit({
      type: TreeGridEvents.cmd,
      data: cmd
    });
  }

  toggleLoader(state: boolean): void {
    this.loading = state;
    window.setTimeout(() => {
      if (!state) {
        this._resizeService.init(this.containerEl.nativeElement, this._grid, this.gridEl.nativeElement);
      }
    }, 66);
  }

  renderDOM(): void {
    if (Slick) {
      this._nodesService.dataView = new Slick.Data.DataView();
      this._nodesService.dataView.inlineFilters = true;
      this._nodesService.dataView.setItems(this._nodesService.nodes, 'order');
      this._nodesService.dataView.setFilter((node: any) => {
        return this._nodesService.filter(node, this.filter);
      });
      this._grid = new Slick.Grid(this.gridEl.nativeElement, this._nodesService.dataView, this._nodesService.schema, this._gridOptions);
    }
  }

  updateDOM(): void {

    this._nodesService.dataView.setItems(this._nodesService.nodes);
    this._isUpdate = true;

    if (this._renderTimeout) {
      clearTimeout(this._renderTimeout);
    }

    this._renderTimeout = setTimeout(() => {
      if (this._isUpdate === true) {
        this._isUpdate = false;
        this._grid.invalidate();
        this._grid.render();
      }
    }, 66);
  }

  initEventServices(): void {
    this._eventService.init(this._grid, this._nodesService.dataView, this.events);
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'nodes':
        if (this.options.nodes && this.options.nodes.length) {
          this.toggleLoader(true);
          this._nodesService.nodes = this._nodesService.transform(
            this.options.nodes
          );
          if (!this._grid) {
            this.renderDOM();
            this.initEventServices();
          } else {
            this.updateDOM();
          }
          this.toggleLoader(false);
        }
        break;
      case 'notification':
        break;
      case 'nodesRequest':
        item.currentValue.then((data: any) => {
          let node: any = this._nodesService.append(data.id, data.children);
          if (node && node.selected) {
            this._eventService.bubbleSelect(node, this.events);
          }
        });
        break;
      case 'nodesUpdate':
        item.currentValue.then((data: any) => {
          this._nodesService.updateNode(data.node, data.selected, data.expanded);
        });
        break;
      case 'filter':
        this.filter = this.options.filter;
        break;
      case 'macro':
        if (this.options.macro) {
          this._runCmdMacro(this.options.macro);
          this.options.macro = null;
        }
        break;
      case 'height':
        this.height = this.options.height;
        this._resize();
        break;
    }
  }

  private _resize(): void {
    if (this._grid) {
      this._resizeService.resize(this._grid, this.gridEl.nativeElement);
    }
  }

  private _runCmdMacro(cmd: TreeGridCmds): void {
    if (cmd) {
      switch (cmd) {
        case TreeGridCmds.ShowAll:
          this.filter = null;
          this._nodesService.dataView.refresh();
          break;
        case TreeGridCmds.ClearSelected:
          this._nodesService.deselectAll();
          break;
        case TreeGridCmds.ShowSelected:
          this.filter = 'selected';
          this._nodesService.dataView.refresh();
          break;
        case TreeGridCmds.CollapseAll:
          this._nodesService.collapseAll();
          break;
        case TreeGridCmds.ExpandAll:
          this._nodesService.expandAll();
          break;
        case TreeGridCmds.SelectAll:
          this._nodesService.selectAll();
          break;
        case TreeGridCmds.Reload:
          this.isDataValid = false;
          break;
      }
      this.bubbleCmd(cmd);
    }
  }


}
