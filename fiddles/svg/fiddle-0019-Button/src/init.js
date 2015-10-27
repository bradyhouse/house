
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
 *
 * @type {*|{group: Function, surface: Function, basePath: Function, star: Function, xmlNamespaces: Function, splitAttribute: Function, mapFromQueryString: Function, color: Function}}
 */
app.test = window.location.pathname.match('test') ? app.test || {
    group: function (config) {
        return new Group(config);
    },
    surface: function (config) {
        return new Surface(config);
    },
    basePath: function (config) {
        return new BasePath(config);
    },
    star: function (config) {
        return new Star(config);
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
    }
} : null;

if (!window.location.pathname.match('test')) {
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}


