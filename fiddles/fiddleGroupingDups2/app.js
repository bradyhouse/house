Ext.onReady(function () {
    Ext.define('App.Model', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'f',
            type: 'string'
        }, {
            name: 'l',
            type: 'string'
        }],
        identifier: 'uuid',
        getFullName: function () {
            return this.get('f') + ' ' + this.get('l');
        }
    });

    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        model: 'App.Model',
        requires: ['App.Model'],
        groupField: 'l',
        constructor: function (config) {
            var me = this,
                properties = config || {};
            properties.proxy = me.getAppProxy();
            me.callParent([properties]);
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
                    records.push(["Tyrion", "Lanister"]);
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
                enableGroupingMenu: false
            },
            columns: [{
                text: 'id',
                dataIndex: 'id',
                flex: 1
            }, {
                text: 'First Name',
                dataIndex: 'f'
            }, {
                text: 'Last Name',
                dataIndex: 'l'
            }, {

            }],
            renderTo: Ext.getBody()
        });

    } catch (e) {
        Ext.Msg.alert('Error', e);
    }

});