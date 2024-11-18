import {Component, OnDestroy} from '@angular/core';
import {GridComponent} from '../components/grid/grid.component';
import {DataService} from '../global/data.service';
import {GridOptions, GridApi} from 'ag-grid/main';
import 'jquery';
import 'jquery-csv';

declare let jQuery:any;

@Component({
     selector: 'content',
     templateUrl: './app/content/content.component.html',
     styleUrls: ['./app/content/content.component.css'],
     directives: [[GridComponent]],
     providers: []
})
export class ContentComponent implements OnDestroy {

     columnDefs:Array<any> = [];
     isLoaded:boolean = false;

     private _rowData:Array<any> = [];
     private _responseChangeObserver:any;
     private _width:number;
     private _height:number;


     constructor(private _dataService:DataService) {
          console.log('content constructor');

          this._responseChangeObserver = _dataService.responseChange$
               .subscribe(
                    (response:any) => this.onResponseChange(response)
               );

          _dataService.request(_dataService.reports[0].url);

     }

     ngOnDestroy() {
          this._responseChangeObserver.unsubscribe();
     }

     onResponseChange(response:any) {
          console.log('content - onResponseChange');
          this._rowData = response.data;
          this.columnDefs = this.parseColumns(response.cols);
          window.setTimeout(() => {
               window.dispatchEvent(new Event('resize'));
               this.isLoaded = true;
          }, 500);
     }

     onWindowResize() {
          this._width = jQuery('.content-component').width();
          this._height = jQuery('.sidebar-component').height();
     }

     onReady($event) {
          console.log('content - grid.onReady');
          this._dataService.gridApi = $event.api;
     }


     get rowData() {
          return this._rowData;
     }

     get width() {
          if (!this._width) {
               this._width = jQuery('.content-component').width();
          }
          return this._width;
     }

     get height() {
          if (!this._height) {
               this._height = jQuery('.sidebar-component').height();

          }
          return this._height;
     }

     get gridWidth() {
          return this.width - 10;
     }
     get gridHeight() {
          return this.height - 20;
     }


     private parseColumns(ids:Array<string>):Array<any> {
          let columns:Array<any> = [];

          columns.push({headerName: '', width: 35, checkboxSelection: true, pinned: 'left'});
          ids.map(function (id:string) {
               columns.push(
                    {headerName: id, field: id}
               );
          });
          return columns;
     }




}
