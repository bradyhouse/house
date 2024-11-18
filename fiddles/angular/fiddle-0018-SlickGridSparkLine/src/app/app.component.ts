import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {SlickGridAutoSizeService} from './slick-grid-auto-size.service';
import {SlickGridResizeService} from './slick-grid-resize.service';

declare let Slick: any, $: any, moment: any;

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

  tooltipFormatter(sparkline: any, options: any, fields: any) {
    switch(fields.color) {
      case 'white':
        switch (fields.percent) {
          case 25:
            return 'Stage 3';
          case 50:
            return 'Stage 2';
          default:
            return 'Stage 1';
        }
      default:
        switch (fields.percent) {
          case 25:
            return 'Stage 1';
          case 50:
            return 'Stage 2';
          case 75:
            return 'Stage 3';
          default:
            return 'Stage 4';
        }
    }

  }

  sparkLineRender(cellNode: any, row: any, dataContext: any, colDef: any) {
    const vals: any[] = [
      dataContext['n2'], dataContext['n1']

      ],
    cell: any = $(cellNode);

    if (cell && cell.empty()) {
      cell.empty().sparkline(
        vals, {
          type: 'pie',
          sliceColors: ['white', 'green'],
          borderWidth: 1,
          offset: -90,
          tooltipFormatter: (sparkline: any, options: any, fields: any) => this.tooltipFormatter(sparkline, options, fields)
        }
      );
    }
  }

  waitingFormatter(value: any) {
    return 'loading...';
  }

  private _render() {
    const alphabet = '',
      chartColumns: any[] = [{
        id: 'run',
        field: 'run',
        name: 'Run #',
        forceWidth: true
      },{
        id: 'runTime',
        field: 'runTime',
        name: 'Time',
        forceWidth: true
      },{
        id: 'stage',
        field: 'n1'
      },{
        id: 'chart',
        name: 'Stage',
        sortable: false,
        formatter: (value: any) => this.waitingFormatter(value),
        rerenderOnResize: true,
        asyncPostRender: (cellNode: any, row: any, dataContext: any, colDef: any) => this.sparkLineRender(cellNode, row, dataContext, colDef)
      }],
      visibleChartColumns: any[] = [{
        id: 'run',
        field: 'run',
        name: 'Run #',
        forceWidth: true
      },{
        id: 'runTime',
        field: 'runTime',
        name: 'Time',
        forceWidth: true
      },{
        id: 'chart',
        name: 'Stage',
        sortable: false,
        formatter: (value: any) => this.waitingFormatter(value),
        rerenderOnResize: true,
        asyncPostRender: (cellNode: any, row: any, dataContext: any, colDef: any) => this.sparkLineRender(cellNode, row, dataContext, colDef)
      }],
      dataColumns: any[] = alphabet.split('').map((l: any, i: number) => {
        return {
          id: l,
          field: l,
          name: String(l).toUpperCase(),
          forceWidth: true
        };
      }),
      columns: any[] = dataColumns.concat(chartColumns),
      visibleColumns: any[] = dataColumns.concat(visibleChartColumns),
      _columnFilters: any = {},
      filter: Function = (item) => {
        console.log(item);
        for (const columnId in _columnFilters) {
          if (columnId !== undefined && _columnFilters[columnId] !== '') {
            if (columnId === 'chart') {
              const val:string = String(item['n1']);
              if (val !== _columnFilters['chart']) {
                return false;
              }
            } else {
              const c: any = this._grid.getColumns()[this._grid.getColumnIndex(columnId)],
                val: string = String(item[c.field]),
                filterVal: string = String(_columnFilters[columnId]);
              if (val.indexOf(filterVal) === -1) {
                return false;
              }
            }
          }
        }
        return true;
      },
      options: any = {
        enableCellNavigation: true,
        showHeaderRow: true,
        explicitInitialization: true,
        headerRowHeight: 30,
        enableAsyncPostRender: true
      },
      data: any[] = [];

    let date: Date = new Date();

    for (let i = 0; i < 100; i++) {
      const item: any = {},
        rndNum: number = Math.round(Math.random() * 4),
        phase: number = rndNum === 0 ? 1 : rndNum,
        phaseRemainder: number = 4 - phase;
      item['id'] = i;
      alphabet.split('').forEach((l: string, li: number) => {
        if (li === 0) {
          item[l] = i;
        } else {
          item[l] = Math.round(Math.random() * 1000);
        }
      });
      date = moment(date).add(60, 'm').toDate();
      item['run'] = i + 1;
      item['runTime'] = moment(date).format('HH:mm');
      item['n1'] = phase;
      item['n2'] = phaseRemainder;

      data[i] = item;

    }


    this._dataView = new Slick.Data.DataView();
    this._dataView.setItems(data);
    this._dataView.setFilter(filter);
    this._grid = new Slick.Grid(this.table.nativeElement, this._dataView, columns, options);
    this._slickGridAutoSizeService.grid = this._grid;
    this._slickGridAutoSizeService.autoSizeColumns();

    this._dataView.onRowCountChanged.subscribe((e, args) => {
      this._grid.updateRowCount();
      this._grid.render();
    });

    this._dataView.onRowsChanged.subscribe((e, args) => {
      this._grid.invalidateRows(args.rows);
      this._grid.render();
    });


    $(this._grid.getHeaderRow()).delegate(':input', 'change keyup', (e) => {
      const columnId = $(e.currentTarget).data('columnId');
      if (columnId !== null) {
        _columnFilters[columnId] = $.trim($(e.currentTarget).val());
        this._dataView.refresh();
      }
    });

    this._grid.onHeaderRowCellRendered.subscribe((e, args) => {
      $(args.node).empty();
      $('<input type=\'text\'>')
        .data('columnId', args.column.id)
        .val(_columnFilters[args.column.id])
        .width('calc(92%)')
        .height('calc(.8em)')
        .appendTo(args.node);
    });

    this._grid.init();
    this._grid.invalidate();
    this._grid.render();
    this._grid.setColumns(visibleColumns);



    const mainGrid = $('.grid').eq(2),
      colFixedGrid = $('.grid').eq(1);

    colFixedGrid.find('.slick-header').height(mainGrid.find('.slick-header').height());
    colFixedGrid.find('.slick-header-columns').height(mainGrid.find('.slick-header-columns').outerHeight() * 3);
    colFixedGrid.find('.slick-header-column').outerHeight(colFixedGrid.find('.slick-header-columns').height());

  }


}
