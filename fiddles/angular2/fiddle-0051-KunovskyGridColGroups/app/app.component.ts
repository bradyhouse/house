import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit
} from '@angular/core';

import { SlickGridColGroupService } from './slick-grid-col-group.service';
import { SlickGridAutoSizeService } from './slick-grid-auto-size.service';
import { SlickGridResizeService } from './slick-grid-resize.service';

declare let Slick:any;

@Component({
  selector: 'app',
  templateUrl: './app/app.component.html',
  providers: [SlickGridColGroupService, SlickGridAutoSizeService, SlickGridResizeService]
})
export class AppComponent implements AfterViewInit{
  @ViewChild('table') table:ElementRef;
  @ViewChild('container') container:ElementRef;
  private _grid: any;
  private _dataView: any;

  height: number;

  constructor(private _slickGridColGroupService: SlickGridColGroupService,
              private _slickGridAutoSizeService: SlickGridAutoSizeService,
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
                {id: l + '-1', name: String(l).toUpperCase() + 1, field: l +'-1', forceWidth: true},
                {id: l + '-2', name: String(l).toUpperCase() + 2, field: l + '-2', forceWidth: true}
              ]
            }
          }
        }),
        options: any = {
          editable: true,
          enableAddRow: true,
          enableCellNavigation: true,
          asyncEditorLoading: false,
          autoEdit: false,
          enableColumnReorder: false,
          frozenColumn: 2
        },
        data: any[] = [];


    for (var i = 0; i < 10; i++) {
      let item: any = {};
      item['id'] = i;
      alphabet.split('').forEach((l: string, li: number) => {
        if (li < 3) {
          item[l] = Math.round(Math.random() * 100);
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
    this._grid.registerPlugin(new Slick.Plugins.ColGroup(this._slickGridAutoSizeService));
    this._slickGridAutoSizeService.grid = this._grid;
    this._slickGridAutoSizeService.autoSizeColumns();
    this._grid.invalidate();
    this._grid.render();

  }


}
