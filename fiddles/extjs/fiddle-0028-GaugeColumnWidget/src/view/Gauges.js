Ext.define('Fiddle.view.Gauges', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Fiddle.widget.Gauge'
    ],
    alias: 'widget.gaugesview',
    store: fiddleStore,
    height: 350,
    width: 1050,
    title: null,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        markDirty: false
    },
    trackMouseOver: false,
    disableSelection: true,
    columns: [
        {
            dataIndex: 'id',
            text: 'id',
            flex: 1
        }, {
            dataIndex: 'd',
            text: 'd',
            flex: 1
        },
        {
            dataIndex: 'a',
            text: 'a',
            flex: 1
        },
        {
            dataIndex: 'b',
            text: 'b',
            flex: 1
        },
        {
            xtype: 'gaugecolumnwidget',
            dataIndex: 'e',
            width: 250,
            text: 'e'
        }
    ]
});
