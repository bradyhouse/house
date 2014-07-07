/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define('House.view.center.ContentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.content',
    onMapRender: function() {
        var map = this.lookupReference('map'),
            parent = map.up("[xtype='content']");
        parent.stretch(map);
        parent.setLoading(false);
    },
    onMapResize: function(map, width, height, oldWidth, oldHeight) {
        var map = this.lookupReference('map'),
            parent = map.up("[xtype='content']");
        parent.stretch(map);
    }
});