import {Component, OnInit} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {VerticalbarService} from './verticalbar.service';
import {VerticalbarD3} from './verticalbar-d3';
//import {VerticalBarOptionsInterface} from './verticalbar-options.interface';

declare let d3:any;


@Component({
    selector: 'verticalbar',
    template: `<div class="{{uiCls}}-scrollbox" style="width: {{width}}px; height: {{height}}px;">
                <verticalbar-d3 [options]="chartOptions" [data]="data"></verticalbar-d3>
               </div>`,
    styleUrls: [
      'src/verticalbar/verticalbar.css'
    ],
    inputs: ['uiCls', 'height', 'width', 'nodes', 'url'],
    directives: [VerticalbarD3],
    providers: [HTTP_PROVIDERS, VerticalbarService]
})
export class Verticalbar implements OnInit {
    data:any[];
    height:Number;
    width:Number;
    nodes:String[];
    url:String;
    uiCls:String;
    constructor(private verticalBarService:VerticalbarService) {
        this.data = [];
    }
    ngOnInit() {
        let me = this;
        this.verticalBarService.request(this.url).subscribe((res:any) => {
            var store = [];
            if (res.children && this.nodes.length) {
                this.nodes.map(function (node) {
                    var titleNodes = res.children.filter(function (child:any) {
                        return child.title == node;
                    });
                    if (titleNodes.length) {
                        titleNodes.map(function (titleNode:any) {
                            if (!titleNode.leaf) {
                                titleNode.children.map(function (child:any) {
                                    store.push(child);
                                });
                            }
                        }, store);
                    }
                }, store);
            }
            me.bind(store);
        });
    }
    bind(data) {
        let root = {
            key: this.nodes,
            values: []
        };
        data.sort(function (a:any, b:any) {
            return parseFloat(a.checking) - parseFloat(b.checking);
        });
        data.map(function (item:any) {
            var namePieces = item.name.split(' '),
                lastName = namePieces && namePieces.length > 1 ? namePieces[1].toUpperCase() : item.name.toUpperCase();
            root.values.push({
                "label": lastName,
                "color": parseFloat(item.checking) < 0 ? "red" : "green",
                "value": item.latitude,
                "elementClick": function() {
                    alert(item.checking);
                }
            });
        }, root);
        this.data.push(root);
    }
    get chartOptions() {
        return {
            width: this.width,
            height: this.height
        }
    }
}
