import { Component, OnInit, OnChanges, ElementRef, Inject } from 'angular2/core';
declare var d3, nv:any;

@Component({
    selector: 'chart',
    inputs: ['options', 'data'],
    template: ``
})

export class Chart {
    options;
    data;
    el:any;
    chart;
    svg;

    constructor(@Inject(ElementRef) elementRef:ElementRef) {
        this.el = elementRef.nativeElement;
    }

    ngOnChanges() {
        if (!this.chart && !this.svg) {
            this.configure(this.options);
        } else {
            this.refresh();
        }
    }

    refresh() {
        if (this.chart && this.svg) {
            this.svg.datum(this.data).call(this.chart);
        }
    }

    configure(options) {
        let self = this;
        if (!options) {
            return;
        }
        this.clearElement();
        this.chart = nv.models[options.chart.type]();
        this.chart.id = options.chart.hasOwnProperty('id') ? options.chart.id : 'chart-' + Math.random().toString(36).substr(2, 15);

        //TODO - REFACTOR THIS MESS!!!
        for (let key in this.chart) {
            if (!this.chart.hasOwnProperty(key)) continue;
            if (key[0] === '_');
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
                ].indexOf(key) >= 0);
            else if (key === 'dispatch') this.configureEvents(this.chart[key], options.chart[key]);

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
            else if ((key === 'xTickFormat' || key === 'yTickFormat') && options.chart.type === 'lineWithFocusChart');
            else if ((key === 'tooltips') && options.chart.type === 'boxPlotChart');
            else if ((key === 'tooltipXContent' || key === 'tooltipYContent') && options.chart.type === 'scatterChart');
            else if (options.chart[key] === undefined || options.chart[key] === null);
            else this.chart[key](options.chart[key]);
        }

        this.configureDimensions();

        nv.addGraph(function () {
            if (!self.chart) {
                return;
            }
            if (self.chart.resizeHandler) {
                self.chart.resizeHandler.clear();
            }
            self.chart.resizeHandler = nv.utils.windowResize(function () {
                self.chart && self.chart.update && self.chart.update();
            });
            return self.chart;
        }, options.chart['callback']);
    }

    configureDimensions() {
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

    configureChart(chart, options, chartType) {
        if (chart && options) {

            for (let key in chart) {
                if (!chart.hasOwnProperty(key)) continue;

                let value = chart[key];

                if (key[0] === '_');
                else if (key === 'dispatch') this.configureEvents(value, options[key]);
                else if (key === 'tooltip') this.configure(chart[key], options[key], chartType);
                else if (key === 'contentGenerator') if (options[key]) chart[key](options[key]);
                else if ([
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
                    if (options[key] === undefined || options[key] === null);
                    else chart[key](options[key]);
                }
            }

        }
    }

    configureEvents(dispatch, options) {
        if (dispatch && options) {
            for (let key in dispatch) {
                if (!dispatch.hasOwnProperty(key)) continue;

                let value = dispatch[key];

                if (options[key] === undefined || options[key] === null);
                else dispatch.on(key + '._', options[key]);
            }
        }
    }

    clearElement() {
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
        if (this.chart && this.chart.resizeHandler) this.chart.resizeHandler.clear();
        this.chart = null;
    }
}
