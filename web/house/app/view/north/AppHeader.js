/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define("House.view.north.AppHeader", {
    extend: 'Ext.Container',
    xType: 'appHeader',
    alias: 'widget.appHeader',
    title: 'Houseknecht.com',
    padding: '10 0 0 10',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    controller: 'appheader',
    viewModel: {
        type: 'appheader'
    },
    initComponent: function() {
        document.title = this.title;
        this.items = [{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            flex: 1,
            bind: {
                html: '{text}'
            },
            listener: {
                afterrender: 'onAppHeaderAfterRender'
            }
        }];
        this.callParent();
    }

});