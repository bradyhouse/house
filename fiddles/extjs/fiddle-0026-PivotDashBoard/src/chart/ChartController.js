Ext.define('Fiddle.ChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddlechart',

    onAxisLabelRender: function (axis, label, layoutContext) {
        return layoutContext.renderer(label) + '$';
    }

});
