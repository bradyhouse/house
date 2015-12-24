
Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ReportLeftPanel',
        'Fiddle.ReportHeader',
        'Fiddle.ReportGrid'
    ],
    layout: {
        type: 'border'
    },
    items: [{
        xtype: 'reportheader',
        region: 'north'
    }, {
        xtype: 'reportleftpanel',
        title: 'Filters',
        region: 'west',
        split: true,
        collapsible: true,
        width: 350
    }, {
        xtype: 'reportgrid',
        region: 'center',
        reportId: 'a',
        store: Ext.getStore('viewreportrecords')
    }]
});


