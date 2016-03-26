(function (app, $, undefined) {
    "use strict";

    let metadata = {
            fiddleHeader: 'D3 - Axes & Grid Lines',
            urls: {
                data: 'data.json',
                github: 'https://github.com/bradyhouse/house/tree/master/fiddles/d3/fiddle-0022-Rescaling'
            },
            consoleTag: 'H O U S E ~ f i d d l e s'
        },
        margin = 25,
        height = window.innerHeight - (2 * margin),
        width = window.innerWidth - (2 * margin),
        xAxis,
        yAxis,
        xAxisLength,
        yAxisLength,
        domain = {
            max: 1000,
            min: 0,
            value: 0,
            step: 10,
            grow: true,
            snapshot: false
        },
        svg;

    function renderXAxis() {
        xAxisLength = width - 2 * margin;

        let scale = d3.scale.linear()
            .domain([0, domain.value])
            .range([0, xAxisLength]);

        xAxis = d3.svg.axis()
            .scale(scale)
            .tickSubdivide(1)
            .orient("bottom");

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", function () {
                return "translate(" + margin + "," + (height - margin) + ")";
            })
            .call(xAxis);
    }

    function renderYAxis() {
        yAxisLength = height - 2 * margin;

        let scale = d3.scale.linear()
            .domain([domain.value, 0])
            .range([0, yAxisLength]);

        yAxis = d3.svg.axis()
            .scale(scale)
            .tickSubdivide(1)
            .orient("left");

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", function () {
                return "translate(" + margin + "," + margin + ")";
            })
            .call(yAxis);
    }

    function renderXGridlines() {
        let lines = d3.selectAll("g.x-axis g.tick")
            .select("line.grid-line")
            .remove();

        lines = d3.selectAll("g.x-axis g.tick")
            .style("stroke", "white")
            .append("line")
            .classed("grid-line", true)
            .style("stroke", "turquoise")
            .style("stroke-width", function (d, i) {
                return i == 0 ? 0 : .5;
            });

        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -yAxisLength);
    }

    function renderYGridlines() {
        let lines = d3.selectAll("g.y-axis g.tick")
            .select("line.grid-line").remove();

        lines = d3.selectAll("g.y-axis g.tick")
            .style("stroke", "white")
            .append("line")
            .classed("grid-line", true)
            .style("stroke", "turquoise")
            .style("stroke-width", function (d, i) {
                return i == 0 ? 0 : .5;
            });

        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", xAxisLength)
            .attr("y2", 0);
    }

    function adjustDomain() {
        if (domain.grow) {
            if ((domain.value + domain.step) <= domain.max) {
                domain.value += domain.step;
            } else {
                domain.grow = false;
                adjustDomain();
            }
        } else {
            if (domain.value - domain.step >= domain.min) {
                domain.value -= domain.step;
            } else {
                domain.grow = true;
                adjustDomain();
            }
        }
    }

    function configConsole() {
        console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
        console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
        console.group();
    }

    function rescale() {
        if (!domain.snapshot) {

            adjustDomain();

            xAxis.scale().domain([0, domain.value]);

            svg.select("g.x-axis")
                .transition()
                .duration(100)
                .call(xAxis);

            yAxis.scale().domain([domain.value, 0]);

            svg.select("g.y-axis")
                .transition()
                .duration(100)
                .call(yAxis);

            renderXGridlines();
            renderYGridlines();
        }
    }

    function run() {
        rescale();
        window.setTimeout(function () {
            run();
        }, 100);
    }

    function initCanvas() {
        domain.snapshot = true;
        if (svg) {
            svg.remove();
        }
        svg = d3.select("body").append("svg")
            .attr("class", "axis")
            .attr("width", width)
            .attr("height", height);
        renderYAxis();
        renderXAxis();
        renderXGridlines();
        renderYGridlines();
        domain.snapshot = false;
    }

    function init() {
        initCanvas();
        run();
    }

    function onDOMContentLoaded() {
        configConsole();
        init();
    }

    function onWindowResize() {
        height = window.innerHeight - (2 * margin);
        width = window.innerWidth - (2 * margin);
        initCanvas();
    }

    window.addEventListener("resize", function () {
        onWindowResize();
    }, false);
    document.body.addEventListener('DOMContentLoaded', onDOMContentLoaded(), false);


})(window.app = window.app || {}, d3)
