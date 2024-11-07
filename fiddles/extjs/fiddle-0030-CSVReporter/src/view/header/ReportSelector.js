Ext.define('Fiddle.ReportSelector', {
    extend: 'Ext.form.ComboBox',
    requires: [
        'Fiddle.Reports'
    ],
    alias: 'widget.reportselector',
    config: {
        displayField: 'displayName',
        valueField: 'id',
        editable: false,
        width: 120,
        listeners: {
            change: 'onSelectorChange'
        }
    },
    constructor: function(config) {
        config.store = new Fiddle.Reports({
            autoLoad: true
        });
        config.value = config.store.data.first();
        this.callParent([config]);
    }

});
