(function (app, $, undefined) {
    "use strict";

    var max = 10,
        data = [],
        linear = d3.scale.linear()
            .domain([1, 10])
            .range([1, 10]),
        linearCapped = d3.scale.linear()
            .domain([1, 10])
            .range([1, 20]),
        pow = d3.scale.pow().exponent(2),
        powCapped = d3.scale.pow()
            .exponent(2)
            .domain([1, 10])
            .rangeRound([1, 10]),
        log = d3.scale.log(),
        logCapped = d3.scale.log()
            .domain([1, 10])
            .rangeRound([1, 10]);

    for (var i = 1; i < max; ++i) {
        data.push(i);
    }

    function render(data, scale, selector) {
        d3.select(selector).selectAll("div.cell")
            .data(data)
            .enter().append("div").classed("cell", true);

        d3.select(selector).selectAll("div.cell")
            .data(data)
            .exit().remove();

        d3.select(selector).selectAll("div.cell")
            .data(data)
            .style("display", "inline-block")
            .text(function (d) {
                return d3.round(scale(d), 2);
            });
    }

    render(data, linear, "#linear");
    render(data, linearCapped, "#linear-capped");
    render(data, pow, "#pow");
    render(data, powCapped, "#pow-capped");
    render(data, log, "#log");
    render(data, logCapped, "#log-capped");

})(window.app = window.app || {}, d3)
