(function (app, $, undefined) {
    "use strict";
    d3.select("#section1 > div")
        .attr("class", "blue box");

    d3.select("#section2")
        .select("div")
        .attr("class", "red box");
})(window.app = window.app || {}, d3)
