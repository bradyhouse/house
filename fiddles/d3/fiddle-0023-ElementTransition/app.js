(function (app, $, undefined) {
    "use strict";
    var body = d3.select("body"),
        duration = 5000;

    body.append("div")
        .classed("box", true)
        .style("background-color", "#e9967a")
        .transition()
        .duration(duration)
        .style("background-color", "#add8e6")
        .style("margin-left", "600px")
        .style("width", "100px")
        .style("height", "100px");

})(window.app = window.app || {}, d3)
