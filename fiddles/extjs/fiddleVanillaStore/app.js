Ext.onReady(function () {

    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        constructor: function (config) {
            var me = this,
                cfg = config || {};
            cfg.proxy = me.getStoreProxy();
            cfg.fields = me.getStoreFields();
            me.callParent([cfg]);
        },
        getStoreFields: function () {
            return [
                {
                    name: "text",
                    convert: undefined
                },
                {
                    name: "checked",
                    defaultValue: false
                },
                {
                    name: "expanded",
                    defaultValue: true
                },
                {
                    name: "status"
                }
            ];
        },
        getStoreProxy: function () {
            return {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            };
        }

    });

    Ext.define('App.GridPanel', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.usercorps',
        title: 'Vanilla Store',
        columns: [
            {
                text: "text",
                dataIndex: "text",
                flex: 3
            },
            {
                text: "checked",
                dataIndex: "checked",
                flex: 1.5
            },
            {
                text: "expanded",
                dataIndex: "expanded",
                flex: 1.5
            },
            {
                text: "status",
                dataIndex: "status",
                flex: 1.5
            }
        ],
        single: true,
        initComponent: function () {
            this.title += '&nbsp;&nbsp;(ExtJS Version ' + Ext.getVersion().getMajor() + '.' + Ext.getVersion().getMinor() + '.' + Ext.getVersion().getPatch() + '.' + Ext.getVersion().getBuild() + ')</span>';
            this.callParent();
        }
    });

    Ext.create('App.Store', {
        storeId: 'myStore'
    });

    var myStore = Ext.getStore('myStore');
    myStore.load();
    Ext.create('App.GridPanel', {
        store: myStore,
        renderTo: Ext.getBody()
    });
});