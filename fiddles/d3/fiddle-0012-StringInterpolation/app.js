(function (app, $, undefined) {
    "use strict";
    var max = 11, data = [];

    var sizeScale = d3.scale.linear()
        .domain([0, max])
        .range([
            "italic bold 12px/30px Georgia, serif",
            "italic bold 120px/180px Georgia, serif"
        ]);

    for (var i = 0; i < max; ++i) data.push(i);

    function render(data, scale, selector) {
        d3.select(selector).selectAll("div.cell")
            .data(data)
            .enter().append("div").classed("cell", true)
            .append("span");

        d3.select(selector).selectAll("div.cell")
            .data(data)
            .exit().remove();

        d3.select(selector).selectAll("div.cell")
            .data(data)
            .style("display", "inline-block")
            .select("span")
            .style("font", function(d,i){
                return scale(d);
            })
            .text(function(d,i){return i;});
    }

    render(data, sizeScale, "#font");
})(window.app = window.app || {}, d3)


