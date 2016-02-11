
Ext.define('Fiddle.reportgrid.mixin.CSVExport', {
    extend: 'Ext.Mixin',
    isCSVExport: true,
    mixinConfig: {
        id: 'CSVExport',
        after: {
            init: 'init'
        }
    },
    init: function(view) {
        this.listen({
            component: {
                'tool[type=save]': {
                    click: 'onSaveToolClick'
                }
            }
        });
    },
    onSaveToolClick: function (tool, e, owner) {
        var view = this.getView(),
            selector = view.up().down('reportselector'),
            reportId = selector ? selector.getValue() : null,
            reportName = selector ? selector.getDisplayValue() : null,
            downloadDate = Ext.Date.format(new Date(),'d-M-y').toUpperCase(),
            downloadFileName = reportName ? downloadDate + '_' + reportName : null;

        if (reportId && downloadFileName) {
            return this.getView().downloadCSVFile(reportId, downloadFileName);
        }
    }
});
