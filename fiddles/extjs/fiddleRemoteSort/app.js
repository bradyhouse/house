Ext.onReady(function () {

    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        config: {
            buffered: true,
            autoLoad: true,
            autoSort: false,
            remoteSort: true,
            cloneCount: 0,
            fields: [{
                    name: "text",
                    convert: undefined
            }],
            proxy: {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                },
                sortParam: 'sort'
            }
        }
    });

    Ext.define('App.GridPanel', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.usercorps',
        title: 'Fiddle ~ RemoteSort',
        initComponent: function () {
            this.title += '&nbsp;&nbsp;(ExtJS Version ' + Ext.getVersion().getMajor() + '.' + Ext.getVersion().getMinor() + '.' + Ext.getVersion().getPatch() + '.' + Ext.getVersion().getBuild() + ')</span>';
            this.callParent();
        },
        columns: [{
            text: "text",
            dataIndex: "text",
            flex: 3
        }, {
            text: "checked",
            dataIndex: "checked",
            flex: 1.5
        }, {
            text: "expanded",
            dataIndex: "expanded",
            flex: 1.5
        }, {
            text: "status",
            dataIndex: "status",
            flex: 1.5
        }]
    });

    Ext.create('App.Store', {
        storeId: 'myStore',
        listeners: {
            beforeload: 'onBeforeStoreLoad'
        },
        fields: [{
            name: "text",
            convert: undefined
        }, {
            name: "checked",
            defaultValue: false
        }, {
            name: "expanded",
            defaultValue: true
        }, {
            name: "status"
        }],
        onBeforeStoreLoad: function(store, operation) {
            if(!Ext.isEmpty(store.getSorters().items)) {
                Ext.Msg.alert('sorters',
                    operation.getSorters()[0].getDirection() + ', ' +
                    operation.getSorters()[0].getProperty() + ', ' +
                    operation.getSorters()[0].getRoot());
            }
        }
    });

    var myStore = Ext.getStore('myStore');

    myStore.loadPage(1);

    Ext.create('App.GridPanel', {
        store: myStore,
        renderTo: Ext.getBody()

    });
});