import {Component} from 'angular2/core';
import {DataJsonApi} from './DataJsonApi.ts';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';


@Component({
    selector: 'app',
    template: `
    <div class="enter-stage-south">
        <div class="col-lg-12">
            <div class="page-header">
                <h4 id="navbar">&nbsp;Angular 2 - AgGrid ({{total}} Records)</h4>
            </div>
            <div class="row">
                <ag-grid-ng2 class="ag-fresh" style="height: {{height}}px; width: 100%;" [enableSorting]="true"  [columnDefs]="columnDefs"   [rowData] = "rowData"></ag-grid-ng2>
            </div>
        </div>
    </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2],
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
export class View implements OnInit {
    constructor(private dataJsonApi:DataJsonApi) {
        this.height = window.innerHeight - 200;
    }
    ngOnInit() {
        this.dataJsonApi.request().subscribe((res:Response) => {
            this.total = res.total;
            if (res.data) {
                this.columnDefs = this.parseColumns(res.data[0]);
                this.dataJsonApi.request().subscribe((res:Response) => {
                    if (res) {
                        this.rowData = res.data;
                    }
                });
            }
        });
    }
    parseColumns(rec) {
        var columns = [];
        if (rec) {
            Object.keys(rec).map(function (key) {
                columns.push(
                    {headerName: key, field: key}
                );
            });
        }
        return columns;
    }
}

