(function (app, $, undefined) {
    "use strict";
    var margin = 25,
        height = window.innerHeight - 2 * margin,
        width = window.innerWidth - 2 * margin,
        axisWidth = width - 2 * margin;

    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    var scale = d3.scale.linear().domain([0, 100]).range([0, axisWidth]);

    var axis = d3.svg.axis()
        .scale(scale)
        .ticks(5)
        .tickSubdivide(5)
        .tickPadding(10)
        .tickFormat(function(v){
            return v + "%";
        });

    svg.append("g")
        .attr("transform", function(){
            return "translate(" + margin + "," + margin + ")";
        })
        .call(axis);


})(window.app = window.app || {}, d3)

