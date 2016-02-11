Ext.define('Fiddle.reportgrid.ReportGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportgrid',
    isReportGridController: true,
    mixins: [
        'Fiddle.reportgrid.mixin.CSVExport'
    ]
});
