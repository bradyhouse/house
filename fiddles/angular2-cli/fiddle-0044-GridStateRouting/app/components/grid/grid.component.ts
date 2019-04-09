import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions, GridApi, RowNode, RowRenderer} from 'ag-grid/main';
import 'ag-grid-enterprise/main';

@Component({
    selector: 'grid-component',
    templateUrl: './app/components/grid/grid.component.html',
    directives: [[AgGridNg2]]
})
export class GridComponent {

    @Output() rowselected:EventEmitter<any> = new EventEmitter();
    @Output() ready:EventEmitter<any> = new EventEmitter();
    @Output() valuechange:EventEmitter<any> = new EventEmitter();
    @Output() beforefilter:EventEmitter<any> = new EventEmitter();
    @Output() filter:EventEmitter<any> = new EventEmitter();
    @Output() filtermodified:EventEmitter<any> = new EventEmitter();
    @Output() afterfilter:EventEmitter<any> = new EventEmitter();


    @Input() width:number;
    @Input() height:number;
    @Input() rowData:any;
    @Input() columnDefs:Array<any>;

    private _api:GridApi;

    onRowSelected($event):void {
        let selectedRow:any = null;
        if ($event.node.selected && this._api) {
            let floatingRows:Array<any> = this.filterRowData($event.node.id, true);
            this._api.setFloatingTopRowData(floatingRows);
        } else {
            this._api.setFloatingTopRowData([]);

        }
        selectedRow = this._api.floatingRowModel.floatingTopRows.length ? this._api.floatingRowModel.floatingTopRows[0] : null;
        this.rowselected.emit(selectedRow);
    }

    onCellValueChanged($event) {
        this.valuechange.emit($event);
    }

    onGridReady($event) {
        this._api = $event.api;
        this.ready.emit($event);
    }

    onBeforeFilterChanged() {
        this.beforefilter.emit(this.filterModel);
    }

    onFilterChanged() {
        this.filter.emit(this.filterModel);
    }

    onAfterFilterChanged() {
        this.afterfilter.emit(this.filterModel);
    }

    onFilterModified() {
        this.filtermodified.emit(this.filterModel);
    }

    get gridHeight():number {
        return this.height ? this.height : window.innerHeight;
    }

    get gridOptions():GridOptions {
        return {
            showToolPanel: false,
            enableFilter: true,
            rowHeight: 35,
            enableColResize: true,
            enableSorting: true,
            suppressContextMenu: true,
            suppressMenuMainPanel: true,
            suppressMenuColumnPanel: true,
            getRowStyle: function (params) {
                if (params.node.floating) {
                    return {'font-weight': 'bold'}
                }
            },
            floatingTopRowData: []
        }
    }

    get filterModel():any {
        return this._api ? this._api.filterManager.getFilterModel() : null;
    }

    filterRowData(index:number):Array<any> {
        return this.rowData.filter(function (row:any, i:number) {
            if (i === index) {
                return row;
            }
        });
    }

}

