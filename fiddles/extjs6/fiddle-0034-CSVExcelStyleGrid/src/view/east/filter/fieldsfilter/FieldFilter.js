Ext.define('Fiddle.FieldFilter', {
    extend: 'Fiddle.BaseFilter',
    alias: 'widget.fieldfilter',
    constructor: function(config) {
        if (config) {
            config.items = this.inflateItems(Ext.getStore('reportrecords'), config.displayField, config.valueField);
        }
        this.callParent([config]);
    },
    privates: {
        inflateItems: function(dataStore, displayFieldName, valueFieldName, labelText) {
            var tagField = this.inflateTagField(dataStore, displayFieldName, valueFieldName);
            return [
                tagField
            ]
        },
        inflateTagField: function(dataStore, displayFieldName, valueFieldName, labelText) {
           return {
                xtype: 'tagfield',
                store: dataStore,
                width: 320,
                shrinkWrap: 2,
                displayField: displayFieldName,
                valueField: valueFieldName,
                queryMode: 'local',
                //filterPickList: true,
                listeners: {
                    change: 'onTagValueChange'
                }
           }
        }
    }
})
