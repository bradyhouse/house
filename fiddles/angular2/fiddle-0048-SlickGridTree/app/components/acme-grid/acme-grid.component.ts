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
  AcmeGridColumnsService,
  AcmeGridEventsService,
  AcmeGridResizeService,
  AcmeGridRowsService
} from './services/index';


declare let Slick: any;

@Component({
  selector: 'acme-grid',
  moduleId: module.id,
  templateUrl: './app/components/acme-grid/acme-grid.component.html',
  styleUrls: ['./app/components/acme-grid/acme-grid.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    AcmeGridColumnsService,
    AcmeGridEventsService,
    AcmeGridResizeService,
    AcmeGridRowsService
  ]
})
export class AcmeGridComponent implements OnChanges, AfterViewInit {
  @Output() events: EventEmitter<any>;
  @Input() options: any;
  @ViewChild('containerEl') containerEl: ElementRef;
  @ViewChild('gridEl') gridEl: ElementRef;

  loading: boolean;
  filterField: string;

  private _changes: any;
  private _dataView: any;
  private _grid: any;
  private _gridOptions: any;
  private _filter: string;

  constructor(private _resizeService: AcmeGridResizeService,
              private _eventService: AcmeGridEventsService,
              private _columnsService: AcmeGridColumnsService,
              private _rowsService: AcmeGridRowsService) {
    this.loading = true;
    this.filterField = 'title';
    this._filter = null;
    this.events = new EventEmitter();
    this._gridOptions = {
      rowHeight: 27,
      headerRowHeight: 0,
      topPanelHeight: 0,
      showHeaderRow: false,
      editable: false
    };
  }

  ngOnChanges(changes: any): void {
    if (changes.options && changes.options.currentValue) {
      this._changes = this.parseOptionsChange(changes.options.previousValue, changes.options.currentValue);

      if (this._changes.columns) {
        this._columnsService.columns = this._columnsService.transform(
          this.options.columns
        );
      }

      if (this._changes.rows) {
        this._rowsService.rows = this._rowsService.transform(
          this.options.rows, []
        );
      }

      if (this._changes.columns && this._changes.rows) {
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

  onFilterChanged(filter: string) {
    this._filter = filter;
    this._dataView.refresh();
  }

  private parseOptionsChange(previousOptions: any,
                             currentOptions: any): any {

    if (previousOptions && currentOptions) {
      return {
        rows: JSON.stringify(previousOptions.rows) !== JSON.stringify(currentOptions.rows),
        columns: JSON.stringify(previousOptions.columns) !== JSON.stringify(currentOptions.columns),
        hiddenColumns: JSON.stringify(previousOptions.hiddenColumns) !== JSON.stringify(currentOptions.hiddenColumns)
      };
    }

    return {
      rows: false,
      columns: false,
      hiddenColumns: false
    };
  }

  private renderDOM(): void {
    this._dataView = new Slick.Data.DataView();
    this._dataView.inlineFilters = true;
    this._dataView.setItems(this._rowsService.rows);
    this._dataView.setFilter((row: any) => {
      return this.dataViewFilter(row);
    });
    this._grid = new Slick.Grid(this.gridEl.nativeElement, this._dataView, this._columnsService.columns, this._gridOptions);
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
    if (this._changes.columns) {
      this._grid.setColumns(this._columnsService.columns);
      this._grid.setOptions(this._gridOptions);
    }

    if (this._changes.rows) {
      this._dataView.setItems(this._rowsService.rows);
    }
  }

  private dataViewFilter(row: any): boolean {
    if (row.parent >= 0) {
      var parent = this._rowsService.rows[row.parent];
      while (parent) {
        if (!parent.expanded) {
          return false;
        }
        parent = this._rowsService.rows[parent.parent];
      }
    }
    return this.searchBarFilter(row);
  }

  private searchBarFilter(row: any): boolean {
    if (this._filter) {
      if (row[this.filterField].toLowerCase() === this._filter.toLowerCase()) {
        return true;
      }
      if (row[this.filterField].toLowerCase().indexOf(this._filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    return true;
  }

}
