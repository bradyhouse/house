import {Component} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';
import {AppHeader} from './header/AppHeader';
import {Navigation} from './navigation/Navigation';
import {DataJsonApi} from './DataJsonApi';
import {ZingChart} from './ZingChart';

@Component({
    selector: 'app',
    template: `
    <r2d2-header></r2d2-header>
    <r2d2-navigation></r2d2-navigation>
      <div class="col-lg-10 r2d2-center">
        <div class="panel panel-default">
            <div class="enter-stage-south">
                <div class="container-fluid">
                    <div class="row">
                        <zingchart *ngFor="#chartObj of charts" [chart]='chartObj'></zingchart>
                    </div>
                    <div class="row">
                        <ag-grid-ng2 class="ag-dark fill" style="width: 100%; flex-direction: column; flex-grow: 1;"
                        [gridOptions]="gridOptions"
                        [columnDefs]="columnDefs"
                        [rowData] = "rowData">
                        </ag-grid-ng2>
                    </div>
                </div>
            </div>
        </div>
      </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2, ZingChart, AppHeader, Navigation],
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
export class View implements OnInit {
    charts : Chart[];
    header : string;
    constructor(private dataJsonApi:DataJsonApi) {
    }
    ngOnInit() {
        this.dataJsonApi.request().subscribe((res:Response) => {
            this.total = res.total;
            if (res.data) {
                this.columnDefs = this.parseColumns(res.data[0]);
                this.configureChart(res.data);
                this.dataJsonApi.request().subscribe((res:Response) => {
                    if (res) {
                        this.rowData = res.data;
                    }
                });
            }
        });
    }
    configureChart(data) {

        var ages = [],
            checking = [],
            savings = [];

        data.map(function(item) {
            ages.push(item.age);
            checking.push(item.checking);
            savings.push(item.savings);
        });

        this.charts = [{
            id : 'chart-1',
            align: 'center',
            width: "100%",
            data : {
                type: 'line',
                "plotarea":{
                    "adjust-layout":true
                },
                padding: "40px",
                "scale-x": {
                    "label": {
                        "text": "Checking vs. Savings",
                        "color": "#ffffff"

                    }
                },
                backgroundColor: "#333333",
                tooltip: {
                    padding: 5,
                    offsetY: -5,
                    borderColor: "none",
                    placement: "node:top",
                    borderRadius: 5,
                    text: "%plot-text <br> Value : %v"
                },
                series: [{
                    values: savings
                }, {
                    values: checking
                }]
            },
            height : 300
        }]
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
    get gridOptions() {
        return {
            showToolPanel: true,
            enableFilter: true,
            enableColResize: true,
            rowSelection: 'single',
            enableSorting: true
        }
    }
    get height() {
        return window.innerHeight - 400;
    }
    get header() {
        return metadata.fiddleHeader;
    }

}

