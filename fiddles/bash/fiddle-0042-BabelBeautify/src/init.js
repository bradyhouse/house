
app.controller = app.controller || {

    selectedShape: null,

    toolMenuItems: new Array("Rectangle", "Ellipse", "Star"),

    chosenToolMenuItem: "Rectangle",

    emptyFn: function () {
        return AppController.onEmptyFn();
    },

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

    onShapeGroupKeyUp: function (evt) {
        return AppController.onShapeGroupKeyUp(evt);
    },

    onSelectedShapeMouseUp: function () {
        return AppController.onSelectedShapeMouseUp();
    },

    onSelectedShapeMouseDown: function (evt) {
        return AppController.onSelectedShapeMouseDown(evt);
    },

    onSelectedShapeDrop: function () {
        return AppController.onSelectedShapeDrop();
    },

    onSelectedShapeDrag: function (evt, x, y) {
        return AppController.onSelectedShapeDrag(evt, x, y);
    },

    selectShape: function (evt, id) {
        return AppController.selectShape(evt, id);
    },

    onToolButtonMouseOver: function (btn) {
        return AppController.onToolButtonMouseOver(btn);
    },

    onToolButtonMouseOut: function (btn) {
        return AppController.onToolButtonMouseOut(btn);
    },

    onToolButtonMouseDown: function () {
        return AppController.onToolButtonMouseDown();
    },

    onToolStatusMouseOver: function () {
        return AppController.onToolStatusMouseOver();
    },

    onToolStatusMouseOut: function () {
        return AppController.onToolStatusMouseOut();
    },

    onToolStatusMouseDown: function () {
        return AppController.onToolStatusMouseDown();
    },

    onToolMenuMouseOut: function () {
        return AppController.onToolMenuMouseOut();
    },

    onToolMenuItemSelect: function (shape) {
        return AppController.onToolMenuItemSelect(shape);
    },

    onToolMenuItemMouseOver: function (itemId) {
        return AppController.onToolMenuItemMouseOver(itemId);
    },

    onToolMenuItemMouseOut: function (itemId) {
        return AppController.onToolMenuItemMouseOut(itemId);
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
    },
    menubar: function (config) {
        return new Menubar(config);
    },
    toolStatus: function () {
        return new ToolStatus();
    },
    toolButton: function () {
        return new ToolButton();
    },
    toolMenuInnerBorder: function () {
        return new ToolMenuInnerBorder();
    },
    toolMenuOuterBorder: function () {
        return new ToolMenuOuterBorder();
    },
    toolMenuItem: function (text, x, y) {
        return new ToolMenuItem(text, x, y);
    },
    toolMenu: function () {
        return new ToolMenu();
    },
    toolGroup: function () {
        return new ToolGroup();
    }
} : null;

if (!window.location.pathname.match('test')) {
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}

