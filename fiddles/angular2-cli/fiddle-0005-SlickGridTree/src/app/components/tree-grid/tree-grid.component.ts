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
  FilterBarInterface
} from './filter-bar/index';

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
  width: number;
  height: number;
  loading: boolean;
  searchBarOptions: FilterBarInterface;

  private _differ: KeyValueDiffer<string, any> = null;
  private _grid: any;
  private _gridOptions: any;
  private _renderTimeout:any;
  private _isUpdate:boolean;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              private _resizeService: TreeGridResizeService,
              private _eventService: TreeGridEventsService,
              private _nodesService: TreeGridNodeService) {
    super();
    this.loading = true;
    this.filter = null;
    this.events = new EventEmitter();
    this.width = 0;
    this.height = 0;
    this._gridOptions = {
      nodeHeight: 27,
      headerRowHeight: 0,
      topPanelHeight: 0,
      showHeaderRow: false,
      editable: false
    };
    this.searchBarOptions = {
    };

    this.subscriptions.push(_nodesService.selectedNodesChange$
      .subscribe(
        (nodes: any) => this.onSelectedNodesChange(nodes)
      ));
  }

  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this._changeDetector);
        } catch (e) {
          throw new Error(
            `Cannot find a differ supporting object '${value}'`);
        }
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

  onSearchBarChanged(event: any) {
    switch (event.type) {
      case 'filter':
        this.filter = event.data;
        this._nodesService.dataView.refresh();
        break;
    }
  }

  onSelectedNodesChange(nodes: any) {
    this.events.emit({
      type: TreeGridEvents.nodeChange,
      data: nodes
    });
  }

  onFiltered() {
    this.events.emit({
      type: TreeGridEvents.filter,
      data: this.filter
    });
  }

  bubbleCmd(cmd: TreeGridCmds) {
    this.events.emit({
      type: TreeGridEvents.cmd,
      data: cmd
    });
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'nodes':
        if (this.options.nodes && this.options.nodes.length) {
          this._nodesService.nodes = this._nodesService.transform(
            this.options.nodes
          );
          if (!this._grid) {
            this._renderDOM();
            this._initDOMServices();
          } else {
            this._updateDOM();
          }
        }
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
        this.filter = this.searchBarOptions.filter = this.options.filter;
        break;
      case 'macro':
        if (this.options.macro) {
          this._runCmdMacro(this.options.macro);
          this.options.macro = null;
        }
        break;
      case 'height':
        this.height = this.options.height;
        if (this._grid) {
          this._resizeService.resize(this._grid, this.gridEl.nativeElement);
        }
        break;
    }
  }

  private _renderDOM(): void {

    this._nodesService.dataView = new Slick.Data.DataView();
    this._nodesService.dataView.inlineFilters = true;
    this._nodesService.dataView.setItems(this._nodesService.nodes, 'order');
    this._nodesService.dataView.setFilter((node: any) => {
      return this._nodesService.filter(node, this.filter);
    });
    this._grid = new Slick.Grid(this.gridEl.nativeElement, this._nodesService.dataView, this._nodesService.schema, this._gridOptions);
    this.loading = false;

  }

  private _initDOMServices(): void {
    this._resizeService.init(this.containerEl.nativeElement, this._grid, this.gridEl.nativeElement);
  }

  private _runCmdMacro(cmd: TreeGridCmds) {
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
          break;
      }
      this.bubbleCmd(cmd);
    }

  }

  private _updateDOM() {

    this._nodesService.dataView.setItems(this._nodesService.nodes);
    this._isUpdate = true;

    if (this._renderTimeout) {
      clearTimeout(this._renderTimeout);
    }

    this._renderTimeout = setTimeout(() => {
      if(this._isUpdate === true) {
        this._isUpdate = false;
        this._grid.invalidate();
        this._grid.render();
      }
    }, 66);
  }

 }
