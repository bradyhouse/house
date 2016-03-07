import {Component, View, OnChanges} from 'angular2/core';
import * as core from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Chart} from './chart/Chart';
import {TreeController} from './tree/Tree';
import {TreeNode} from './tree/TreeNode';
import {DataJsonApi} from './DataJsonApi';
import * as meta from '../meta';

@Component({
    selector: 'content',
    providers: [HTTP_PROVIDERS, DataJsonApi]
})
@View({
    template: `
     <div class="wrapper" style="height: {{height}}px;">
        <tree [uiClassPrefix]="treeClass" class="tree" (nodeCheckChange)="onTreeNodeCheckChange($event)" [height]="treeHeight" [url]="treeUrl"></tree>
        <div class="main">
                <chart [uiCls]="chartConfig.uiCls" [nodes]="selectedNodes" [height]="chartHeight" [url]="chartConfig.url"></chart>
                <ag-grid-ng2 class="ag-fresh"
                    style="width: 100%; height: {{gridHeight}}px; color: black;"
                    [gridOptions]="gridOptions"
                    [columnDefs]="columnDefs"
                    [rowData] = "rowData">
                </ag-grid-ng2>
        </div>
    </div>`,
    directives: [(<any>window).ag.grid.AgGridNg2, Chart, TreeController]

})
export class ContentController {
    _selectedNodes: String[] = [];

    constructor(private dataJsonApi:DataJsonApi) {
        this.chartData=[];
        this.treeNodes=[];
        this.treeUrl=meta.urls.data;
        this.treeClass= "tree";
        this.rowData = [];
        this.columnDefs = [];
    }
    configureGrid() {
        this.rowData = [];
        this.columnDefs = [];

        this.dataJsonApi.request().subscribe((res:Response) => {
            var accounts = [];
            this.selectedNodes.map(function(node) {
                 var titleNodes = res.children.filter(function (child) {
                     return child.title == node;
                 });
                 if (titleNodes.length) {
                     titleNodes.map(function (titleNode) {
                         if (!titleNode.leaf) {
                             titleNode.children.map(function (child) {
                                 accounts.push(child);
                             });
                         }
                     }, accounts);
                 }
            }, accounts);

            this.columnDefs = this.parseColumns(accounts[0]);
            this.rowData = accounts;
        });
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
    onTreeNodeCheckChange(event) {
        var me = this;
        me._selectedNodes = [];
        event.nodes.map(function(node){
            me._selectedNodes.push(node);
        }, me);
        me.configureGrid();
    }
    get selectedNodes() {
        return this._selectedNodes;
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

    get gridHeight() {
        return this.rowData.length > 0 ? Math.floor(this.height / 2) - 4 : 0;
    }

    get chartHeight() {
        return this.rowData.length > 0 ? Math.floor(this.height / 2) - 4 : this.height - 4;

    }

    get treeHeight() {
        return this.height - 50;
    }

    get chartConfig() {
        return {
            url: meta.urls.data,
            uiCls: "chart"
        }
    }
}
