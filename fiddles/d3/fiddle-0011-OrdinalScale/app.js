(function (app, $, undefined) {
    "use strict";
    var max = 10, data = [];

    for (var i = 0; i < max; ++i) data.push(i);

    var alphabet = d3.scale.ordinal()
        .domain(data)
        .range(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);

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
            .style("background-color", function(d){
                return scale(d).indexOf("#")>=0?scale(d):"white";
            })
            .text(function (d) {
                return scale(d);
            });
    }

    render(data, alphabet, "#alphabet");
    render(data, d3.scale.category10(), "#category10");
    render(data, d3.scale.category20(), "#category20");
    render(data, d3.scale.category20b(), "#category20b");
    render(data, d3.scale.category20c(), "#category20c");

})(window.app = window.app || {}, d3)

