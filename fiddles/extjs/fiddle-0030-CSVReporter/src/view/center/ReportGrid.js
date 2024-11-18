Ext.define('Fiddle.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportgrid',
    loadMask: true,
    layout: {
        type: 'card',
        deferredRender: true,
        duration: 500
    },
    constructor: function(config) {
        config.columns = reportManager.columns(config.reportId);
        this.callParent([config]);
    }
});

