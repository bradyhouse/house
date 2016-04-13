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
var Margins = (function () {
    function Margins(top, left, right, bottom) {
        this._top = top;
        this._left = left;
        this._right = right;
        this._bottom = bottom;
    }
    Object.defineProperty(Margins.prototype, "top", {
        get: function () {
            return this._top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Margins.prototype, "left", {
        get: function () {
            return this._left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Margins.prototype, "right", {
        get: function () {
            return this._right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Margins.prototype, "bottom", {
        get: function () {
            return this._bottom;
        },
        enumerable: true,
        configurable: true
    });
    return Margins;
})();
var Verticalbar = (function () {
    function Verticalbar(elementRef) {
        this.configured = new core_1.EventEmitter();
        this._duration = 1000;
        this._seriesPadding = 2;
        this._bodyPadding = 5;
        this._margins = new Margins(30, 40, 0, 30);
        this._forceY = [0];
        this._x = d3.scale.ordinal();
        this._y = d3.scale.linear();
        this._el = elementRef.nativeElement;
    }
    Verticalbar.prototype.ngOnChanges = function () {
        if (this.data && this.data.length) {
            this.render();
        }
    };
    Verticalbar.prototype.getX = function (d) {
        return d.x;
    };
    Verticalbar.prototype.getY = function (d) {
        return d.y;
    };
    Object.defineProperty(Verticalbar.prototype, "svg", {
        get: function () {
            return this._svg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "chart", {
        get: function () {
            return this._chart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "quadrantWidth", {
        get: function () {
            return this.options && this.options.width ?
                this.options.width - this._margins.left - this._margins.right :
                window.innerWidth - this._margins.left - this._margins.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "quadrantHeight", {
        get: function () {
            return this.options && this.options.height ?
                this.options.height - this._margins.top - this._margins.bottom :
                window.innerHeight - this._margins.top - this._margins.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "xStart", {
        get: function () {
            return this._margins.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "yStart", {
        get: function () {
            return this.options && this.options.height ?
                this.options.height - this._margins.bottom :
                window.innerHeight - this._margins.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "yEnd", {
        get: function () {
            return this._margins.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "margins", {
        get: function () {
            return this._margins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "axesDom", {
        get: function () {
            return this._svg ? this._svg.selectAll("g.axes") : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "xAxis", {
        get: function () {
            return this._xAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "yAxis", {
        get: function () {
            return this._yAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Verticalbar.prototype, "bodyPadding", {
        get: function () {
            return this._bodyPadding;
        },
        enumerable: true,
        configurable: true
    });
    Verticalbar.prototype.reconfigure = function (width, height) {
        var chartWidth = width - this._margins.left - this._margins.right, chartHeight = height - this._margins.top - this._margins.bottom;
        this.removeAxesDom();
        this._bodyG.selectAll("rect.bar")
            .remove();
        d3.select(".chart")
            .data(this.data)
            .attr("width", chartWidth)
            .attr("height", chartHeight);
        this.configureBodyClip();
        this.configureAxesAndScales();
        //this.renderBody();
    };
    Verticalbar.prototype.configure = function () {
        if (this.svg) {
            this._svg.remove();
        }
        if (this.chart) {
            this._chart.remove();
        }
        this._el.innerHTML = '<svg class="chart"></svg>';
        this._svg = this._chart = d3.select(".chart")
            .attr("width", this.options.width)
            .attr("height", this.options.height);
        this.configureBodyClip();
        this.configureGradients();
        this.configureAxesAndScales();
        this.configured.emit(this);
    };
    Verticalbar.prototype.configureBodyClip = function () {
        this._svg.append("defs")
            .append("clipPath")
            .attr("id", "body-clip")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.quadrantWidth + 2 * this.bodyPadding)
            .attr("height", this.quadrantHeight);
    };
    Verticalbar.prototype.configureGradients = function () {
        var defs = this._svg.append("svg:defs"), positiveGradient = defs.append("svg:linearGradient")
            .attr("id", "positive")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad"), negativeGradient = defs.append("svg:linearGradient")
            .attr("id", "negative")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");
        positiveGradient.append("svg:stop")
            .attr("class", "yellow")
            .attr("offset", "0%");
        positiveGradient.append("svg:stop")
            .attr("class", "red")
            .attr("offset", "100%");
        negativeGradient.append("svg:stop")
            .attr("class", "lightblue")
            .attr("offset", "0%");
        negativeGradient.append("svg:stop")
            .attr("class", "blue")
            .attr("offset", "100%");
    };
    Verticalbar.prototype.configureAxesAndScales = function () {
        this._x.domain(this.data.map(function (d) {
            return d.label;
        }))
            .rangeBands([0, this.quadrantWidth], .1);
        this._xAxis = d3
            .svg
            .axis()
            .scale(this._x)
            .orient("bottom");
        this._y.domain(d3.extent(this.data.map(function (d) {
            return d.y;
        }).concat(this._forceY)));
        this._y.range([this.quadrantHeight - (this._y.domain()[0] < 0 ? 12 : 0), this._y.domain()[1] > 0 ? 12 : 0]);
        this._yAxis = d3.svg.axis()
            .scale(this._y)
            .orient("left")
            .ticks(3)
            .tickSubdivide(0)
            .tickFormat(function (v) {
            return v + " X";
        });
    };
    Verticalbar.prototype.render = function () {
        if (!this._svg) {
            this.configure();
        }
        this.renderBody();
    };
    Verticalbar.prototype.renderAxes = function () {
        var self = this, axesG = this.axesDom;
        if (axesG) {
            self.removeAxesDom();
        }
        axesG = self.svg.append("g")
            .attr("class", "axes");
        axesG.append("g")
            .attr("class", "axis")
            .attr("transform", function () {
            return "translate(" + self.margins.left + "," + self.yStart + ")";
        })
            .call(self.xAxis);
        axesG.append("g")
            .attr("class", "axis")
            .attr("transform", function () {
            return "translate(" + self.xStart + "," + self.yEnd + ")";
        })
            .call(this.yAxis);
        this.renderYGridlines(axesG);
    };
    Verticalbar.prototype.renderBars = function () {
        var _this = this;
        var padding = 2;
        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "bar");
        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .transition()
            .duration(this._duration)
            .attr('y', function (d) {
            return _this.getY(d) < 0 ? _this._y(0) : _this._y(_this.getY(d));
        })
            .attr("x", function (d) {
            return _this._x(d.label);
        })
            .attr('height', function (d) {
            return Math.max(Math.abs(_this._y(_this.getY(d)) - _this._y(0)), 1);
        })
            .attr("width", function (d) {
            return Math.floor(_this.quadrantWidth / _this.data.length - padding - 2);
        });
        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .style("fill", function (d) {
            return _this.getY(d) < 0 ? 'url(#negative)' : 'url(#positive)';
        });
    };
    Verticalbar.prototype.renderBody = function () {
        if (!this._bodyG && this._svg) {
            this._bodyG = this._svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                + this.xStart
                + ","
                + this.yEnd + ")")
                .attr("clip-path", "url(#body-clip)");
        }
        this.renderAxes();
        this.renderBars();
    };
    Verticalbar.prototype.renderYGridlines = function (group) {
        var lines = group.selectAll("g.axis g.tick")
            .select("line.h-grid-line").remove();
        lines = group.selectAll("g.axis g.tick")
            .style("stroke", "white")
            .append("line")
            .classed("h-grid-line", true)
            .style("stroke", "white")
            .style("stroke-opacity", function (d, i) {
            return (+d.y) == 0 ? 1 : .2;
        });
        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.quadrantWidth)
            .attr("y2", 0);
    };
    Verticalbar.prototype.removeAxesDom = function () {
        if (this.axesDom) {
            this._svg.selectAll("g.axes").remove();
        }
    };
    __decorate([
        core_1.Input()
    ], Verticalbar.prototype, "data");
    __decorate([
        core_1.Input()
    ], Verticalbar.prototype, "options");
    __decorate([
        core_1.Output()
    ], Verticalbar.prototype, "configured");
    Verticalbar = __decorate([
        core_1.Component({
            selector: 'verticalbar',
            template: ""
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], Verticalbar);
    return Verticalbar;
})();
exports.Verticalbar = Verticalbar;
//# sourceMappingURL=verticalbar.js.map