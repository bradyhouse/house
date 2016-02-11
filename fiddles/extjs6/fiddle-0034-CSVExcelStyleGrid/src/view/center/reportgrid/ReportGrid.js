Ext.define('Fiddle.reportgrid.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportgrid',
    loadMask: true,
    controller: 'reportgrid',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    viewConfig: {
        emptyText: '<div style="width:auto; height:auto; text-align:center; color:red; font-weight:bold;">No data available.</div>',
        deferEmptyText: true
    },
    layout: {
        type: 'card'
    },
    mixins: [
        'Fiddle.mixin.CSVExport'
    ],
    constructor: function(config) {
        config.plugins = [{
            ptype: 'gridfilters'
        }];
        this.callParent([config]);
    }
});

