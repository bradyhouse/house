(function (app, $, undefined) {
    "use strict";
    d3.selectAll("div")
        .attr("class", "red box")
        .each(function (d, i) {
            d3.select(this).append("h1").text(i);
        });
})(window.app = window.app || {}, d3)

