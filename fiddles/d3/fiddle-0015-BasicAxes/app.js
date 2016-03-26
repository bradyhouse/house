(function (app, $, undefined) {
    "use strict";

    let margin = 25,
        height = (window.innerHeight / 2) - (2 * margin),
        width =window.innerWidth - (2 * margin),
        offset = 50,
        axisWidth = width - 2 * margin,
        axisHeight = height - 2 * margin,
        svg;

    window.app.createSvg = function(id, height, usediv){
        if (usediv) {
            let div = d3.select("body")
                .append("div")
                .attr("id", id)
                .attr("class", "box");
            svg = div.append("svg")
                .attr("class", "axis")
                .attr("width", width)
                .attr("height", height);
        } else {
            svg = d3.select("#" + id).append("svg")
                .attr("class", "axis")
                .attr("width", width)
                .attr("height", height);
        }
    }

    window.app.renderAxis = function(scale, i, orient){
        var axis = d3.svg.axis()
            .scale(scale)
            .orient(orient)
            .ticks(5);

        svg.append("g")
            .attr("transform", function(){
                if(["top", "bottom"].indexOf(orient) >= 0)
                    return "translate(" + margin + "," + i * offset + ")";
                else
                    return "translate(" + i * offset + ", " + margin + ")";
            })
            .call(axis);
    }

    window.app.renderAll = function(orient, axisWidth, height, id, usediv){

        window.app.createSvg(id, height, usediv);

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

    window.app.renderAll('bottom', axisWidth, height, 'h-axis', true);
    window.app.renderAll('left', axisHeight, height, 'v-axis', true);


})(window.app = window.app || {}, d3)

