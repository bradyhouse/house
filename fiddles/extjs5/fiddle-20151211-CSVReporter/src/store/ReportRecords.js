Ext.define('Fiddle.ReportRecords', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.ReportManager',
        'Fiddle.ReportRecordsFilter'],
    config: {
       reportId: null,
       fields: []
    },
    constructor: function (config) {
        var me = this,
            baseConfig = config || {};
        baseConfig.reportManager = new Fiddle.ReportManager({
        });
        baseConfig.proxy = me.getAppProxy();
        me.callParent([baseConfig]);
        reportManager.load(this.getReportId(), function(json, schema){
            this.fields = schema;
            this.setData(json.data);
        }, this);
    },
    getAppProxy: function () {
        var me = this;
        return {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        };
    },
    clearReportRecordsFilter(filterId, storeId) {
        var store = Ext.getStore(storeId);
        if (store) {
            store.removeFilter(filterId);
        }
    },

    addReportRecordsFilter(filterConfig, storeId) {
        var filterId = filterConfig.id,
            filterField = filterConfig.field,
            filterCriteria = filterConfig.criteria,
            filter = new Fiddle.ReportRecordsFilter({
                id: filterId,
                field: filterField,
                criteria: filterCriteria
            }),
            store = Ext.getStore(storeId);
        if (store) {
            store.removeFilter(filterId);
            store.addFilter(filter);
        }
    }

}, function() {
    reportManager = new Fiddle.ReportManager();
    fiddleStore = Ext.create('Fiddle.ReportRecords', {
       storeId: 'reportrecords',
       reportId: 'a'
    });
    fiddleChainedStore = Ext.create('Ext.data.ChainedStore', {
        source: 'reportrecords',
        storeId: 'viewreportrecords'
    });
});
