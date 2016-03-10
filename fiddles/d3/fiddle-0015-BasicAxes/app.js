(function (app, $, undefined) {
    "use strict";
    var height = 500,
        width = 500,
        margin = 25,
        offset = 50,
        axisWidth = width - 2 * margin,
        svg;

    window.app.createSvg = function(){
        svg = d3.select("body").append("svg")
            .attr("class", "axis") // <-C
            .attr("width", width)
            .attr("height", height);
    }

    window.app.renderAxis = function(scale, i, orient){
        var axis = d3.svg.axis() // <-D
            .scale(scale) // <-E
            .orient(orient) // <-F
            .ticks(5); // <-G

        svg.append("g")
            .attr("transform", function(){ // <-H
                if(["top", "bottom"].indexOf(orient) >= 0)
                    return "translate(" + margin + "," + i * offset + ")";
                else
                    return "translate(" + i * offset + ", " + margin + ")";
            })
            .call(axis); // <-I
    }

    window.app.renderAll = function(orient){
        if(svg) svg.remove();

        window.app.createSvg();

        window.app.renderAxis(d3.scale.linear()
            .domain([0, 1000])
            .range([0, axisWidth]), 1, orient);
        window.app.renderAxis(d3.scale.pow()
            .exponent(2)
            .domain([0, 1000])
            .range([0, axisWidth]), 2, orient);
        window.app.renderAxis(d3.time.scale()
            .domain([new Date(2012, 0, 1), new Date()])
            .range([0, axisWidth]), 3, orient);
    }
})(window.app = window.app || {}, d3)
