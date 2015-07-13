(function (app, $, undefined) {
    "use strict";
    app.util = app.util || {
        rand: function (l, u) {
            return Math.floor(Math.random() * (u - l + 1)) + l;
        },
        guid: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
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
                        i = 0;

                    for (; i < this.fields.length; i++) {
                        field = this.fields[i];
                        if (this.data.hasOwnProperty(field)) {
                            element.setAttributeNS(null, field, this.data[field]);
                        }
                    }
                    canvas.appendChild(element);
                }
            }
        }
    };
    app.store = app.store || {
        circles: []
    };
    app.view = app.view || {
        hook: null,
        addCircle: function () {
            var circle = new app.model.Circle({
                r: app.util.rand(0, 30),
                cx: app.util.rand(0, app.view.hook.offsetWidth),
                cy: app.util.rand(0, app.view.hook.offsetHeight),
                opacity: .5,
                fill: 'yellow',
                id: app.util.guid()
            });
            app.store.circles.push(circle);
            circle.appendTo(app.view.hook);

        },
        run: function () {
            app.view.addCircle();
            window.requestAnimationFrame(
                window.setTimeout(function () {
                    app.view.run();
                }, app.util.rand(200, 500)));
        },
        render: function () {
            app.view.run();
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


