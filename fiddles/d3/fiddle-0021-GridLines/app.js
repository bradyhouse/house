(function (app, $, undefined) {
    "use strict";

    let metadata = {
        fiddleHeader: 'D3 - Axes & Grid Lines',
        urls: {
            data: 'data.json',
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/d3/fiddle-0021-GridLines'
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
        },
        margin = 25,
        height = window.innerHeight - (2 * margin),
        width = window.innerWidth - (2 * margin),
        svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    function renderXAxis(){
        let axisLength = width - 2 * margin,
            scale = d3.scale.linear()
                .domain([0, 10000])
                .range([0, axisLength]),
            xAxis = d3.svg.axis()
                .scale(scale)
                .ticks(30)
                .orient("bottom");

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", function(){
                return "translate(" + margin + "," + (height - margin) + ")";
            })
            .call(xAxis);

        d3.selectAll("g.x-axis g.tick")
            .style("stroke", "white")
            .append("line")
            .classed("grid-line", true)
            .style("stroke", "magenta")
            .style("stroke-width", function(d, i) {
                return i == 0 ? 0 : 1;
            })
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", - (height - 2 * margin));
    }
    function renderYAxis(){
        let axisLength = height - 2 * margin,
            scale = d3.scale.linear()
                .domain([100, 0])
                .range([0, axisLength]),
            yAxis = d3.svg.axis()
                .scale(scale)
                .ticks(10)
                .tickFormat(function(v){
                    return v + "%";
                })
                .orient("left");

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", function(){
                return "translate(" + margin + "," + margin + ")";
            })
            .call(yAxis);

        d3.selectAll("g.y-axis g.tick")
            .style("stroke", "white")
            .append("line")
            .classed("grid-line", true)
            .style("stroke", "turquoise")
            .style("stroke-width", function(d, i) {
                return i == 0 ? 0 : 1;
            })
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width - 2 * margin)
            .attr("y2", 0);
    }

    renderYAxis();
    renderXAxis();

    console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

})(window.app = window.app || {}, d3)

