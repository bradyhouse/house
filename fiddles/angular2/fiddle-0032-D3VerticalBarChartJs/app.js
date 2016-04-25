"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
var d3 = window.d3, meta = {
    fiddleHeader: 'Angular 2 - D3 Vertical Bar Chart',
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0032-D3VerticalBarChartJs',
        data: "data.json"
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
};
var ChartViewModel = (function () {
    function ChartViewModel(top, left, right, bottom) {
        this._top = top;
        this._left = left;
        this._right = right;
        this._bottom = bottom;
    }
    Object.defineProperty(ChartViewModel.prototype, "top", {
        get: function () {
            return this._top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartViewModel.prototype, "left", {
        get: function () {
            return this._left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartViewModel.prototype, "right", {
        get: function () {
            return this._right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartViewModel.prototype, "bottom", {
        get: function () {
            return this._bottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartViewModel.prototype, "verticalPadding", {
        get: function () {
            return this.top + this.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartViewModel.prototype, "horizontalPadding", {
        get: function () {
            return this.left + this.right;
        },
        enumerable: true,
        configurable: true
    });
    ChartViewModel = __decorate([
        core_1.Injectable()
    ], ChartViewModel);
    return ChartViewModel;
}());
var Chart = (function () {
    function Chart(elementRef) {
        this.refresh = new core_1.EventEmitter();
        this.domInit = new core_1.EventEmitter();
        this.barClick = new core_1.EventEmitter();
        this.barMouseOver = new core_1.EventEmitter();
        this.barMouseOut = new core_1.EventEmitter();
        this._duration = 500;
        this._seriesPadding = 2;
        this._viewModel = new ChartViewModel(10, 40, 10, 30);
        this._forceY = [0];
        this._x = d3.scale.ordinal();
        this._y = d3.scale.linear();
        this._el = elementRef.nativeElement;
    }
    Chart.prototype.ngOnInit = function () {
        var _this = this;
        if (this.options.title) {
            this._title = this.options.title;
        }
        window.setTimeout(function () {
            _this.domInit.emit(_this);
        }, 500);
    };
    Object.defineProperty(Chart.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
            this.renderTitle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "width", {
        get: function () {
            return this.node ? this.node.getBoundingClientRect().width - 10 : this._width;
        },
        set: function (value) {
            this._width = value;
            this.onDimensionsChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "height", {
        get: function () {
            return this.node ? this.node.getBoundingClientRect().height - 10 : this._width;
        },
        set: function (value) {
            this._height = value;
            this.onDimensionsChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (arr) {
            this._data = arr;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "max", {
        get: function () {
            return d3.max(this._data, function (d) {
                return d.value;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "min", {
        get: function () {
            return d3.min(this._data, function (d) {
                return d.value;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "canReconfigure", {
        get: function () {
            return this._data &&
                this._data.length &&
                this.width &&
                this.height &&
                this.svgEl &&
                this.bodyEl ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "canRender", {
        get: function () {
            return this._data &&
                this._data.length &&
                this.width &&
                this.height ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "quadrantWidth", {
        get: function () {
            return this.width - this._viewModel.horizontalPadding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "quadrantHeight", {
        get: function () {
            return this.height - this._viewModel.verticalPadding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "xStart", {
        get: function () {
            return this._viewModel.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "yStart", {
        get: function () {
            return this.height - this._viewModel.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "yEnd", {
        get: function () {
            return this._viewModel.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "node", {
        get: function () {
            return this.svgEl && this.svgEl.node() ? this.svgEl.node() : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "svgEl", {
        get: function () {
            return this._el ? d3.select(this._el).select('svg.bar-chart') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "axesEl", {
        get: function () {
            return this.svgEl ? this.svgEl.select("g.bar-chart-axes") : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "titleEl", {
        get: function () {
            return d3.select('chart-title');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "defsEl", {
        get: function () {
            return this.svgEl ? this.svgEl.select("defs") : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "bodyClipEl", {
        get: function () {
            return this.defsEl ? this.defsEl.select('#body-clip') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "bodyEl", {
        get: function () {
            return this.svgEl ? this.svgEl.select('g.bar-chart-body') : null;
        },
        enumerable: true,
        configurable: true
    });
    Chart.prototype.valueScaleFn = function (d) {
        return this.options.hasOwnProperty('valueScaleFn') ? this.options.valueScaleFn(d) : d.value;
    };
    Chart.prototype.valueDeltaMax = function (sign) {
        return this.options.hasOwnProperty('valueDeltaMax') ? sign * this.options.valueDeltaMax : sign * this.max;
    };
    Chart.prototype.valueDeltaMin = function (sign) {
        return this.options.hasOwnProperty('valueDeltaMin') ? sign * this.options.valueDeltaMin : sign * this.min;
    };
    Chart.prototype.onDimensionsChange = function () {
        this.reconfigure();
    };
    Chart.prototype.valueFormat = function (value) {
        var formatter = d3.format(',.2f');
        return formatter(value);
    };
    Chart.prototype.reconfigure = function () {
        if (this.canReconfigure) {
            this.removeTooltip();
            this.removeBars();
            d3.select(".chart")
                .data(this.data)
                .transition()
                .duration(this._duration)
                .attr("width", this.width)
                .attr("height", this.height);
            this.configureBodyClip();
            this.configureAxesAndScales();
            this.renderBody();
            this.refresh.emit(false);
        }
    };
    Chart.prototype.configure = function () {
        if (this.svgEl) {
            this.svgEl
                .attr("width", this.width)
                .attr("height", this.height);
        }
        this.configureAxesAndScales();
        this.configureBodyClip();
    };
    Chart.prototype.configureBodyClip = function () {
        if (this.bodyClipEl) {
            this.bodyClipEl.selectAll('rect')
                .remove();
            this.bodyClipEl
                .append("rect")
                .attr("x", 0)
                .attr("y", 10)
                .attr("width", this.quadrantWidth - 5)
                .attr("height", this.quadrantHeight - 20);
        }
    };
    Chart.prototype.constrain = function (val, min, max) {
        if (min === null) {
            min = val;
        }
        if (max === null) {
            max = val;
        }
        return (val < min) ? min : ((val > max) ? max : val);
    };
    Chart.prototype.configureAxesAndScales = function () {
        var _this = this;
        this._x.domain(this.data.map(function (d) {
            return d.label;
        }))
            .rangeBands([0, this.quadrantWidth]);
        this._xAxis = d3
            .svg
            .axis()
            .scale(this._x)
            .orient("bottom");
        this._y.domain(d3.extent(this.data.map(function (d) {
            var scaledValue = _this.valueScaleFn(d);
            var ret = (scaledValue >= 0) ?
                _this.constrain(scaledValue, _this.valueDeltaMin(1), _this.valueDeltaMax(1)) :
                _this.constrain(scaledValue, _this.valueDeltaMax(-1), _this.valueDeltaMin(-1));
            return ret * 100;
        }).concat(this._forceY)));
        this._y.range([this.quadrantHeight - (this._y.domain()[0] < 0 ? 12 : 0), this._y.domain()[1] > 0 ? 12 : 0]);
        this._yAxis = d3.svg.axis()
            .scale(this._y)
            .orient("left")
            .ticks(5)
            .tickFormat(function (v) {
            return v + ' X';
        });
    };
    Chart.prototype.renderTooltip = function (d, left, top) {
        var group = this.svgEl.select('g.bar-chart-tooltip'), rect = group.append('rect')
            .attr('x', left)
            .attr('y', top)
            .attr('width', this.quadrantWidth)
            .attr('height', '0px');
        group
            .append('text')
            .text(JSON.stringify(d))
            .attr('y', top)
            .attr('x', "51%")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .classed('bar-chart-tooltip', true);
    };
    Chart.prototype.removeTooltip = function () {
        this.svgEl.select('g.bar-chart-tooltip')
            .selectAll('rect')
            .remove();
        this.svgEl.select('g.bar-chart-tooltip')
            .selectAll('text')
            .remove();
    };
    Chart.prototype.clear = function () {
        this.removeAxes();
        this.removeBars();
        this.removeTitle();
    };
    Chart.prototype.render = function () {
        if (this.canRender) {
            this.configure();
            this.renderBody();
        }
        else {
            this.clear();
        }
    };
    Chart.prototype.removeAxes = function () {
        if (this.axesEl) {
            this.axesEl.selectAll('g')
                .remove();
        }
    };
    Chart.prototype.renderAxes = function () {
        var _this = this;
        this.removeAxes();
        if (this.axesEl) {
            this.axesEl.append("g")
                .attr("class", "bar-chart-x-axis")
                .attr("transform", function () {
                return "translate(" + _this._viewModel.left + "," + _this.yStart + ")";
            })
                .call(this._xAxis);
            this.axesEl.append("g")
                .attr("class", "bar-chart-y-axis")
                .attr("transform", function () {
                return "translate(" + _this.xStart + "," + _this.yEnd + ")";
            })
                .call(this._yAxis);
            this.renderGridlines(this.axesEl);
        }
    };
    Chart.prototype.removeBars = function () {
        if (this.bodyEl) {
            this.bodyEl.selectAll("g.bar-chart-series")
                .remove();
        }
    };
    Chart.prototype.renderBars = function () {
        var _this = this;
        this.removeTooltip();
        this.removeBars();
        this.bodyEl.selectAll('g.bar-chart-series')
            .data(this.data)
            .enter()
            .append("g")
            .attr("class", "bar-chart-series");
        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this.data)
            .append('rect')
            .attr("x", function (d) {
            return _this._x(d.label);
        })
            .attr('y', function (d) {
            var scaledValue = _this.valueScaleFn(d);
            var value = scaledValue > 0 ?
                _this.constrain(scaledValue, _this.valueDeltaMin(1), _this.valueDeltaMax(1)) :
                scaledValue === 0 ? _this.valueDeltaMin(1) :
                    _this.constrain(scaledValue, _this.valueDeltaMax(-1), _this.valueDeltaMin(-1)), domainValue = value * 100, rangeValue = domainValue < 0 ? _this._y(0) : _this._y(domainValue);
            return rangeValue;
        })
            .attr('height', function (d) {
            var scaledValue = _this.valueScaleFn(d);
            var value = (scaledValue > 0) ?
                _this.constrain(scaledValue, _this.valueDeltaMin(1), _this.valueDeltaMax(1)) :
                scaledValue === 0 ? _this.valueDeltaMin(1) :
                    _this.constrain(scaledValue, _this.valueDeltaMax(-1), _this.valueDeltaMin(-1)), domainValue = value * 100;
            return Math.max(Math.abs(_this._y(domainValue) - _this._y(0)), 1);
        })
            .attr("width", function (d) {
            return Math.floor(_this.quadrantWidth / _this.data.length - 2 * _this._seriesPadding);
        });
        this.bodyEl.selectAll('g.bar-chart-series > rect')
            .data(this.data)
            .attr("class", function (d) {
            return d.value < 0 ? "bar-chart-negative-series" : "bar-chart-positive-series";
        });
        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this.data)
            .on('mouseover', function (d) {
            _this.onBarMouseOver(d);
        })
            .on('click', function (d) {
            _this.onBarClick(d);
        })
            .on('mouseout', function (d) {
            _this.onBarMouseOut(d);
        });
    };
    Chart.prototype.onBarMouseOut = function (bar) {
        this.removeTooltip();
        this.barMouseOut.emit(bar);
    };
    Chart.prototype.onBarClick = function (bar) {
        this.removeTooltip();
        this.barClick.emit(bar);
    };
    Chart.prototype.onBarMouseOver = function (bar) {
        var left = this.xStart, top = this._viewModel.top;
        this.removeTooltip();
        this.renderTooltip(bar, left, top);
        this.barMouseOver.emit(bar);
    };
    Chart.prototype.renderBody = function () {
        if (this.bodyEl) {
            this.bodyEl
                .attr("transform", "translate(" + this.xStart + "," + this.yEnd + ")");
        }
        this.renderAxes();
        this.renderBars();
    };
    Chart.prototype.renderGridlines = function (group) {
        var lines = group.selectAll("g.bar-chart-y-axis g.tick")
            .select("line.h-grid-line");
        if (lines.length) {
            lines.remove();
        }
        lines = group.selectAll("g.bar-chart-y-axis g.tick")
            .append("line")
            .classed("h-grid-line", true);
        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.quadrantWidth)
            .attr("y2", 0);
    };
    Chart.prototype.removeTitle = function () {
        this.titleEl
            .select('div')
            .remove();
    };
    Chart.prototype.renderTitle = function () {
        this.removeTitle();
        this.titleEl
            .append('div');
        this.titleEl
            .select('div')
            .classed('chartTitle', true)
            .text(this.title);
    };
    __decorate([
        core_1.Input()
    ], Chart.prototype, "options", void 0);
    __decorate([
        core_1.Output()
    ], Chart.prototype, "refresh", void 0);
    __decorate([
        core_1.Output()
    ], Chart.prototype, "domInit", void 0);
    __decorate([
        core_1.Output()
    ], Chart.prototype, "barClick", void 0);
    __decorate([
        core_1.Output()
    ], Chart.prototype, "barMouseOver", void 0);
    __decorate([
        core_1.Output()
    ], Chart.prototype, "barMouseOut", void 0);
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            properties: ['data', 'width', 'height'],
            template: "<chart-title></chart-title>\n        <svg class=\"bar-chart\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n             <defs>\n                <clipPath id=\"body-clip\"></clipPath>\n            </defs>\n            <g class=\"bar-chart-tooltip\">\n            </g>\n            <g class=\"bar-chart-body\" clip-path=\"url(#body-clip)\">\n                <linearGradient id=\"yellowToRed\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\" spreadMethod=\"pad\">\n                    <stop class=\"yellow\" offset=\"0%\"></stop>\n                    <stop class=\"red\" offset=\"100%\"></stop>\n                </linearGradient>\n                <linearGradient id=\"redToYellow\" x1=\"0%\" y1=\"100%\" x2=\"0%\" y2=\"0%\" spreadMethod=\"pad\">\n                    <stop class=\"red\" offset=\"0%\"></stop>\n                    <stop class=\"yellow\" offset=\"100%\"></stop>\n                </linearGradient>\n                <linearGradient id=\"lightblueToBlue\" x1=\"0%\" y1=\"100%\" x2=\"0%\" y2=\"0%\" spreadMethod=\"pad\">\n                    <stop class=\"lightblue\" offset=\"0%\"></stop>\n                    <stop class=\"blue\" offset=\"100%\"></stop>\n                </linearGradient>\n            </g>\n            <g class=\"bar-chart-axes\">\n            </g>\n        </svg>"
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], Chart);
    return Chart;
}());
var BarChart = (function () {
    function BarChart() {
        this.ready = new core_1.EventEmitter();
        this.click = new core_1.EventEmitter();
        this.mouseover = new core_1.EventEmitter();
        this.mouseout = new core_1.EventEmitter();
        this.reload = new core_1.EventEmitter();
        this._refreshing = false;
        this._defaultScaleRange = [0, 10];
    }
    Object.defineProperty(BarChart.prototype, "title", {
        get: function () {
            return this._chart ? this._chart.title : (this.options.title ? this.options.title : '');
        },
        set: function (value) {
            if (this._chart) {
                this._chart.title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarChart.prototype, "valueScaleFn", {
        get: function () {
            return this.options.hasOwnProperty('scaleFn') ? this.options.scaleFn : this.defaultScaler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarChart.prototype, "valueDeltaMax", {
        get: function () {
            return this.options.scaleRange && this.options.scaleRange.length > 1 ? this.options.scaleRange[1] : this._defaultScaleRange[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarChart.prototype, "valueDeltaMin", {
        get: function () {
            return this.options.scaleRange && this.options.scaleRange.length > 1 ? this.options.scaleRange[0] : this._defaultScaleRange[0];
        },
        enumerable: true,
        configurable: true
    });
    BarChart.prototype.defaultScaler = function (d) {
        return d.value;
    };
    BarChart.prototype.onSimulateDataChange = function () {
        var _this = this;
        var data = this._chart && this._chart.data ? this._chart.data : null, max = data && data.length ? 50 : 0, min = data && data.length ? -50 : 0;
        if (data) {
            data.map(function (d) {
                if ((+d.value) < 0) {
                    d.value = d.value + _this.generateValue(-1, 0, 50);
                }
                else {
                    d.value = d.value + _this.generateValue(1, 0, 50);
                }
            });
            this._chart.data = data;
            window.setTimeout(function () {
                _this.reload.emit(_this);
            }, this.options.delay ? this.options.delay * 2.5 : 2500);
        }
    };
    BarChart.prototype.simulateDataChange = function () {
        var _this = this;
        this.onSimulateDataChange();
        window.setTimeout(function () {
            _this.simulateDataChange();
        }, this.options.delay || 2000);
    };
    BarChart.prototype.generateValue = function (sign, min, max) {
        var getRandomArbitrary = function (min, max) {
            return Math.random() * (max - min) + min;
        }, ret = getRandomArbitrary(min, max) * sign;
        return ret;
    };
    BarChart.prototype.onWindowResize = function (event) {
        var srcElement = event ? event.srcElement : null, window = srcElement && srcElement.window ? srcElement.window : null, height = window ? window.innerHeight : null, width = window ? window.innerWidth : null;
        if (width && height && this._chart) {
            this._refreshing = true;
            this._chart.width = width - 50;
            this._chart.height = height - 50;
        }
    };
    BarChart.prototype.onChartBarClick = function (bar) {
        this.click.emit(bar);
    };
    BarChart.prototype.onChartBarMouseOver = function (bar) {
        this.mouseover.emit(bar);
    };
    BarChart.prototype.onChartBarMouseOut = function (bar) {
        this.mouseout.emit(bar);
    };
    BarChart.prototype.onChartDomInit = function (chart) {
        var _this = this;
        this._chart = chart;
        this._chart.title = this.title;
        if (this.options.simulate) {
            window.setTimeout(function () {
                _this.onSimulateDataChange();
            }, this.options.delay || 2000);
        }
        this.ready.emit(this);
    };
    BarChart.prototype.onChartRefresh = function (state) {
        this._refreshing = state;
    };
    Object.defineProperty(BarChart.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (values) {
            this._data = values;
            if (this._chart) {
                this._chart.data = this._data;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarChart.prototype, "chartOptions", {
        get: function () {
            return {
                valueScaleFn: this.valueScaleFn,
                valueDeltaMax: this.valueDeltaMax,
                valueDeltaMin: this.valueDeltaMin
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], BarChart.prototype, "options", void 0);
    __decorate([
        core_1.Output()
    ], BarChart.prototype, "ready", void 0);
    __decorate([
        core_1.Output()
    ], BarChart.prototype, "click", void 0);
    __decorate([
        core_1.Output()
    ], BarChart.prototype, "mouseover", void 0);
    __decorate([
        core_1.Output()
    ], BarChart.prototype, "mouseout", void 0);
    __decorate([
        core_1.Output()
    ], BarChart.prototype, "reload", void 0);
    BarChart = __decorate([
        core_1.Component({
            selector: 'bar-chart',
            template: "\n        <chart\n            [options]=\"chartOptions\"\n            (window:resize)=\"onWindowResize($event)\"\n            (domInit)=\"onChartDomInit($event)\"\n            (refresh)=\"onChartRefresh($event)\"\n            (barClick)=\"onChartBarClick($event)\"\n            (barMouseOver)=\"onChartBarMouseOver($event)\"\n            (barMouseOut)=\"onChartBarMouseOut($event)\">\n        </chart>",
            directives: [Chart]
        })
    ], BarChart);
    return BarChart;
}());
var App = (function () {
    function App(http) {
        this.http = http;
        this.data = [];
        this._width = window.innerWidth - 50;
        this._height = window.innerHeight - 50;
        this._simulate = true;
        this._delay = 1000;
        this._title = meta.fiddleHeader;
    }
    App.prototype.request = function (url) {
        return this.http
            .get(url)
            .map(function (res) { return res.json(); });
    };
    App.prototype.onChartReady = function (barchart) {
        var _this = this;
        this._barchart = barchart;
        this.request(meta.urls.data).subscribe(function (res) {
            if (res.items) {
                _this._barchart.data = res.items;
            }
        });
    };
    App.prototype.onChartReload = function (barchart) {
        var _this = this;
        this._barchart = barchart;
        this.request(meta.urls.data).subscribe(function (res) {
            if (res.items) {
                _this._barchart.data = res.items;
            }
        });
    };
    Object.defineProperty(App.prototype, "options", {
        get: function () {
            return {
                title: this._title,
                simulate: this._simulate,
                scaleFn: function (d) {
                    var value = d && d.value ? d.value : 0, tolerance = 50, scale = (+value) / (+tolerance);
                    return scale;
                },
                scaleRange: [.05, 50]
            };
        },
        enumerable: true,
        configurable: true
    });
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <div class=\"panel\">\n            <bar-chart\n            [options]=\"options\"\n            (ready)=\"onChartReady($event)\"\n            (reload)=\"onChartReload($event)\">\n            </bar-chart>\n        </div>\n        ",
            directives: [BarChart]
        }),
        __param(0, core_1.Inject(http_1.Http))
    ], App);
    return App;
}());
console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();
core_1.enableProdMode();
browser_1.bootstrap(App, [
    http_1.HTTP_PROVIDERS
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map