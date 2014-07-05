Ext.onReady(function() {
    Ext.define('App.model.Model', {
        extend: 'Ext.data.TreeModel',
        fields: [{
            name: 'text',
            defaultValue: undefined,
            convert: function(value, record) {
                return record.get(id);
            }
        }]
    });

    Ext.define('App.store.Store', {
        extend: 'Ext.data.TreeStore',
        requires: 'App.model.Model',
        model: 'App.model.Model',
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'children'
            }
        },
        autoLoad: true
    });

    var tree = Ext.create('Ext.tree.Panel', {
        store: new App.store.Store(),
        rootVisible: false,
        renderTo: Ext.getBody(),
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }]
    });
});