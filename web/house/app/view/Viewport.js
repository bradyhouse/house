/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define('House.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
        'House.view.north.AppHeader',
        'House.view.center.Content',
        'House.view.east.Navigation',
        'House.view.west.Properties',
        'House.view.south.Footer'
    ],
    layout: {
        type: 'border'
    },
    padding: '0 0 0 0',
    items: [{
        region: 'north',
        xtype: 'appHeader',
        reference: 'appHeader',
        framed: true,
        height: 50
    }, {
        region: 'center',
        xtype: 'content',
        reference: 'content',
        width: '1000%',
        height: '80%'
    }]
});
