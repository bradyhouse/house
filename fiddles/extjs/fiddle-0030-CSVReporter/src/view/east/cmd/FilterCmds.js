Ext.define('Fiddle.FilterCmds', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.FilterCmdsController'
    ],
    alias: 'widget.filtercmds',
    controller: 'filtercmds',
    padding: '20 10 10 10',
    bodyStyle: {
        background: '#3A4155'
    },
    items: [ {
        xtype: 'button',
        width: 100,
        height: 40,
        text: 'Reset',
        handler: 'onResetButtonClick'
    }]
});
