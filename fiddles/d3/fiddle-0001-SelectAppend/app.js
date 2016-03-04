(function (app, $, undefined) {
    "use strict";
    function SimpleWidget(spec) {
        var instance = {},
            headline,
            description;

        instance.render = function () {
            var div = d3.select('body').append("div");
            div.append("h3").text(headline);
            div.attr("class", "box")
                .attr("style", "color:" + spec.color)
                .append("p")
                .text(description);
            return instance;
        };
        instance.headline = function (h) {
            if (!arguments.length) return headline;
            headline = h;
            return instance;
        };
        instance.description = function (d) {
            if (!arguments.length) return description;
            description = d;
            return instance;
        };
        return instance;
    }
    var widget = SimpleWidget({color: "#000000"})
        .headline("Simple Widget")
        .description("This is a simple widget demonstrating functional javascript.");
    widget.render();
})(window.app = window.app || {}, d3)
