Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.PivotGrid'
    ],
    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },
    items: [{
        xtype: 'fiddlepivot',
        flex: 1
    }]
});
