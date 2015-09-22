Ext.define('Ext.pivot.plugin.configurator.FilterValueWindow',{
    extend: 'Ext.pivot.plugin.configurator.FilterLabelWindow',

    titleText:      'Value filter ({0})',
    fieldText:      'Show items for which',

    initComponent: function(){
        var me = this;

        me.filterFields = [{
            xtype:          'combo',
            editable:       false,
            queryMode:      'local',
            valueField:     'value',
            store:          me.storeAgg,
            name:           'dimensionId'
        }];

        me.callParent(arguments);
    }
});
