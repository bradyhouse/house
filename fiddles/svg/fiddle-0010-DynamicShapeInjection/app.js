(function (app, $, undefined) {
    "use strict";
    app.util = app.util || {
        rand: function (l, u) {
            return Math.floor(Math.random() * (u - l + 1)) + l;
        }
    };
    app.model = app.model || {
        Circle: function (config) {
            var fields = ['r', 'cx', 'cy', 'opacity', 'fill', 'id'],
                field = '',
                i = 0;
            for (; i < fields.length; i++) {
                field = fields[i];
                if (config && config.hasOwnProperty(field)) {
                    this[field] = config[field];
                } else {
                    this[field] = '';
                }
            }
            return {
                data: this,
                fields: fields,
                appendTo: function (canvas) {
                    var xmlns = "http://www.w3.org/2000/svg",
                        element = document.createElementNS(xmlns, "circle"),
                        field = '',
                        i = 0,
                         value;

                    for (; i < this.fields.length; i++) {
                        field = this.fields[i];

                        if (this.data.hasOwnProperty(field) && this.data[field]) {
                             value = isNaN(this.data[field]) ? this.data[field] : +(this.data[field]);
                            element.setAttributeNS(null, field, value);
                        }
                    }
                    canvas.appendChild(element);
                }
            }
        }
    };
    app.view = app.view || {
        hook: null,
        addCircle: function () {
            var circle = new app.model.Circle({
                r: app.util.rand(0, 30),
                cx: app.util.rand(0, $("#fiddleHook").width()),
                cy: app.util.rand(0, $("#fiddleHook").height()),
                opacity: .5,
                fill: 'yellow'
            });

            circle.appendTo(app.view.hook);
        },
        run: function () {
            app.view.addCircle();
            window.setTimeout(function () {
                app.view.run();
            }, 100);
        },
        render: function () {
            if (window != window.top && (window.innerHeight <= 450)) {
                $('#staticPreview').show();
            } else {
                $('#fiddleHook').show();
                app.view.run();
            }
        },
        init: function () {
            app.view.hook = document.getElementById('fiddleHook');
            app.view.render();
        }
    };
    $(document).ready(function () {
        app.view.init();
    });
})(window.app = window.app || {}, jQuery);

