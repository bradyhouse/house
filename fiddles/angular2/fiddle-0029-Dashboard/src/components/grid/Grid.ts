import {Component, View, OnChanges} from 'angular2/core';
import {Http, Headers, Response, HTTP_PROVIDERS} from 'angular2/http';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';
import {GridDataService} from './store/GridDataService';

import 'ag-grid-enterprise/main';

@Component({
    selector: 'grid',
    moduleId: module.id,
    inputs: ['height', 'url', 'filter'],
    providers: [HTTP_PROVIDERS, GridDataService]
})
@View({
    templateUrl: 'grid.html',
    directives: [AgGridNg2]
})
export class GridController implements OnChanges {

    private _gridOptions:GridOptions;
    private _rows:Object[] = [];
    private _columns:Object[] = [];
    private _rowCount:string;
    public filter:String[];
    public height:Number;
    public url:string;

    constructor(private gridDataService:GridDataService) {
        this._gridOptions = <GridOptions>{};
    }
    private ngOnChanges() {
        this.configureRows();
    }

    private configureRows() {
        this._rows = [];
        this.gridDataService.request(this.url).subscribe((res:Response) => {
            var rows = [];
            this.filter.map(function (node) {
                var titleNodes = res.children.filter(function (child) {
                    return child.title == node;
                });
                if (titleNodes.length) {
                    titleNodes.map(function (titleNode) {
                        if (!titleNode.leaf) {
                            titleNode.children.map(function (child) {
                                rows.push(child);
                            });
                        }
                    }, rows);
                }
            }, rows);
            this.configureColumns(rows[0]);
            this._rows = rows;
        });
    }

    private configureColumns(rec) {
        var columns = [];
        if (rec) {
            this._columns = [];
            Object.keys(rec).map(function (key) {
                if (key !== 'leaf' && key !== 'title') {
                    columns.push(
                        {headerName: key, field: key}
                    );
                }
            });
            this._columns = columns;
        }
    }

    private calculateRowCount() {
        if (this.gridOptions.api && this.rows.length) {
            var model = this.gridOptions.api.getModel();
            var totalRows = this.rowData.length;
            var processedRows = model.getRowCount();
            this._rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    }

    public get rows() {
        return this._rows;
    }

    public get columns() {
        return this._columns;
    }

    public get rowCount() {
        return this._rowCount;
    }

    public get gridOptions() {
        return this._gridOptions;
    }

    private onModelUpdated() {
        this.calculateRowCount();
    }

    private onReady() {
        this.calculateRowCount();
    }

    private onCellClicked($event) {

    }

    private onCellValueChanged($event) {

    }

    private onCellDoubleClicked($event) {

    }

    private onCellContextMenu($event) {

    }

    private onCellFocused($event) {

    }

    private onRowSelected($event) {

    }

    private onSelectionChanged() {

    }

    private onBeforeFilterChanged() {

    }

    private onAfterFilterChanged() {

    }

    private onFilterModified() {

    }

    private onBeforeSortChanged() {

    }

    private onAfterSortChanged() {

    }

    private onVirtualRowRemoved($event) {

    }

    private onRowClicked($event) {

    }

    private onQuickFilterChanged($event) {

    }

    private onColumnEvent($event) {

    }

}
