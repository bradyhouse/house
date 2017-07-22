import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit
} from '@angular/core';

import { SlickGridAutoSizeService } from './slick-grid-auto-size.service';
import { SlickGridResizeService } from './slick-grid-resize.service';

declare let Slick:any, $: any;

@Component({
  selector: 'app',
  templateUrl: './app/app.component.html',
  providers: [SlickGridAutoSizeService, SlickGridResizeService]
})
export class AppComponent implements AfterViewInit{
  @ViewChild('table') table:ElementRef;
  @ViewChild('container') container:ElementRef;
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
          if (i < 3) {
            return {
              id: l,
              field: l,
              name: String(l).toUpperCase(),
              forceWidth: true
            }
          } else {
            return {
              id: l,
              name: String(l).toUpperCase(),
              children: [
                {id: l + '-1', name: String(l).toUpperCase() + 1, field: l +'-1'},
                {id: l + '-2', name: String(l).toUpperCase() + 2, field: l + '-2'}
              ]
            }
          }
        }),
        options: any = {
          enableColumnReorder: false
        },
        data: any[] = [];


    for (var i = 0; i < 500; i++) {
      let item: any = {};
      item['id'] = i;
      alphabet.split('').forEach((l: string, li: number) => {
        if (li < 3) {
          if (li === 0) {
            item[l] = i;
          } else {
            item[l] = Math.round(Math.random() * 100);
          }
        } else {
          let field1: string = l + '-1',
              field2: string = l + '-2';
          item[field1] = Math.round(Math.random() * 1000);
          item[field2] = Math.round(Math.random() * 10);
        }
      });

      data[i] = item;

    }


    this._dataView = new Slick.Data.DataView();
    this._dataView.setItems(data);
    this._grid = new Slick.Grid(this.table.nativeElement, this._dataView, columns, options);
    this._grid.registerPlugin(new Slick.Plugins.ColFix('c'));
    this._grid.registerPlugin(new Slick.Plugins.ColGroup());
    this._slickGridAutoSizeService.grid = this._grid;
    this._slickGridAutoSizeService.autoSizeColumns();
    this._grid.invalidate();
    this._grid.render();

    let mainGrid = $('.grid').eq(2),
        colFixedGrid = $('.grid').eq(1);
    colFixedGrid.find('.slick-header').height(mainGrid.find('.slick-header').height());
    colFixedGrid.find('.slick-header-columns').height(mainGrid.find('.slick-header-columns').outerHeight() * 3);
    colFixedGrid.find('.slick-header-column').outerHeight(colFixedGrid.find('.slick-header-columns').height());

  }


}
