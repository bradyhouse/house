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
        region: 'west',
        xtype: 'navigation',
        reference: 'navigation',
        border: false,
        collapsible: true,
        collapsed: true,
        width: '10%'
    }, {
        region: 'center',
        xtype: 'content',
        reference: 'content',
        width: '80%',
        height: '80%'
    }, {
        region: 'east',
        xtype: 'properties',
        reference: 'properties',
        border: false,
        collapsible: true,
        collapsed: true,
        width: '10%'
    }, {
        region: 'south',
        xtype: 'footer',
        reference: 'footer',
        framed: true,
        height: 100,
        padding: '1 1 1 1',
        collapsible: true,
        collapsed: true
    }]
});
