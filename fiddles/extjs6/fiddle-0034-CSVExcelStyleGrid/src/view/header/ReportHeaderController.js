Ext.define('Fiddle.ReportHeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportheader',
    mixins: [
        'Fiddle.view.header.mixin.ReportHeader',
        'Fiddle.view.header.mixin.ReportsStore'
    ]
});
