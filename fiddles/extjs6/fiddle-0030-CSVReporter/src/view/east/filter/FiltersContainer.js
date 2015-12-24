Ext.define('Fiddle.FiltersContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.filterscontainer',
    requires: [
        'Fiddle.BaseFilter',
        'Fiddle.FieldsFilter',
        'Fiddle.DateFilter'
    ],
    layout: {
        type: 'form'
    },

    constructor: function(config) {
        config.items = this.inflateItems(config.reportId, reportManager.filters(config.reportId));
        this.callParent([config]);
    },
    privates: {
        inflateItems: function(id, list) {
            var items = [];
            list.map(function(itemName) {
                items.push(Ext.create(itemName, {
                    reportId: id
                }));
            });
            return items;
        }
    }

});
