
Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ReportLeftPanel',
        'Fiddle.ReportHeader',
        'Fiddle.reportgrid.ReportGrid'
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
        scrollable: 'y',
        border: false,
        collapsible: true,
        width: 350
    }, {
        xtype: 'reportgrid',
        region: 'center',
        reportId: 'a',
        store: Ext.getStore('viewreportrecords')
    }]
});


