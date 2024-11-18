Ext.define('Fiddle.widget.Gauge', {
    extend: 'Ext.grid.column.Widget',
    xtype: 'gaugecolumnwidget',
    widget: {
        xtype: 'polar',
        border: false,
        height: 200,
        width: '100%',
        insetPadding: '15',
        axes: {
            label: {
                fontSize: 8
            },
            type: 'numeric',
            position: 'gauge',
            minimum: 0,
            maximum: 100,
            majorTickSteps: 4
        },
        series: {
            type: 'gauge',
            colors: ['#2B952B', '#444'],
            donut: 60
        }
    },
    initComponent: function() {
        console.log('init');
        this.callParent();
    }
});
