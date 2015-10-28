

app.controller = app.controller || {
        onDOMContentLoaded: function () {
            var fiddleHook = document.getElementById('fiddleHook');
            app.view.Viewport = new Viewport({
                hook: fiddleHook
            });
        }
    };


/**
 * "Debug" Jasmine testing hooks.
 */
app.test = window.location.pathname.match('test') ? app.test || {
    group: function (config) {
        return new Group(config);
    },
    surface: function (config) {
        return new Surface(config);
    },
    path: function (config) {
        return new Path(config);
    },
    xmlNamespaces: function () {
        return Util.xmlNamespaces();
    },
    splitAttribute: function (field, id, defVal) {
        return Util.splitAttribute(field, id, defVal);
    },
    mapFromQueryString: function (url, parameter) {
        return Util.mapFromQueryString(url, parameter);
    },
    color: function () {
        return Util.color();
    },
    rectangle: function (config) {
        return new Rectangle(config);
    },
    text: function (config) {
        return new Text(config);
    },
    circle: function (config) {
        return new Circle(config);
    }
} : null;

if (!window.location.pathname.match('test')) {
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}


