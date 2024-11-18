Ext.define('Fiddle.reportgrid.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportgrid',
    loadMask: true,
    controller: 'reportgrid',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    layout: {
        type: 'card',
        deferredRender: true,
        duration: 500
    },
    mixins: [
        'Fiddle.mixin.CSVExport'
    ],
    constructor: function(config) {
        config.columns = reportManager.columns(config.reportId);
        config.plugins = [{
            ptype: 'gridfilters'
        }];
        this.callParent([config]);
    }
});

