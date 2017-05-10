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

import {
  EventsService,
  ResizeService,
  NodeService
} from './services/index';

import {
  NavBarCmds,
  NavBarEvents
} from './nav-bar/enums/index';

import {
  NavBarOptions,
  NavBarEvent
} from './nav-bar/interfaces/index';

import {
  Options
} from './interfaces/index';


declare let Slick: any;

@Component({
  selector: 'tree-grid',
  moduleId: module.id,
  templateUrl: 'tree-grid.component.html',
  styleUrls: ['tree-grid.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    EventsService,
    ResizeService,
    NodeService
  ]
})
export class TreeGridComponent implements OnChanges, AfterViewInit, DoCheck {

  @Output() events: EventEmitter<any>;
  @Input() options: Options;
  @ViewChild('containerEl') containerEl: ElementRef;
  @ViewChild('gridEl') gridEl: ElementRef;

  filter: string;
  loading: boolean;
  navBarOptions: NavBarOptions;

  private _differ: KeyValueDiffer<string, any> = null;
  private _grid: any;
  private _gridOptions: any;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _differs: KeyValueDiffers,
    private _resizeService: ResizeService,
    private _eventService: EventsService,
    private _nodesService: NodeService
  ) {
    this.loading = true;
    this.filter = null;
    this.events = new EventEmitter();
    this._gridOptions = {
      nodeHeight: 27,
      headerRowHeight: 0,
      topPanelHeight: 0,
      showHeaderRow: false,
      editable: false
    };
    this.navBarOptions = {
      commands: [
        NavBarCmds.ClearSelected,
        NavBarCmds.ExpandAll,
        NavBarCmds.SelectAll,
        NavBarCmds.Reload,
        NavBarCmds.ShowSelected
      ]
    };
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
      if (changes) this._applyChanges(changes);
    }
  }

  ngAfterViewInit(): void {
    this.containerEl.nativeElement.setAttribute('class', 'tree-grid-container');
  }

  onNavBarChanged(event: NavBarEvent) {
    switch(event.event) {
      case NavBarEvents.filter:
        this.filter = event.data;
        this._nodesService.dataView.refresh();
        break;
      case NavBarEvents.menu:
        switch(event.cmd) {
          case NavBarCmds.ShowSelected:
            this.filter = this.navBarOptions.filter = null;
            this.filter = this.navBarOptions.filter = 'selected';
            this._nodesService.dataView.refresh();
            break;
          case NavBarCmds.ClearSelected:
            this.filter = this.navBarOptions.filter = null;
            this._nodesService.clearAll();
            break;
          case NavBarCmds.ExpandAll:
            this._nodesService.expandAll();
            break;
          case NavBarCmds.CollapseAll:
            this._nodesService.collapseAll();
          case NavBarCmds.Reload:
            break;
          case NavBarCmds.SelectAll:
            this._nodesService.selectAll();
            break;
        }
        break;
    }
  }

  private _applyChanges(changes: any): void {
    if (changes) {
      changes.forEachItem((item:any) => {
        switch(item.key) {
          case 'nodes':
            if (this.options.nodes && this.options.nodes.length) {
              this._nodesService.nodes = this._nodesService.transform(
                this.options.nodes, []
              );
              if (!this._grid) {
                this._renderDOM();
                this._initDOMServices();
              } else {
                this._updateDOM();
              }
            }
            break;
          case 'menuOptions':
            if (this.options.menuOptions) {
              this.navBarOptions.commands = this.options.menuOptions;
            }
            break;
        }
      })
    }

  }

  private _renderDOM(): void {
    this._nodesService.dataView = new Slick.Data.DataView();
    this._nodesService.dataView.inlineFilters = true;
    this._nodesService.dataView.setItems(this._nodesService.nodes);
    this._nodesService.dataView.setFilter((node: any) => {
      return this._nodesService.filter(node, this.filter);
    });
    this._grid = new Slick.Grid(this.gridEl.nativeElement, this._nodesService.dataView, this._nodesService.schema, this._gridOptions);
    this.loading = false;

  }

  private _initDOMServices(): void {
    this._resizeService.init(this.containerEl.nativeElement, this._grid);
    this._eventService.init(this._grid, this._nodesService.dataView, this.events);
  }

  private _updateDOM(): void {
    if (this._differ) {
      this._nodesService.dataView.setItems(this._nodesService.nodes);
    }
  }

}
