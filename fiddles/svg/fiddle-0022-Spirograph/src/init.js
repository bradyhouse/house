

/**
 * AppController static method page hook.
 *
 * @type {{selectedShape: null, onSurfaceLoad: Function, onPathMouseDown: Function, onPathMouseOut: Function, onPathMouseOver: Function, onGroupMouseDown: Function, onSelectedShapeMouseUp: Function, onSelectedShapeMouseDown: Function, onSelectedShapeDrop: Function, selectShape: Function, onDOMContentLoaded: Function}|*}
 */
app.controller = app.controller || {

    selectedShape: null,

    onSurfaceLoad: function (evt) {
        return AppController.onSurfaceLoad(evt);

    },

    onPathMouseDown: function (path, evt) {
        return AppController.onPathMouseDown(path, evt);
    },

    onPathMouseOut: function (path, evt) {
        return AppController.onPathMouseOut(path, evt);
    },

    onPathMouseOver: function (path, evt) {
        return AppController.onPathMouseOver(path, evt);
    },

    onShapeGroupMouseDown: function (evt) {
        return AppController.onShapeGroupMouseDown(evt);
    },

    onShapeGroupKeyUp: function(evt) {
        return AppController.onShapeGroupKeyUp(evt);
    },

    onSelectedShapeMouseUp: function() {
        return AppController.onSelectedShapeMouseUp();
    },

    onSelectedShapeMouseDown: function(evt) {
        return AppController.onSelectedShapeMouseDown(evt);
    },

    onSelectedShapeDrop: function() {
        return AppController.onSelectedShapeDrop();
    },

    onSelectedShapeDrag: function(evt, x, y) {
        return AppController.onSelectedShapeDrag(evt, x, y);
    },

    selectShape: function(evt, id) {
        return AppController.selectShape(evt, id);
    },

    onDOMContentLoaded: function () {
        var fiddleHook = document.getElementById('fiddleHook');
        app.surface = app.surface || new Surface({
            hook: fiddleHook,
            autoBind: true,
            autoPopulate: true
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
    mapFromQueryString: function(url, parameter) {
        return Util.mapFromQueryString(url, parameter);
    },
    color: function () {
        return Util.color();
    }
} : null;

if (!window.location.pathname.match('test')) {
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}


