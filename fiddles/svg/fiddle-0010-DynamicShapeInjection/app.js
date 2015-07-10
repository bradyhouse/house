(function (app, $, undefined) {
    "use strict";
    app.view = app.view || {
        hook: null,
        xmlns: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        addCircle: function (evt) {
            var circle = document.createElementNS(app.view.xmlns, "circle");
            circle.setAttributeNS(null, "r", 30);
            circle.setAttributeNS(null, "cx", evt.offsetX);
            circle.setAttributeNS(null, "cy", evt.offsetY);
            circle.setAttributeNS(null, "opacity", .5);
            circle.setAttributeNS(null, "fill", "red");
            document.getElementById('fiddleHook').appendChild(circle);
        },
        init: function () {
            app.view.hook = $('#fiddleHook');
            app.view.hook.on("click", null, null, function (evt) {
                app.view.addCircle(evt);
            }, false);
        }
    };
    $(document).ready(function () {
        app.view.init();
    });
})(window.app = window.app || {}, jQuery);


