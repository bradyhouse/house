(function (app, $, undefined) {
    "use strict";
    var svg = d3.select("body");


    var data = [4, 8, 15, 16, 23, 42],
        width = 960,
        height = 500,
        barWidth = (width /2) / data.length;

    var svg = d3.select("body").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    var gradient = svg.append("svg:defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#00cc00")
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#006600")
        .attr("stop-opacity", 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr("y", function(d) { return d; })
        .attr("height", function(d) { return height - d; })
        .attr("width", barWidth - 1);

    bar.append("rect")
        .attr("y", function(d) { return d; })
        .attr("width", barWidth - 1)
        .attr("height", function(d) { return height - d; })
        .style("fill", "url(#gradient)");


    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return height - 20; })
        .attr("dy", ".75em")
        .text(function(d) { return d; });



})(window.app = window.app || {}, d3)
