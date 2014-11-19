Ext.onReady(function() {
    Ext.define('App.model.Model', {
        extend: 'Ext.data.TreeModel',
        fields: [{
            name: 'text',
            convert: function(value, record) {
                return record ? record.get('id') : value;
            }
        }]
    });

    Ext.define('App.store.Store', {
        extend: 'Ext.data.TreeStore',
        requires: 'App.model.Model',
        model: 'App.model.Model',
        proxy: {
            type: 'ajax',
            url: 'fake',
            reader: {
                type: 'json'
            }
        }
    }, function(Store) {
        var store = new Store({
            storeId: 'data'
        });
    });

    var store = Ext.getStore('data');

    store.load({
        url: 'data.json'
    });

    var tree = Ext.create('Ext.tree.Panel', {
        store: 'data',
        renderTo: Ext.getBody(),
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }]
    });
});