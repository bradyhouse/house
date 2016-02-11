Ext.define('Fiddle.FilterCmds', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.FilterCmdsController'
    ],
    alias: 'widget.filtercmds',
    controller: 'filtercmds',
    bodyPadding: 5,
    border: false,
    items: [{
        xtype: 'button',
        width: 100,
        height: 25,
        text: 'Reset',
        handler: 'onResetButtonClick'
    }, { xtype: 'tbspacer',
        width: 20}]
});
