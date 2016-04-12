(function (app, $, undefined) {
    "use strict";

    let metadata = {
        fiddleHeader: 'D3 - Two Quadrant Bar Chart',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/d3/fiddle-0025-TwoQuadrantBarChart'
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };

    function barChart() {
        let _chart = {},
            _duration = 1000,
            _margins = {top: 30, left: 40, right: 0, bottom: 30},
            _width = window.innerWidth - _margins.left - _margins.right,
            _height = window.innerHeight - _margins.top - _margins.bottom,
            _xAxis, _yAxis,
            _forceY = [0],
            _data = [],
            _svg,
            _bodyG,
            _snapshot = false,
            getX = function(d) { return d.x },
            getY = function(d) { return d.y },
            x = d3.scale.ordinal(),
            y = d3.scale.linear(),
            x0, y0;


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

            /*_xScale = d3.scale.ordinal()
                .domain(_data.map(function (d) {
                    return d.label;
                }))
                .rangeRoundBands([0, quadrantWidth(), 0.05]);*/
            x.domain(_data.map(function (d) {
                    return d.label;
                }))
                .rangeBands([0, quadrantWidth()], .1);
            _xAxis = d3.svg.axis().scale(x).orient("bottom");
            y.domain(d3.extent(_data.map(function (d) {
                return d.y
            }).concat(_forceY)));

            y.range([quadrantHeight() - (y.domain()[0] < 0 ? 12 : 0), y.domain()[1] > 0 ? 12 : 0]);
            /*_yScale = d3.scale.linear()
                .domain([
                    d3.min(_data, function (d) {
                        let scale = Math.floor(d.y / 3),
                            ret = (scale < 0) ? constrain(scale, -20, -0.05) : 0;
                        return ret;
                        }),
                    d3.max(_data, function (d) {
                        let scale = Math.floor(d.y / 3),
                            ret = (scale >= 0) ? constrain(scale, 0.05, 20) : constrain(scale, -20, -0.05);
                        return ret;
                    })])
                .range([quadrantHeight(), 0]);*/

            _yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(3)
                .tickSubdivide(0)
                .tickFormat(function (v) {
                    return v + " X";
                });

            x0 = x;
            y0 = y.copy().range([y(0), y(0)]);
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

        function renderGradients(svg) {
            let defs = svg.append("svg:defs"),

                positiveGradient = defs.append("svg:linearGradient")
                .attr("id", "positive")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad"),

                negativeGradient = defs.append("svg:linearGradient")
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
                .attr('y', function(d,i) {
                    return getY(d, i) < 0 ? y(0) : y(getY(d, i));
                })
                .attr("x", function (d) {
                    return x(d.label);
                })
                .attr('height', function (d, i) {
                    return Math.max(Math.abs(y(getY(d, i)) - y(0)), 1)
                })
                .attr("width", function (d) {
                    return Math.floor(quadrantWidth() / _data.length - padding - 2);
                });

            _bodyG.selectAll("rect.bar")
                .data(_data)
                .style("fill", function (d, i) {
                    return getY(d, i) < 0 ? 'url(#negative)' : 'url(#positive)';
                });
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
                //defineSeriesData(_data);
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
        {"x": 0, "y": 1.4947673988982424, "label": "A", "sign": "1"},
        {"x": 1, "y": 7.676086526326012, "label": "B" , "sign": "1"},
        {"x": 2, "y": 8.311391009319639, "label": "C", "sign": "1"},
        {"x": 3, "y": 7.098099047760723, "label": "D", "sign": "1"},
        {"x": 4, "y": 6.856492567242657, "label": "E", "sign": "1"},
        {"x": 5, "y": 7.16529893760509, "label": "F", "sign": "1"},
        {"x": 6, "y": 7.047473435271625, "label": "G", "sign": "1"},
        {"x": 7, "y": 2.2977968233643606, "label": "H", "sign": "1"},
        {"x": 8, "y": 5.560482923769485, "label": "I", "sign": "1"},
        {"x": 9, "y": 2.087097265118159, "label": "J", "sign": "1"},
        {"x": 10, "y": 7.930794711840363, "label": "K", "sign": "1"},
        {"x": 11, "y": 0.4595904183709092, "label": "L", "sign": "1"},
        {"x": 12, "y": 5.33252537515214, "label": "M", "sign": "1"},
        {"x": 13, "y": 7.515292358545, "label": "N", "sign": "1"},
        {"x": 14, "y": 1.403073390532516, "label": "O", "sign": "1"},
        {"x": 15, "y": 3.490313827444835, "label": "P", "sign": "1"},
        {"x": 16, "y": 7.071262354658021, "label": "Q", "sign": "0"},
        {"x": 17, "y": 1.7309887540308193, "label": "R", "sign": "0"},
        {"x": 18, "y": 5.103745831631774, "label": "S", "sign": "0"},
        {"x": 19, "y": 7.334708048181251, "label": "T", "sign": "0"},
        {"x": 20, "y": 1.2935714752426752, "label": "U", "sign": "0"},
        {"x": 21, "y": 1.6815389549096806, "label": "V", "sign": "0"},
        {"x": 22, "y": 0.360368118257383, "label": "W", "sign": "0"},
        {"x": 23, "y": 8.647669373984925, "label": "X", "sign": "0"},
        {"x": 24, "y": 4.349171320294836, "label": "Y", "sign": "0"},
        {"x": 25, "y": 3.9064984435983092, "label": "Z", "sign": "0"},
        {"x": 26, "y": 3.2265013863732923, "label": "AA", "sign": "0"},
        {"x": 27, "y": 4.521172765950789, "label": "BB", "sign": "0"},
        {"x": 28, "y": 7.834619466111912, "label": "CC", "sign": "0"},
        {"x": 29, "y": 6.186021390900115, "label": "DD", "sign": "0"}];
    window.app.run = function () {
        window.app.update();
        window.setTimeout(function () {
            window.app.run();
        }, 2000);
    };
    window.app.randomData = function (sign) {
        let getRandomArbitrary = function (min, max) {
                return Math.random() * (max - min) + min;
            },
            ret = getRandomArbitrary(0, 20) * sign;
        return ret;
    };
    window.app.update = function () {
        if (!window.app.chart.snapshot()) {
            window.app.data.map(function (d) {
                if(d.sign == "1") {
                    d.y = window.app.randomData(1);
                } else {
                    d.y = window.app.randomData(-1);
                }
            });
            window.app.chart
                .setSeries(window.app.data)
                .render();
        }
    };
    window.app.chart = barChart();

    init();

})(window.app = window.app || {}, d3)
