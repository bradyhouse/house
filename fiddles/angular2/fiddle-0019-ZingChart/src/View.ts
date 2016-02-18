import {Component} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';

import {DataJsonApi} from './DataJsonApi';
import {ZingChart} from './ZingChart';

@Component({
    selector: 'app',
    template: `
    <div class="enter-stage-south">
        <div class="col-lg-12">
            <div class="page-header">
                <h4 id="navbar">&nbsp;{{header}}</h4>
            </div>
            <div class="row">
                <zingchart *ngFor="#chartObj of charts" [chart]='chartObj'></zingchart>
            </div>
            <div class="row">
                <ag-grid-ng2 class="ag-fresh" style="height: {{height}}px; width: 100%;" [enableSorting]="true"  [columnDefs]="columnDefs"   [rowData] = "rowData"></ag-grid-ng2>
            </div>
        </div>
    </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2, ZingChart],
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
export class View implements OnInit {
    charts : Chart[];
    header : string;
    constructor(private dataJsonApi:DataJsonApi) {
        this.height = window.innerHeight - 200;
        this.header = metadata.fiddleHeader;

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
            checking.push(item.checkingBalance);
            savings.push(item.savingsBalance);
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
}

