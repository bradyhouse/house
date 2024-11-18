
Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.view.Gauges'
    ],
    layout: 'fit',
    items: [{
        xtype: 'gaugesview'
    }]
});

