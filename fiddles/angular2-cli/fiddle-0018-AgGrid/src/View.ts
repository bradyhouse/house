import {Component} from 'angular2/core';
import {DataJsonApi} from './DataJsonApi.ts';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';


@Component({
    selector: 'app',
    template: `
    <div class="enter-stage-south">
        <div class="col-lg-12">
            <div class="page-header">
                <h4 id="navbar">&nbsp;Angular 2 - AgGrid ({{total}} Records)</h4>
            </div>
            <div class="row">
                <ag-grid-ng2 class="ag-dark" style="height: {{height}}px; width: 100%;"
                [gridOptions]="gridOptions"
                [columnDefs]="columnDefs"
                [rowData] = "rowData"></ag-grid-ng2>
            </div>
        </div>
    </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2],
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
export class View implements OnInit {
    constructor(private dataJsonApi:DataJsonApi) {}
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
    get height() {
        return window.innerHeight - 125;
    }
    get gridOptions() {
        return {
            showToolPanel: true,
            enableFilter: true,
            enableColResize: true,
            rowSelection: 'single',
            enableSorting: true
        }
    }
}

