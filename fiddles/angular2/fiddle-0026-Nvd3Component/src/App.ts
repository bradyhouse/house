import {Component, OnInit} from 'angular2/core';
import * as core from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {DataService} from './DataService';
import {Chart} from './component/Chart';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <chart [options]="chartOptions" [data]="data"></chart>
    `,
    directives: [Chart],
    providers: [HTTP_PROVIDERS, DataService]
})
export class App implements OnInit {

    constructor(private dataService:DataService) {
        this.data = [];
    }

    ngOnInit() {
        var me = this;
        this.dataService.request(this.url).subscribe((res:Response) => {
            var store = [];
            if (res.children && this.titles.length) {
                this.titles.map(function (title) {
                    var titleNodes = res.children.filter(function (child) {
                        return child.title == title;
                    });
                    if (titleNodes.length) {
                        titleNodes.map(function (titleNode) {
                            if (!titleNode.leaf) {
                                titleNode.children.map(function (child) {
                                    store.push(child);
                                });
                            }
                        }, me);
                    }
                }, me);
                this.bind(store);
            }
        });
    }

    bind(data) {
        var root = {
            key: this.titles,
            values: []
        };
        data.sort(function (a, b) {
            return parseFloat(a.checking) - parseFloat(b.checking);
        });
        data.map(function (item) {
            var namePieces = item.name.split(' '),
                lastName = namePieces && namePieces.length > 1 ? namePieces[1].toUpperCase() : item.name.toUpperCase();
            root.values.push({
                "label": lastName,
                "color": parseFloat(item.checking) < 0 ? "red" : "green",
                "value": item.checking
            });
        }, root);
        this.data.push(root);
    }

    get chartOptions() {
        return {
            chart: {
                id: 'chart1',
                type: 'discreteBarChart',
                height: this.height,
                width: this.width,
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
                showValues: false,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                duration: 150,
                rotateLabels: 45,
                showValues: false,
                showLegend: true,
                staggerLabels: true,
                xAxis: {
                    axisLabel: 'Account',
                },
                yAxis: {
                    axisLabel: 'Checking Balance',
                }
            }
        }
    }

    get titles() {
        return ["GREEN_KIRBY", "KLEIN_WATERS"];
    }

    get height() {
        return window.innerHeight - 55;
    }

    get width() {
        return window.innerWidth - 55;
    }

    get url() {
        return meta.urls.data;
    }


}
