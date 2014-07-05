/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define("House.view.north.AppHeader", {
    extend: 'Ext.Container',
    xType: 'appHeader',
    alias: 'widget.appHeader',
    title: 'Houseknecht.com',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    initComponent: function() {
        document.title = this.title;
        this.items = [{
            xtype: 'component',
            id: 'app-header-logo'
        },{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            flex: 1
        }];
        this.callParent();
    }
});