(function (app, $, undefined) {
    "use strict";
    app.i = app.i || '';
    app.print = function (c) {
        var span = document.createElement("span");
        span.class = "text-danger";
        $(span).text(c + " ");
        $("#fiddleHook").append(span);
    };
    app.run = function () {
        app.print(app.i);
        app.i++;
        window.requestAnimationFrame(app.run());
    };
    $(document).ready(function () {
        window.requestAnimationFrame(app.run());
    });
})(window.app = window.app || {}, jQuery);
