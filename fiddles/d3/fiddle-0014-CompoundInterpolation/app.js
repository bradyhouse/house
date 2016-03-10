(function (app, $, undefined) {
    "use strict";
    var max = 21, data = [];

    var compoundScale = d3.scale.pow()
        .exponent(2)
        .domain([0, max])
        .range([
            {color:"#add8e6", height:"15px"},
            {color:"#4169e1", height:"150px"}
        ]);

    for (var i = 0; i < max; ++i) data.push(i);

    function render(data, scale, selector) {
        d3.select(selector).selectAll("div.v-bar")
            .data(data)
            .enter().append("div").classed("v-bar", true)
            .append("span");

        d3.select(selector).selectAll("div.v-bar")
            .data(data)
            .exit().remove();

        d3.select(selector).selectAll("div.v-bar")
            .data(data)
            .classed("v-bar", true)
            .style("height", function(d){
                return scale(d).height;
            })
            .style("background-color", function(d){
                return scale(d).color;
            })
            .select("span")
            .text(function(d,i){return i;});
    }

    render(data, compoundScale, "#compound");
})(window.app = window.app || {}, d3)
