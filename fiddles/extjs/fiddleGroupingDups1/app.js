
Ext.onReady(function () {

    Ext.define('App.Model', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'id',
            type: 'string'
        }, {
            name: 'f',
            type: 'string'
        }, {
            name: 'l',
            type: 'string'
        }]
    });

    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        model: 'App.Model',
        requires: ['App.Model'],
        groupField: 'l',
        constructor: function (config) {
            var me = this,
                baseConfig = config || {};
            baseConfig.proxy = me.getAppProxy();
            me.callParent([baseConfig]);
        },
        getAppProxy: function () {
            var me = this;
            return {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    rootProperty: 'items',
                    transform: {
                        fn: function (data) {
                            var records = me.injectDuplicate(data.items);
                            data.items = records;
                            return data;
                        },
                        scope: me
                    }
                }
            };
        },
        injectDuplicate: function (items) {
            var records = [];
            if (items) {
                Ext.Array.forEach(items, function (item) {
                    records.push(item);
                    records.push(["4", "Tyrion", "Lanister"]);
                }, this);
            }
            return records;
        }
    });
    try {
        Ext.create('App.Store', {
            storeId: 'myStore'
        });
        var myStore = Ext.getStore('myStore');
        myStore.load();
        Ext.create('Ext.grid.Panel', {
            store: myStore,
            features: {
                id: 'group',
                ftype: 'grouping',
                groupHeaderTpl: '<b>{name}</b>',
                hideGroupedHeader: true,
                enableGroupingMenu: true
            },
            columns: [{
                text: "id",
                dataIndex: "id"
            }, {
                text: 'First Name',
                dataIndex: 'f',
                flex: 1
            }, {
                text: 'Last Name',
                dataIndex: 'l',
                flex: 1
            }],
            renderTo: Ext.getBody()
        });

    } catch (e) {
        Ext.Msg.alert('Error', e);
    }

});