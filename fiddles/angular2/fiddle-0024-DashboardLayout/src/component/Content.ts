import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Chart} from './Chart';
import {DataJsonApi} from './DataJsonApi';


@Component({
    selector: 'content',
    template: `
     <div class="wrapper" style="height: {{height}}px;">
        <div class="west">
            <ng-content select="[west]"></ng-content>
        </div>
        <div class="main">
                <chart *ngFor="#chartObj of charts" [model]='chartObj'
                    style="width: 100%; height: {{mainItemHeight}}px;">
                </chart>
                <ag-grid-ng2 class="ag-dark"
                    style="width: 100%; height: {{mainItemHeight}}px;"
                    [gridOptions]="gridOptions"
                    [columnDefs]="columnDefs"
                    [rowData] = "rowData">
                </ag-grid-ng2>
        </div>
    </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2, Chart],
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
export class Content implements OnInit {
    charts:Chart[];

    constructor(private dataJsonApi:DataJsonApi) {
        window.onresize = this.onWindowResize;
    }

    onWindowResize() {
        console.log('onWindowResize');
        var me = this;
        window.setTimeout(function () {

            $('chart').css('height', me.mainItemHeight);
            $('#chart-1').css('height', me.mainItemHeight);
            $('#chart-1-top').css('height', me.mainItemHeight);
            $('#chart-1-svg').height = me.mainItemHeight;
            $('#chart-1-svg').css('height', me.mainItemHeight);
            $('#chart-1-img').css('height', me.mainItemHeight);
        }, 1000);
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
        data.map(function (item) {
            ages.push(item.age);
            checking.push(item.checking);
            savings.push(item.savings);
        });
        this.charts = [{
            id: 'chart-1',
            data: {
                type: 'line',
                "plotarea": {
                    "adjust-layout": true
                },
                "padding": "40px",
                height: this.mainItemHeight,
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
            }
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
            enableFilter: true,
            enableColResize: true,
            rowSelection: 'single',
            enableSorting: true
        }
    }

    get height() {
        return window.innerHeight - 60;
    }

    get mainItemHeight() {
        return Math.floor(this.height / 2);
    }


}
