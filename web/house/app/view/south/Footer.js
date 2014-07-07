/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define("House.view.south.Footer", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.footer',
    controller: 'footer',
    viewModel: {
        type: 'footer'
    },
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    padding: '0 0 0 0',
    bind: {
        html: '{text}'
    }
});