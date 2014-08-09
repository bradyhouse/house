/* UNDER CONSTRUCTION  */

Ext.onReady(function () {

    Ext.define('fiddleTitleAlignTarget.model.Animal', {
        extend: 'Ext.data.TreeModel',
        entityName: 'Animal',
        idProperty: 'animalid',
        fields: [{
            name: "title",
            convert: undefined
        }]
    });

    Ext.define('fiddleTitleAlignTarget.store.Animals', {
        extend: 'Ext.data.TreeStore',
        model: 'fiddleTitleAlignTarget.model.Animal',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'data.json'
        },
        autoload: true
    });

    Ext.define('fiddleTitleAlignTarget.tree.Animals', {
        extend: 'Ext.tree.Panel',
        xtype: 'tree-animals',
        store: 'Animals',
        rootVisible: false,
        frame: true,
        title: 'fiddleTitleAlignTarget',
        width: 650,
        height: 400,
        useArrows: true,
        columns: [{
            xtype: 'treecolumn',
            text: 'Animal',
            flex: 2.5,
            sortable: true,
            dataIndex: 'title'
        }, {
            text: 'Id',
            flex: 1,
            dataIndex: 'animalid',
            sortable: true
        }]
    });

    Ext.define('fiddleTitleAlignTarget.Main', {
        extend: "Ext.window.Window",
        height: 200,
        width: 400,
        layout: 'fit'
    });

    Ext.create('fiddleTitleAlignTarget.store.Animals', {
        storeId: 'Animals'
    });

    var version = Ext.getVersion().getBuild();


    Ext.create('fiddleTitleAlignTarget.Main', {
        title: version,
        items: [{
            xtype: 'tree-animals'
        }]
    }).show();

});
