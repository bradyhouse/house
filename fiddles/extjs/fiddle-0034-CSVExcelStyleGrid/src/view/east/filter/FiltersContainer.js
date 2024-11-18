Ext.define('Fiddle.FiltersContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.filterscontainer',
    requires: [
        'Fiddle.BaseFilter',
        'Fiddle.FieldsFilter'
    ],
    config: {
        layout: {
            type: 'fit'
        },
        border: false,
        reportId: null
    },
    constructor: function(config) {
        config.items = this.inflateItems(config.reportId);
        this.callParent([config]);
    },
    privates: {
        inflateItems: function(id) {
            return [{
                xtype: 'fieldsfilter',
                reportId: id
            }];
        }
    }

});
