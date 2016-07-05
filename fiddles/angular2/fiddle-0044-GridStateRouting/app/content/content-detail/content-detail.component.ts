import { Component }                                                    from '@angular/core';
import { ActivatedRoute, Router, RouteSegment }                         from '@angular/router';
import { Observable }                                                   from 'rxjs/Observable';
import { DataService }                                                  from '../../global/data.service';
import { GridComponent }                                                from '../../components/grid/grid.component';
import { GridOptions, GridApi, RowNode, ColDef, Filter }                from 'ag-grid/main';
import { Base }                                                         from '../../components/base';
import { QueryString }                                                  from '../../components/entities/query-string';

import 'jquery';
import 'jquery-csv';

declare let jQuery:any;


@Component({
    selector: 'content-detail',
    templateUrl: './app/content/content-detail/content-detail.component.html',
    styleUrls: ['./app/content/content-detail/content-detail.component.css'],
    directives: [[GridComponent]],
    providers: []
})
export class ContentDetailComponent extends Base {
    columnDefs:Array<ColDef> = [];
    isLoaded:boolean = false;

    private _width:number;
    private _height:number;
    private _rowData:Array<any> = [];
    private _queryString:QueryString;

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

    onRouteQueryParamsChange(params:any):void {
        console.log('content-detail.component > onRouteQueryParamsChange');
        this._queryString = new QueryString(params);
        this.restoreState();
    }

    onRowSelected(node:RowNode = null):void {
        let model:any = this.filterModel,
            reportUrl:string = this._dataService.reportNametoUrl(this._dataService.selectedReportId),
            headerId:string = node && node.data.hasOwnProperty("#") ? node.data["#"] : <string>null;
        console.log('content-detail.component > onRowSelected');
        this._queryString.h = encodeURIComponent(headerId);
        this.updateRoute(model, reportUrl, headerId);
    }

    onResponseChange(response:any):void {
        this._rowData = response.data;
        this.columnDefs = this.parseColumns(response.cols);
        window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            this.isLoaded = true;
        }, 500);
    }

    onAfterFilter(model:any):void {
        let reportUrl:string = this._dataService.reportNametoUrl(this._dataService.selectedReportId),
            headerId:string = this._queryString.headerRowId;
        console.log('content-detail.component > onAfterFilter');
        this.updateRoute(model, reportUrl, headerId);
    }

    onWindowResize():void {
        this._width = jQuery('.content-component').width();
        this._height = jQuery('.wrapper').height();
    }

    onReady($event):void {
        console.log('content-detail.component > onReady');
        this._dataService.gridApi = $event.api;
        this.restoreState();
    }

    get headerRow():Array<any> {
        let arr:Array<any> = [];
        if (this._rowData && this._queryString && this._queryString.headerRowId) {
            arr = this._rowData.filter((row:any) => {
                return row.hasOwnProperty("#") && row["#"].toLowerCase() === this._queryString.headerRowId;
            });
        }
        return arr;
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
            this._height = jQuery('.wrapper').height();
        }
        return this._height;
    }

    get gridWidth() {
        return this.width;
    }

    get gridHeight() {
        return this.height;
    }

    get filterModel():any {
        return this._dataService.gridApi ? this._dataService.gridApi.filterManager.getFilterModel() : null;
    }

    private queryStringContains(field:string):boolean {
        let key:string = field ? field.toUpperCase() : <string>null;
        return key && this._queryString ? this._queryString.contains(key) : false;
    }

    private parseColumns(ids:Array<string>):Array<ColDef> {
        let columns:Array<ColDef> = [],
            column:ColDef;

        columns.push({headerName: '', width: 35, checkboxSelection: true, pinned: 'left'});
        ids.map((id:string) => {
            column = {};
            column.headerName = id;
            column.field = id;
            column.filter = 'set';
            if (id === '#') {
                column.hide = true;
            }

            columns.push(column);
        });
        return columns;
    }

    private restoreState():void {
        this.restoreReportSelection();
        this.restoreColumnFilters();
        this.restoreRowSelection();
    }

    private restoreReportSelection():void {
        let id = this._queryString.reportUrl ? this._queryString.reportUrl : <string>null,
            defaultReport = this._dataService.reports[0],
            report = id === "0" ? defaultReport : this._dataService.reports.filter((report:any) => {
                return report.url === id;
            }).pop();

        if (report) {
            this._dataService.selectedReportId = report.name;
        } else {
            this._dataService.selectedReportId = defaultReport.name;
        }
    }

    private restoreRowSelection():void {
        let gridApi:GridApi = this._dataService.gridApi,
            row:any = this.headerRow && this.headerRow.length ? this.headerRow.shift() : null;

        if (gridApi && row) {
            gridApi.rowRenderer.rowModel.rowsToDisplay.map((node:RowNode) => {
                if (node.data["#"] === row["#"]) {
                    node.setSelected(true);
                    return;
                }
            });
        }
    }

    private restoreColumnFilters():void {
        let gridApi:GridApi = this._dataService.gridApi,
            filterApi:any,
            values:Array<string>;
        if (gridApi && this._queryString && this.columnDefs.length) {
            this.clearColumnFilters();
            this.columnDefs.map((colDef:ColDef) => {
                if (this.queryStringContains(colDef.field)) {
                    filterApi = gridApi.getFilterApi(colDef.field),
                        values = this._queryString.dictionary.getByKey(colDef.field);
                    if (filterApi && values && values.length) {
                        filterApi.selectNothing();
                        values.map((value:string) => {
                            filterApi.selectValue(value);
                        });
                    }
                }
            });
            gridApi.onFilterChanged();
        }
    }

    private clearColumnFilters():void {
        let gridApi:GridApi = this._dataService.gridApi,
            filterModel:any = gridApi ? gridApi.getFilterModel() : null,
            filterApi:any;
        if (gridApi && filterModel) {
            for (var filter:any in filterModel) {
                filterApi = gridApi.getFilterApi(filter);
                filterApi.selectEverything();
            }
        }
    }

    private updateRoute(filterModel:any = null, reportId:string = <string>null, headerId:string = <string>null):void {
        let gridApi:GridApi = this._dataService.gridApi,
            fields:Array<string> = [],
            fieldValues:Array<Array<string>> = [],
            values:Array<string> = [];
        console.log('content-detail.component > updateRoute');
        if (filterModel) {
            for (let key:string in filterModel) {
                if (filterModel[key].length) {
                    fields.push(key);
                    values = [];
                    values.push(key);
                    filterModel[key].map((value) => {
                        values.push(value);
                    });
                    fieldValues.push(values);
                }
            }
        }
        this._queryString.update(reportId, fields, fieldValues, headerId);
        this._router.navigate([''], this._queryString.toRouteSegment());
    }

}
