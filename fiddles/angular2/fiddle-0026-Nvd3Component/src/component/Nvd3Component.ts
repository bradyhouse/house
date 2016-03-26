import { Component, OnChanges, ElementRef, Inject, Input } from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
declare var d3, nv:any;

@Component({
    selector: 'nvd3-component',
    template: ``
})
export class Nvd3Component {
    @Input() options:any;
    @Input() data: Array<any>;
    el:any;
    chart:any;
    svg:any;

    constructor(@Inject(ElementRef) elementRef:ElementRef) {
        this.el = elementRef.nativeElement;
    }

    ngOnChanges() : void {
        if (this.options && !this.chart && !this.svg) {
            this.configure(this.options);
        } else {
            this.onDataRefresh();
        }
    }

    private onDataRefresh() : void {
        if (this.chart && this.svg) {
            this.svg.datum(this.data).call(this.chart);
        }
    }

    private configure(options : any) : void {
        if (!options) {
            return;
        }
        this.clearElement();
        this.chart = nv.models[options.chart.type]();
        this.chart.id = options.chart.hasOwnProperty('id') ? options.chart.id : 'chart-' + Math.random().toString(36).substr(2, 15);

        for (let key in this.chart) {
            if (!this.chart.hasOwnProperty(key) || key[0] === '_') {
                continue;
            }
            else if ([
                    'clearHighlights',
                    'highlightPoint',
                    'id',
                    'options',
                    'resizeHandler',
                    'state',
                    'open',
                    'close',
                    'tooltipContent'
                ].indexOf(key) >= 0) {
                continue;
            }
            else if (key === 'dispatch') {
                this.configureEvents(this.chart, options.chart.type, options.chart[key]);
            }
            else if ([
                    'bars',
                    'bars1',
                    'bars2',
                    'boxplot',
                    'bullet',
                    'controls',
                    'discretebar',
                    'distX',
                    'distY',
                    'interactiveLayer',
                    'legend',
                    'lines',
                    'lines1',
                    'lines2',
                    'multibar',
                    'pie',
                    'scatter',
                    'sparkline',
                    'stack1',
                    'stack2',
                    'sunburst',
                    'tooltip',
                    'x2Axis',
                    'xAxis',
                    'y1Axis',
                    'y2Axis',
                    'y3Axis',
                    'y4Axis',
                    'yAxis',
                    'yAxis1',
                    'yAxis2'
                ].indexOf(key) >= 0 ||
                (key === 'stacked' && options.chart.type === 'stackedAreaChart')) {
                this.configureChart(this.chart[key], options.chart[key], options.chart.type);
            }
            else if ((key === 'xTickFormat' || key === 'yTickFormat') && options.chart.type === 'lineWithFocusChart') {
                continue;
            }
            else if ((key === 'tooltips') && options.chart.type === 'boxPlotChart') {
                continue;
            }
            else if ((key === 'tooltipXContent' || key === 'tooltipYContent') && options.chart.type === 'scatterChart') {
                continue;
            }
            else if (options.chart[key] === undefined || options.chart[key] === null) {
                continue;
            }
            else this.chart[key](options.chart[key]);
        }
        this.configureDimensions();
        nv.addGraph(this.onAddGraph, options.chart['callback']);
    }

    private onAddGraph() : any {
        if (!this.chart) {
            return;
        }
        if (this.chart.resizeHandler) {
            this.chart.resizeHandler.clear();
        }
        this.chart.resizeHandler = nv.utils.esize(function () {
            this.chart && this.chart.update && this.chart.update();
        });
        return this.chart;
    }

    private configureDimensions() : void {
        let chartHeight = this.options.chart.height,
            chartWidth = this.options.chart.width;
        d3.select(this.el).select('svg').remove();
        this.svg = d3.select(this.el).append('svg');
        if (chartHeight) {
            if (!isNaN(+chartHeight)) {
                chartHeight += 'px';
            }
            this.svg.attr('height', chartHeight).style({height: chartHeight});
        }
        if (chartWidth) {
            if (!isNaN(+chartWidth)) {
                chartWidth += 'px';
            }
            this.svg.attr('width', chartWidth).style({width: chartWidth});
        } else {
            this.svg.attr('width', '100%').style({width: '100%'});
        }
    }

    private configureChart(chart, options, chartType) : void {
        if (chart && options) {
            for (let key in chart) {
                if (!chart.hasOwnProperty(key)) {
                    continue;
                }
                let value:any = chart[key];
                if (key[0] === '_') {
                    continue;
                } else if (key === 'dispatch') {
                    this.configureEvents(value, options[key]);
                } else if (key === 'tooltip') {
                    this.configureChart(chart[key], options[key], chartType);
                } else if (key === 'contentGenerator') {
                    if (options[key]) {
                        chart[key](options[key]);
                    } else if ([
                            'axis',
                            'clearHighlights',
                            'defined',
                            'highlightPoint',
                            'nvPointerEventsClass',
                            'options',
                            'rangeBand',
                            'rangeBands',
                            'scatter',
                            'open',
                            'close'
                        ].indexOf(key) === -1) {
                        if (options[key] === undefined || options[key] === null) {
                            continue;
                        }
                        else {
                            chart[key](options[key]);
                        }
                    }
                }
            }
        }
    }

    private parseChartElementType(type : string) : string {
        let elementType:string = type.indexOf('Chart') ? type.split('Chart')[0] : type;
        return elementType.toLowerCase();
    }

    private configureEvents(chart:any, type:string, options:any) : void {
        let elementType:string = chart && type && options ? this.parseChartElementType(type) : '';
        let element:any = chart.hasOwnProperty(elementType) ? chart[elementType] : null;
        if (element) {
            for(let key in options) {
                element.dispatch.on(key, options[key]);
            }
        }
    }

    private clearElement() : void {
        this.el.innerHTML = '';
        if (this.chart && this.chart.tooltip && this.chart.tooltip.id) {
            d3.select('#' + this.chart.tooltip.id()).remove();
        }
        if (nv.graphs && this.chart) {
            for (var i = nv.graphs.length - 1; i >= 0; i--) {
                if (nv.graphs[i] && (nv.graphs[i].id === this.chart.id)) {
                    nv.graphs.splice(i, 1);
                }
            }
        }
        if (nv.tooltip && nv.tooltip.cleanup) {
            nv.tooltip.cleanup();
        }
        if (this.chart && this.chart.resizeHandler) {
            this.chart.resizeHandler.clear();
        }
        this.chart = null;
    }

    private configureGradients() : void {

        console.log(chart);
        console.log(bars);
    }


}
