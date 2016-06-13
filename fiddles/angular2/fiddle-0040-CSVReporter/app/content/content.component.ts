import {Component, OnDestroy} from '@angular/core';
import {GridComponent} from '../components/grid/grid.component';
import {DataService} from '../global/data.service';
import {GridOptions, GridApi} from 'ag-grid/main';

@Component({
     selector: 'content',
     templateUrl: './app/content/content.component.html',
     styleUrls: ['./app/content/content.component.css'],
     directives: [[GridComponent]],
     providers: [DataService]
})
export class ContentComponent implements OnDestroy {


     rowData:Array<any> = [];
     columnDefs:Array<any> = [];

     private _responseChangeObserver:any;


     constructor(private _dataService:DataService) {

          this._responseChangeObserver = _dataService.responseChange$
              .subscribe(
                  (response:any) => this.onResponseChange(response)
              );

          _dataService.request('report-b.csv');

     }

     ngOnDestroy() {
          this._responseChangeObserver.unsubscribe();
     }

     onResponseChange(response:any) {
          this.rowData = response.data;
          this.columnDefs = this.parseColumns(response.cols);

     }

     private get width() {
          return window.innerWidth - 256 - 20;
     }

     private get height() {
          return window.innerHeight - 20;
     }

     private parseColumns(ids:Array<string>):Array<any> {
          let columns:Array<any> = [];
          ids.map(function(id:string) {
               columns.push(
                   {headerName: id, field: id}
               );
          });
          return columns;
     }


}
