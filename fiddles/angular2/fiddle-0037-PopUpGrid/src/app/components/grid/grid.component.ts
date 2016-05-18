import {Component, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridService} from './grid.service';


@Component({
    selector: 'grid-component',
    templateUrl: './app/components/grid/grid.component.html',
    styleUrls: ['./app/components/grid/grid.component.css'],
    directives: [[AgGridNg2]],
    providers: [HTTP_PROVIDERS, GridService]
})
export class GridComponent implements OnInit {

    columnDefs:any;
    rowData:any;
    total:number;


    constructor(private dataJsonApi:GridService) {}

    ngOnInit() {
        this.dataJsonApi.request().subscribe((res:any) => {
            this.total = res.total;
            if (res.data) {
                this.columnDefs = this.parseColumns(res.data[0]);
                this.dataJsonApi.request().subscribe((res:any) => {
                    if (res) {
                        this.rowData = res.data;
                    }
                });
            }
        });
    }
    parseColumns(rec:any):Array<any> {
        let columns:Array<any> = [];
        if (rec) {
            Object.keys(rec).map(function (key:any) {
                columns.push(
                    {headerName: key, field: key}
                );
            });
        }
        return columns;
    }
    get height():number {
        return window.innerHeight - 125;
    }
    get gridOptions():any {
        return {
            showToolPanel: true,
            enableFilter: true,
            enableColResize: true,
            rowSelection: 'single',
            enableSorting: true
        }
    }
}

