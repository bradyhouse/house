import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit
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
  Options,
  OptionsChange
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
export class TreeGridComponent implements OnChanges, AfterViewInit {
  @Output() events: EventEmitter<any>;
  @Input() options: Options;
  @ViewChild('containerEl') containerEl: ElementRef;
  @ViewChild('gridEl') gridEl: ElementRef;

  filter: string;
  loading: boolean;
  navBarOptions: NavBarOptions;

  private _changes: OptionsChange;
  private _dataView: any;
  private _grid: any;
  private _gridOptions: any;

  constructor(private _resizeService: ResizeService,
              private _eventService: EventsService,
              private _nodesService: NodeService) {
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
    if (changes.options && changes.options.currentValue) {
      this._changes = this.parseOptionsChange(changes.options.previousValue, changes.options.currentValue);

      if (this._changes.menuOptions) {
        this.navBarOptions.commands = this.options.menuOptions;
      }

      if (this._changes.nodes) {
        this._nodesService.nodes = this._nodesService.transform(
          this.options.nodes, []
        );
        if (!this._grid) {
          this.renderDOM();
          this.initDOMServices();
        } else {
          this.updateDOM();
        }
      }

    }
  }

  ngAfterViewInit(): void {
    this.containerEl.nativeElement.setAttribute('class', 'acme-grid-container');
  }

  onNavBarChanged(event: NavBarEvent) {
    switch(event.event) {
      case NavBarEvents.filter:
        this.filter = event.data;
        this._dataView.refresh();
        break;
      case NavBarEvents.menu:
        switch(event.cmd) {
          case NavBarCmds.ShowSelected:
            this.filter = this.navBarOptions.filter = null;
            this.filter = this.navBarOptions.filter = 'selected';
            this._dataView.refresh();
            break;
          case NavBarCmds.ClearSelected:
            this.filter = this.navBarOptions.filter = null;
            this._eventService.clearSelectedRows();
            this._dataView.refresh();
            break;
          case NavBarCmds.ExpandAll:
            this._eventService.collapsedRows = [];
            this._nodesService.expandAll(this._dataView);
            this._dataView.refresh();
            break;
          case NavBarCmds.CollapseAll:
            this._eventService.collapsedRows = this._nodesService.collapseAll(this._dataView);
            this._dataView.refresh();
          case NavBarCmds.Reload:
            break;
          case NavBarCmds.SelectAll:
            this._eventService.selectedRows = this._nodesService.selectAll(this._dataView);
            this._dataView.refresh();
            break;
        }
        break;
    }
  }

  private parseOptionsChange(previousOptions: Options,
                             currentOptions: Options): OptionsChange {

    if (previousOptions && currentOptions) {
      return {
        nodes: JSON.stringify(previousOptions.nodes) !== JSON.stringify(currentOptions.nodes),
        menuOptions: JSON.stringify(previousOptions.menuOptions) !== JSON.stringify(currentOptions.menuOptions),
        filter: JSON.stringify(previousOptions.filter) !== JSON.stringify(currentOptions.filter)
      };
    }

    return {
      nodes: false,
      menuOptions: false,
      filter: false
    };
  }

  private renderDOM(): void {
    this._dataView = new Slick.Data.DataView();
    this._dataView.inlineFilters = true;
    this._dataView.setItems(this._nodesService.nodes);
    this._dataView.setFilter((node: any) => {
      return this.dataViewFilter(node);
    });
    this._grid = new Slick.Grid(this.gridEl.nativeElement, this._dataView, this._nodesService.schema, this._gridOptions);
    this.loading = false;
    window.setTimeout(() => {
      this._resizeService.resize();
    }, 66);
  }

  private initDOMServices(): void {
    this._resizeService.init(this.containerEl.nativeElement, this._grid);
    this._eventService.init(this._grid, this._dataView, this.events);
  }

  private updateDOM(): void {
    if (this._changes.nodes) {
      this._dataView.setItems(this._nodesService.nodes);
    }
  }

  private dataViewFilter(node: any): boolean {
    if (node.parent >= 0) {
      var parent = this._nodesService.nodes[node.parent];
      while (parent) {
        if (!parent.expanded) {
          return false;
        }
        parent = this._nodesService.nodes[parent.parent];
      }
    }
    return this.searchBarFilter(node);
  }

  private searchBarFilter(node: any): boolean {
    if (this.filter) {
      if (this.filter.toLowerCase().indexOf('selected')!== -1) {
        if (this._eventService.selectedRows.indexOf(node.id) !== -1) {
          return true;
        }
      }
      if (node['title'].toLowerCase() === this.filter.toLowerCase()) {
        return true;
      }
      if (node['title'].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    return true;
  }

}
