Ext.define('Fiddle.ReportHeader', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ReportSelector',
        'Fiddle.ReportHeaderController'
    ],
    alias: 'widget.reportheader',
    config: {
        controller: 'reportheader',
        layout: 'hbox',
        items: [{
            xtype: 'reportselector'
        }]
    }
});
