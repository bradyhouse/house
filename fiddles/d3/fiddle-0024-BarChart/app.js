(function (app, $, undefined) {
    "use strict";

    let metadata = {
        fiddleHeader: 'D3 - Gradient Bar Chart',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/d3/fiddle-0024-BarChart'
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };

    function barChart() {
        let _chart = {},
            _duration = 1000,
            _margins = {top: 30, left: 40, right: 0, bottom: 30},
            _width = window.innerWidth - _margins.left - _margins.right,
            _height = window.innerHeight - _margins.top - _margins.bottom,
            _xScale, _yScale,
            _xAxis, _yAxis,
            _data = [],
            _svg,
            _bodyG,
            _snapshot = false;


        function constrain(number, min, max) {
            let x = parseFloat(number);
            if (min === null) {
                min = number;
            }
            if (max === null) {
                max = number;
            }
            return (x < min) ? min : ((x > max) ? max : x);
        }

        function defineAxesAndScales() {
            _xScale = d3.scale.ordinal()
                .domain(_data.map(function (d) {
                    return d.label;
                }))
                .rangeRoundBands([0, quadrantWidth(), 0.05]);
            _xAxis = d3.svg.axis().scale(_xScale).orient("bottom");
            _yScale = d3.scale.linear()
                .domain([0, d3.max(_data, function (d) {
                    let scale = Math.floor(d.y / 3),
                        ret = (scale >= 0) ? constrain(scale, 0.05, 20) : constrain(scale, -20, -0.05);
                    return ret;
                })])
                .range([quadrantHeight(), 0]);
            _yAxis = d3.svg.axis()
                .scale(_yScale)
                .orient("left")
                .ticks(3)
                .tickSubdivide(0)
                .tickFormat(function (v) {
                    return v + " X";
                });
        }

        function defineBodyClip(svg) {
            var padding = 5;

            svg.append("defs")
                .append("clipPath")
                .attr("id", "body-clip")
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", quadrantWidth() + 2 * padding)
                .attr("height", quadrantHeight());
        }

        function quadrantWidth() {
            return _width - _margins.left - _margins.right;
        }

        function quadrantHeight() {
            return _height - _margins.top - _margins.bottom;
        }

        function renderAxes(svg) {
            let axesG = svg.selectAll("g.axes").remove();

            axesG = svg.append("g")
                .attr("class", "axes");

            axesG.append("g")
                .attr("class", "axis")
                .attr("transform", function () {
                    return "translate(" + _margins.left + "," + yStart() + ")";
                })
                .call(_xAxis);

            axesG.append("g")
                .attr("class", "axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yEnd() + ")";
                })
                .call(_yAxis);

            renderYGridlines(axesG);
            renderXGridlines(axesG);

        }

        function renderYGridlines(group) {
            let lines = group.selectAll("g.axis g.tick")
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
                .attr("x2", quadrantWidth())
                .attr("y2", 0);
        }

        function renderXGridlines(group) {
            let lines = group.selectAll("g.axis g.tick")
                .selectAll("line.v-grid-line")
                .remove();

            lines = group.selectAll("g.axis g.tick")
                .append("line")
                .classed("v-grid-line", true)
                .style("stroke-width", function (d, i) {
                    return (+d.x) < 1 ? 0 : .5;
                });

            lines.attr("x1", 0)
                .attr("y1", -quadrantHeight())
                .attr("x2", 0)
                .attr("y2", 0);
        }

        function renderGradients(svg) {
            let gradient = svg.append("svg:defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            gradient.append("svg:stop")
                .attr("class", "begin")
                .attr("offset", "0%");

            gradient.append("svg:stop")
                .attr("class", "end")
                .attr("offset", "100%");
        }

        function renderBody(svg) {
            if (!_bodyG)
                _bodyG = svg.append("g")
                    .attr("class", "body")
                    .attr("transform", "translate("
                        + xStart()
                        + ","
                        + yEnd() + ")")
                    .attr("clip-path", "url(#body-clip)");
            renderBars();
            renderAxes(_svg);

        }

        function renderBars() {
            var padding = 2;
            _bodyG.selectAll("rect.bar")
                .data(_data)
                .enter()
                .append("rect")
                .attr("class", "bar");

            _bodyG.selectAll("rect.bar")
                .data(_data)
                .transition()
                .duration(_duration)
                .attr("x", function (d) {
                    return _xScale(d.label);
                })
                .attr("y", function (d) {
                    return _yScale(d.y);
                })
                .attr("height", function (d) {
                    return quadrantHeight() - _yScale(d.y);
                })
                .attr("width", function (d) {
                    return Math.floor(quadrantWidth() / _data.length - padding - 2);
                })
                .style("fill", "url(#gradient)");
        }

        function xStart() {
            return _margins.left;
        }

        function yStart() {
            return _height - _margins.bottom;
        }

        function yEnd() {
            return _margins.top;
        }

        _chart.snapshot = function () {
            return _snapshot;
        };
        _chart.render = function () {
            if (!_svg) {
                _svg = d3.select("body").append("svg")
                    .attr("height", _height)
                    .attr("width", _width);
                defineAxesAndScales();
                renderGradients(_svg);
                defineBodyClip(_svg);
            }
            renderBody(_svg);
        };
        _chart.width = function (w) {
            if (!arguments.length) return _width;
            _width = w;
            return _chart;
        };
        _chart.height = function (h) {
            if (!arguments.length) return _height;
            _height = h;
            return _chart;
        };
        _chart.margins = function (m) {
            if (!arguments.length) return _margins;
            _margins = m;
            return _chart;
        };
        _chart.setSeries = function (series) {
            _data = series;
            return _chart;
        };
        _chart.resize = function () {
            _width = window.innerWidth - _margins.left - _margins.right;
            _height = window.innerHeight - _margins.top - _margins.bottom;
            _snapshot = true;
            if (_svg && _bodyG) {
                _bodyG.remove();
                _bodyG = null;
                _svg.remove();
                _svg = null;
                _chart.render();
            }
            _snapshot = false;
        };

        return _chart;
    }

    function configConsole() {
        console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
        console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
        console.group();
    }

    function onDOMContentLoaded() {
        configConsole();
    }

    function onWindowResize() {
        window.app.chart.resize();
    }

    function init() {
        window.addEventListener("resize", function () {
            onWindowResize();
        }, false);
        document.body.addEventListener('DOMContentLoaded', onDOMContentLoaded(), false);
        window.app.run();
    }

    window.app.data = [
        {"x": 0, "y": 1.4947673988982424, "label": "A"},
        {"x": 1, "y": 7.676086526326012, "label": "B"},
        {"x": 2, "y": 8.311391009319639, "label": "C"},
        {"x": 3, "y": 7.098099047760723, "label": "D"},
        {"x": 4, "y": 6.856492567242657, "label": "E"},
        {"x": 5, "y": 7.16529893760509, "label": "F"},
        {"x": 6, "y": 7.047473435271625, "label": "G"},
        {"x": 7, "y": 2.2977968233643606, "label": "H"},
        {"x": 8, "y": 5.560482923769485, "label": "I"},
        {"x": 9, "y": 2.087097265118159, "label": "J"},
        {"x": 10, "y": 7.930794711840363, "label": "K"},
        {"x": 11, "y": 0.4595904183709092, "label": "L"},
        {"x": 12, "y": 5.33252537515214, "label": "M"},
        {"x": 13, "y": 7.515292358545, "label": "N"},
        {"x": 14, "y": 1.403073390532516, "label": "O"},
        {"x": 15, "y": 3.490313827444835, "label": "P"},
        {"x": 16, "y": 7.071262354658021, "label": "Q"},
        {"x": 17, "y": 1.7309887540308193, "label": "R"},
        {"x": 18, "y": 5.103745831631774, "label": "S"},
        {"x": 19, "y": 7.334708048181251, "label": "T"},
        {"x": 20, "y": 1.2935714752426752, "label": "U"},
        {"x": 21, "y": 1.6815389549096806, "label": "V"},
        {"x": 22, "y": 0.360368118257383, "label": "W"},
        {"x": 23, "y": 8.647669373984925, "label": "X"},
        {"x": 24, "y": 4.349171320294836, "label": "Y"},
        {"x": 25, "y": 3.9064984435983092, "label": "Z"},
        {"x": 26, "y": 3.2265013863732923, "label": "AA"},
        {"x": 27, "y": 4.521172765950789, "label": "BB"},
        {"x": 28, "y": 7.834619466111912, "label": "CC"},
        {"x": 29, "y": 6.186021390900115, "label": "DD"}];
    window.app.run = function () {
        window.app.update();
        window.setTimeout(function () {
            window.app.run();
        }, 2000);
    };
    window.app.randomData = function () {

        let getRandomArbitrary = function (min, max) {
                return Math.random() * (max - min) + min;
            },
            ret = getRandomArbitrary(0, 20);
        console.log(ret);
        return ret;
    };
    window.app.update = function () {
        if (!window.app.chart.snapshot()) {
            window.app.data.map(function (d) {
                d.y = window.app.randomData();
            });
            window.app.chart
                .setSeries(window.app.data)
                .render();
        }
    };
    window.app.chart = barChart();

    init();

})(window.app = window.app || {}, d3)
