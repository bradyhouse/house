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
                "color": parseFloat(item.checking) < 0 ? "red" : "green",
                "value": item.checking,
                "elementClick": function() {
                    alert(item.checking);
                }
            });
        }, root);
        this.data.push(root);
    }
    get chartOptions() {
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
                    return d.value;
                },
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
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
                callback: function() {
                    console.log('callback');
                    // d3.selectAll(".nv-slice path").attr("fill", function(d, i) { return "url(#grad" + i + ")"; })

                    let chart:any = d3.select('svg'),
                        gradient = chart.append("svg:defs")
                            .append("svg:linearGradient")
                            .attr("id", "gradient")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "100%")
                            .attr("y2", "100%")
                            .attr("spreadMethod", "pad");

                    gradient.append("svg:stop")
                        .attr("offset", "0%")
                        .attr("stop-color", "#00cc00")
                        .attr("stop-opacity", 1);

                    gradient.append("svg:stop")
                        .attr("offset", "100%")
                        .attr("stop-color", "#006600")
                        .attr("stop-opacity", 1);

                    window.setTimeout(function() {
                        let negativeBars:any=d3.select('.nvd3-svg > g')
                            .select('.nv-barsWrap')
                            .select('.nv-discretebar')
                            .select('.nv-groups > g')
                            .selectAll('.negative')
                            .select('rect')
                            .style("fill","url(#gradrient)");
                        console.log(negativeBars);
                    }, 1000);

                },
                dispatch: {
                    'elementClick': function(event) {
                        console.log(event);
                    }
                }
            }
        }
    }
}
