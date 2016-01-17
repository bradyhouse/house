Ext.define('Fiddle.view.selector.ItemSelector', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.itemselector',
    isItemSelector: true,
    config: {
        displayField: 'text',
        valueField: 'id',
        editable: false,
        width: 200,
        listeners: {
            afterrender: 'onAfterRender'
        }
    },
    constructor: function(config) {
        config.store = fiddleStore;
        this.callParent([config]);
    }
})
