(function (app, $, undefined) {
    "use strict";
    window.app.max = 100;
    window.app.data = [];

    for (var i = 0; i < window.app.max; ++i) {
        window.app.data.push(i);
    }

    window.app.colorScale = d3.scale.linear()
        .domain([0, window.app.max])
        .range(["yellow", "red"]);

    window.app.divergingScale = function (pivot) {
        var divergingColorScale = d3.scale.linear()
            .domain([0, pivot, window.app.max])
            .range(["white", "skyblue", "blue"]);
        return divergingColorScale;
    };

    window.app.render = function (data, scale, selector) {
        d3.select(selector).selectAll("div .cell")
            .data(data)
            .enter()
            .append("div")
            .classed("cell", true)
            .append("span");

        d3.select(selector).selectAll("div.cell")
            .data(data)
            .exit().remove();

        d3.select(selector).selectAll("div.cell")
            .data(data)
            .style("display", "inline-block")
            .style("background-color", function (d) {
                return scale(d);
            })
            .select("span")
            .text(function (d, i) {
                return ;
            });
    };

    window.app.render(window.app.data, window.app.colorScale, "#color");
    window.app.render(window.app.data, window.app.divergingScale(5), "#color-diverge");

})(window.app = window.app || {}, d3)


