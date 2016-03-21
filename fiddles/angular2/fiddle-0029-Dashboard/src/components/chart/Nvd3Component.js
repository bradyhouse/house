var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var Nvd3Component = (function () {
    function Nvd3Component(elementRef) {
        this.el = elementRef.nativeElement;
    }
    Nvd3Component.prototype.ngOnChanges = function () {
        var me = this;
        if (!me.chart && !me.svg) {
            me.configure(me.options);
        }
        else {
            me.onDataRefresh();
        }
    };
    Nvd3Component.prototype.onDataRefresh = function () {
        var me = this;
        if (me.chart && me.svg) {
            me.svg.datum(me.data).call(me.chart);
        }
    };
    Nvd3Component.prototype.configure = function (options) {
        var self = this;
        if (!options) {
            return;
        }
        this.clearElement();
        this.chart = nv.models[options.chart.type]();
        this.chart.id = options.chart.hasOwnProperty('id') ? options.chart.id : 'chart-' + Math.random().toString(36).substr(2, 15);
        for (var key in this.chart) {
            if (!this.chart.hasOwnProperty(key))
                continue;
            if (key[0] === '_')
                ;
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
            ].indexOf(key) >= 0)
                ;
            else if (key === 'dispatch')
                this.configureEvents(this.chart[key], options.chart[key]);
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
            else if ((key === 'xTickFormat' || key === 'yTickFormat') && options.chart.type === 'lineWithFocusChart')
                ;
            else if ((key === 'tooltips') && options.chart.type === 'boxPlotChart')
                ;
            else if ((key === 'tooltipXContent' || key === 'tooltipYContent') && options.chart.type === 'scatterChart')
                ;
            else if (options.chart[key] === undefined || options.chart[key] === null)
                ;
            else
                this.chart[key](options.chart[key]);
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
    };
    Nvd3Component.prototype.configureDimensions = function () {
        var chartHeight = this.options.chart.height, chartWidth = this.options.chart.width;
        d3.select(this.el).select('svg').remove();
        this.svg = d3.select(this.el).append('svg');
        if (chartHeight) {
            if (!isNaN(+chartHeight)) {
                chartHeight += 'px';
            }
            this.svg.attr('height', chartHeight).style({ height: chartHeight });
        }
        if (chartWidth) {
            if (!isNaN(+chartWidth)) {
                chartWidth += 'px';
            }
            this.svg.attr('width', chartWidth).style({ width: chartWidth });
        }
        else {
            this.svg.attr('width', '100%').style({ width: '100%' });
        }
    };
    Nvd3Component.prototype.configureChart = function (chart, options, chartType) {
        if (chart && options) {
            for (var key in chart) {
                if (!chart.hasOwnProperty(key))
                    continue;
                var value = chart[key];
                if (key[0] === '_')
                    ;
                else if (key === 'dispatch')
                    this.configureEvents(value, options[key]);
                else if (key === 'tooltip')
                    this.configure(chart[key], options[key], chartType);
                else if (key === 'contentGenerator')
                    if (options[key])
                        chart[key](options[key]);
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
                        if (options[key] === undefined || options[key] === null)
                            ;
                        else
                            chart[key](options[key]);
                    }
            }
        }
    };
    Nvd3Component.prototype.configureEvents = function (dispatch, options) {
        if (dispatch && options) {
            for (var key in dispatch) {
                if (!dispatch.hasOwnProperty(key))
                    continue;
                var value = dispatch[key];
                if (options[key] === undefined || options[key] === null)
                    ;
                else
                    dispatch.on(key + '._', options[key]);
            }
        }
    };
    Nvd3Component.prototype.clearElement = function () {
        if (this.el) {
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
            if (this.chart && this.chart.resizeHandler)
                this.chart.resizeHandler.clear();
            this.chart = null;
        }
    };
    Nvd3Component = __decorate([
        core_1.Component({
            selector: 'nvd3-component',
            moduleId: module.id,
            inputs: ['options', 'data'],
            template: ""
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], Nvd3Component);
    return Nvd3Component;
    var _a;
})();
exports.Nvd3Component = Nvd3Component;
//# sourceMappingURL=Nvd3Component.js.map