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
        frame: true,
        xtype: 'appHeader'
    }, {
        region: 'west',
        xtype: 'navigation',
        border: false,
        split: true,
        collapsible: true,
        collapsed: true,
        width: 250
    }, {
        region: 'center',
        xtype: 'content',
        border: false,
        bodyStyle: {
            padding: '5px'
        },
        split: true,
        collapsible: false
    }, {
        region: 'east',
        xtype: 'properties',
        split: true,
        border: false,
        collapsible: true,
        collapsed: true,
        width: 250
    }, {
        region: 'south',
        xtype: 'footer',
        frame: true,
        split: true,
        border: true,
        bodyPadding: '5 5 5 5',
        collapsible: false
    }]
});
