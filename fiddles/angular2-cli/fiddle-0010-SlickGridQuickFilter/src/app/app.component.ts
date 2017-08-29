import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {SlickGridAutoSizeService} from './slick-grid-auto-size.service';
import {SlickGridResizeService} from './slick-grid-resize.service';

declare let Slick: any, $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SlickGridAutoSizeService, SlickGridResizeService]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('table') table: ElementRef;
  @ViewChild('container') container: ElementRef;
  private _grid: any;
  private _dataView: any;

  height: number;

  constructor(private _slickGridAutoSizeService: SlickGridAutoSizeService,
              private _slickGridResizeService: SlickGridResizeService) {
    this.height = window.innerHeight;
  }

  ngAfterViewInit() {
    this._slickGridAutoSizeService.table = this.table.nativeElement;
    this._slickGridResizeService.init(this.container.nativeElement, this._slickGridAutoSizeService);
    this._render();
  }


  private _render() {
    let alphabet: string = 'abcdefghijklmnopqrstuvwxyz',
      columns: any[] = alphabet.split('').map((l: any, i: number) => {
        return {
          id: l,
          field: l,
          name: String(l).toUpperCase(),
          forceWidth: true
        }
      }),
      _columnFilters: any = {},
      filter: Function = (item) => {
        for (var columnId in _columnFilters) {
          if (columnId !== undefined && _columnFilters[columnId] !== "") {
            var c: any = this._grid.getColumns()[this._grid.getColumnIndex(columnId)];
            if (item[c.field] != _columnFilters[columnId]) {
              return false;
            }
          }
        }
        return true;
      },
      options: any = {
        enableCellNavigation: true,
        showHeaderRow: true,
        explicitInitialization: true,
        headerRowHeight: 30
      },
      data: any[] = [];


    for (var i = 0; i < 150000; i++) {
      let item: any = {};
      item['id'] = i;
      alphabet.split('').forEach((l: string, li: number) => {
        if (li === 0) {
          item[l] = i;
        } else {
          item[l] = Math.round(Math.random() * 1000);
        }
      });

      data[i] = item;

    }


    this._dataView = new Slick.Data.DataView();
    this._dataView.setItems(data);
    this._dataView.setFilter(filter);
    this._grid = new Slick.Grid(this.table.nativeElement, this._dataView, columns, options);
    this._slickGridAutoSizeService.grid = this._grid;
    this._slickGridAutoSizeService.autoSizeColumns();

    this._dataView.onRowCountChanged.subscribe((e, args)=> {
      this._grid.updateRowCount();
      this._grid.render();
    });

    this._dataView.onRowsChanged.subscribe((e, args) => {
      this._grid.invalidateRows(args.rows);
      this._grid.render();
    });


    $(this._grid.getHeaderRow()).delegate(":input", "change keyup", (e) => {
      var columnId = $(e.currentTarget).data('columnId');
      if (columnId !== null) {
        _columnFilters[columnId] = $.trim($(e.currentTarget).val());
        this._dataView.refresh();
      }
    });

    this._grid.onHeaderRowCellRendered.subscribe((e, args) => {
      $(args.node).empty();
      $("<input type='text'>")
        .data("columnId", args.column.id)
        .val(_columnFilters[args.column.id])
        .width('calc(92%)')
        .height('calc(.8em)')
        .appendTo(args.node);
    });

    this._grid.init();
    this._grid.invalidate();
    this._grid.render();

    let mainGrid = $('.grid').eq(2),
      colFixedGrid = $('.grid').eq(1);

    colFixedGrid.find('.slick-header').height(mainGrid.find('.slick-header').height());
    colFixedGrid.find('.slick-header-columns').height(mainGrid.find('.slick-header-columns').outerHeight() * 3);
    colFixedGrid.find('.slick-header-column').outerHeight(colFixedGrid.find('.slick-header-columns').height());

  }


}
