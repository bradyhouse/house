Ext.define('Fiddle.FieldsFilter', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.FieldFilter',
        'Fiddle.FieldsFilterController'
    ],
    alias: 'widget.fieldsfilter',
    config: {
        controller: 'fieldsfilter',
        layout: {
            type: 'vbox',
            align: 'left'
        },
        reportId: ''
    },
    constructor: function (config) {
        var myConfig = config || {};
        myConfig.items = this.buildItems(config.reportId, Ext.getStore('reportrecords'));
        this.callParent([myConfig]);
    },

    applyFilters: function() {
        var viewStore = Ext.getStore('reportrecords'),
            filters = this.items.filter(function(item) { return item.isBaseFilter; });

        filters.items.map(function(item) {
            if (item.getFilter().criteria.length > 0) {
                viewStore.addReportRecordsFilter(item.getFilter());
            }
        });
    },

    resetFilters: function() {
        var store = Ext.getStore('reportrecords'),
            filters = this.items.filter(function(item) { return item.isBaseFilter; });
        filters.items.map(function(item) {
           item.down('tagfield').setValue([]);
        });
    },


    privates: {
        buildItems: function (reportId, store) {
            var fields = store.count() > 0 ? store.getFields() : reportManager.fields(reportId),
                items = [],
                item = null;
            fields.map(function (field) {
                item = new Fiddle.FieldFilter({
                    displayField: field,
                    valueField: field,
                    title: field,
                    reportFilterId: field + '-filter',
                    reportFilterField: field,
                    reportFilterCriteria: []
                });
                items.push(item);
            });
            return items;
        }
    }
});
