import {Component, OnInit} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {ChartDataService} from './ChartDataService';
import {Nvd3Component} from './Nvd3Component';
declare let d3:any;


@Component({
    selector: 'chart',
    template: `
        <div class="{{uiCls}}-scrollbox" style="width: {{width}}px; height: {{height}}px;">
            <nvd3-component [options]="chartOptions" [data]="data"></nvd3-component>
        </div>
    `,
    styleUrls: ['css/chart.css'],
    inputs: ['uiCls', 'height', 'width', 'nodes', 'url'],
    directives: [Nvd3Component],
    providers: [HTTP_PROVIDERS, ChartDataService]
})
export class Chart implements OnInit {
    data:Object[];
    height:Number;
    width:Number;
    nodes:String[];
    url:String;
    uiCls:String;
    constructor(private chartDataService:ChartDataService) {
        this.data = [];
    }
    ngOnInit() {
        let me = this;
        this.chartDataService.request(this.url).subscribe((res:any) => {
            var store = [];
            if (res.children && this.nodes.length) {
                this.nodes.map(function (node) {
                    var titleNodes = res.children.filter(function (child) {
                        return child.title == node;
                    });
                    if (titleNodes.length) {
                        titleNodes.map(function (titleNode:any) {
                            if (!titleNode.leaf) {
                                titleNode.children.map(function (child) {
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
                "color": parseFloat(item.checking) < 0 ? "url(#yellowToRed)" : "url(#lightblueToBlue)",
                "value": item.checking,

                "elementClick": function() {
                    alert(item.checking);
                }
            });
        }, root);
        this.data.push(root);
    }

    private constrain(number, min, max) {
        let x = parseFloat(number);
        if (min === null) {
            min = number;
        }
        if (max === null) {
            max = number;
        }
        return (x < min) ? min : ((x > max) ? max : x);
    }

    get chartOptions() {
        let self:any = this;
        return {
            chart: {
                id: 'chart1',
                type: 'discreteBarChart',
                margin: {
                    top: 10,
                    right: 10,
                    bottom: 55,
                    left: 55
                },
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    let scale = Math.floor(d.value / 100000),
                        ret = (scale >= 0) ? self.constrain(scale, 0.05, 50) : self.constrain(scale, -50, -0.05);
                    return ret;
                },
                valueFormat: function(d) {
                    return d3.format(',4f')(d);
                },
                duration: 150,
                rotateLabels: 45,
                showValues: false,
                showLegend: true,
                staggerLabels: true,
                xAxis: {
                    label: 'Account',
                },
                yAxis: {
                    label: 'Checking Balance',
                },
                gradients: [{
                    type: "linearGradient",
                    attributes: {
                        id: "yellowToRed",
                        x1: "0%",
                        y1: "0%",
                        x2: "0%",
                        y2: "100%",
                        spreadMethod: "pad"
                    },
                    stops: [{
                        class: "yellow",
                        offset: "0%"
                    }, {
                        class: "red",
                        offset: "100%"
                    }]
                }, {
                    type: "linearGradient",
                    attributes: {
                        id: "redToYellow",
                        x1: "0%",
                        y1: "100%",
                        x2: "0%",
                        y2: "0%",
                        spreadMethod: "pad"
                    },
                    stops: [{
                        class: "red",
                        offset: "0%"
                    }, {
                        class: "yellow",
                        offset: "100%"
                    }]
                }, {
                    type: "linearGradient",
                    attributes: {
                        id: "lightblueToBlue",
                        x1: "0%",
                        y1: "100%",
                        x2: "0%",
                        y2: "0%",
                        spreadMethod: "pad"
                    },
                    stops: [{
                        class: "lightblue",
                        offset: "0%"
                    }, {
                        class: "blue",
                        offset: "100%"
                    }]
                }]
            }
        }
    }
}
