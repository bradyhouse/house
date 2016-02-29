import {Component, View} from 'angular2/core';
import * as core from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Chart} from './Chart';
import {Tree} from './tree/Tree';
import {TreeNode} from './tree/TreeNode';
import {DataJsonApi} from './DataJsonApi';
import * as meta from '../meta';



@Component({
    selector: 'content',
    template: `
     <div class="wrapper" style="height: {{height}}px;">
        <tree [uiClass]="treeClass" [height]="treeHeight" [url]="treeUrl"></tree>
        <div class="main">
                <chart *ngFor="#chartObj of charts" [model]='chartObj'
                    style="width: 100%; height: {{mainItemHeight}}px;">
                </chart>
                <ag-grid-ng2 class="ag-fresh"
                    style="width: 100%; height: {{mainItemHeight}}px; color: black;"
                    [gridOptions]="gridOptions"
                    [columnDefs]="columnDefs"
                    [rowData] = "rowData">
                </ag-grid-ng2>
        </div>
    </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2, Chart, Tree],
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
export class Content implements OnInit {
    charts:Chart[];

    constructor(private dataJsonApi:DataJsonApi) {
        this.treeNodes=[]
        this.treeUrl=meta.urls.data;
        this.treeClass= "west col-sm-1";
    }

    ngOnInit() {
        this.dataJsonApi.request().subscribe((res:Response) => {
            var accounts = [];

            if (res.children) {

                res.children.map(function(parentNode) {
                    var childNodes = [];
                    if(!parentNode.leaf) {
                        parentNode.children.map(function(child) {
                            childNodes.push(new TreeNode(child.title, []);
                        });
                    }
                    childNodes.sort(function(a, b) {
                        return a.name < b.name;
                    });
                    this.treeNodes.push(new TreeNode(parentNode.title, childNodes));
                    if(parentNode.children) {
                        accounts = accounts.concat(parentNode.children);
                    }
                }, this);


                this.columnDefs = this.parseColumns(accounts[0]);
                this.configureChart(accounts);
                this.rowData = accounts;

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
                        "color": "#000000"

                    }
                },
                backgroundColor: "#ffffff",
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
                if (key !== 'leaf' && key !== 'title') {
                    columns.push(
                        {headerName: key, field: key}
                    );
                }
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

    get treeHeight() {
        return this.height - 50;
    }

    get mainItemHeight() {
        return Math.floor(this.height / 2);
    }

}
