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
        xtype: 'appheader',
        bodyStyle: {
            background: '#330000', // red
            color: '#FFFFFF',
            padding: '2px'
        },
        bodyPadding: '5 5 5 5',
        border: true,
        collapsible: false,
        split: true
    }, {
        region: 'west',
        xtype: 'navigation',
        border: false,
        bodyStyle: {
            background: '#331700', // brown
            padding: '5px'
        },
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
        bodyStyle: {
            padding: '5px',
            background: '#001F1F' // aqua
        },
        split: true,
        border: false,
        collapsible: true,
        collapsed: true,
        width: 250
    }, {
        region: 'south',
        xtype: 'footer',
        bodyStyle: {
            background: '#002900', // green
            color: '#FFFFFF',
            padding: '2px'
        },
        frame: true,
        split: true,
        border: true,
        bodyPadding: '5 5 5 5',
        collapsible: false
    }]
});
