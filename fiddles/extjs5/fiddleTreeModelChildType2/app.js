
Ext.onReady(function () {

    Ext.define('App.model.Animal', {
        extend: 'Ext.data.TreeModel',
        isAnimal: true,
        entityName: 'Animal',
        fields: [{
            name: 'title',
            mapping: 'id'
        }, {
            name: 'text',
            convert: function(value, record) {
                return record.data.animalTitle.id;
            }
        }, {
            name: 'checked',
            defaultValue: false
        }]
    });
    Ext.define('App.model.Classification', {
        extend: 'Ext.data.TreeModel',
        isClassification: true,
        requires: [
            'App.model.Animal'
        ],
        entityName: 'Classification',
        childType: 'Animal',
        fields: [{
            name: 'title',
            convert: undefined
        }, {
            name: 'text',
            convert: function(value, record) {
                return record.get('title');
            }
        }, {
            name: 'checked',
            defaultValue: false
        }]
    });
    Ext.define('App.store.Classifications', {
        extend: 'Ext.data.TreeStore',
        requires: [
            'App.model.Classification'
        ],
        model: 'App.model.Classification',
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json'
            },
            url: 'data.json'
        },
        autoLoad: false
    });

    var store = Ext.create('App.store.Classifications', {
        storeId: 'Classifications'
    });
    store.load();
    Ext.create('Ext.tree.Panel', {
        title: 'ChildType Heterogeneous TreeModel',
        store: store,
        rootVisible: false,
        renderTo: Ext.getBody(),
        listeners: {
            checkchange: function(node, checked) {
                Ext.Msg.alert('checkchange', node.parentNode.get('text'));
            }
        }
    });

});
