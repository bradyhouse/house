import { Component }                            from '@angular/core';
import { ActivatedRoute, Router, RouteSegment } from '@angular/router';
import { Observable }                           from 'rxjs/Observable';
import { DataService }                          from '../../global/data.service';
import {GridComponent}                          from '../../components/grid/grid.component';
import {GridOptions, GridApi}                   from 'ag-grid/main';
import { Base }                                 from '../../components/base';

import 'jquery';
import 'jquery-csv';
import 'jquery';

declare let jQuery:any;


@Component({
    selector: 'content-detail',
    templateUrl: './app/content/content-detail/content-detail.component.html',
    styleUrls: ['./app/content/content-detail/content-detail.component.css'],
    directives: [[GridComponent]],
    providers: []
})
export class ContentDetailComponent extends Base {
    columnDefs:Array<any> = [];
    isLoaded:boolean = false;

    private _width:number;
    private _height:number;
    private _rowData:Array<any> = [];

    constructor(private _route:ActivatedRoute,
                private _dataService:DataService,
                private _router:Router) {
        super();

        this.subscriptions.push(_dataService.responseChange$
            .subscribe(
                (response:any) => this.onResponseChange(response)
            ));

        this.subscriptions.push(
            this._router
                .routerState
                .queryParams
                .subscribe(params => this.onRouteQueryParamsChange(params)
                ));


    }

    onRouteQueryParamsChange(params:any) {
        console.log('content-detail.component > onRouteQueryParamsChange');
        let id = params && params.hasOwnProperty("id") ? params["id"] : <string>null,
            defaultReport = this._dataService.reports[0],
            report = id === "0" ? this._dataService.reports[0] : this._dataService.reports.filter((report:any) => {
                return report.url === id;
            }).pop();
        console.log('params' + params);
        console.log('id = ' + id);
        console.log('report = ' + report);
        if (report) {
            this._dataService.selectedReportId = report.name;
        } else {
            this._dataService.selectedReportId = defaultReport.name;
        }
    }


    onWindowResize() {
        this._width = jQuery('.content-component').width();
        this._height = jQuery('.sidebar-component').height();
    }

    onResponseChange(response:any) {
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
        return this.width;
    }

    get gridHeight() {
        return this.height;
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
