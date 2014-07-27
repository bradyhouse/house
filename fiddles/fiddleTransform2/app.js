Ext.onReady(function () {

    Ext.define('App.Model', {
        extend: 'Ext.data.Model',
        fields: ['id', 'f', 'l']
    });


    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        model: 'App.Model',
        requires: ['App.Model'],
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
                    rootProperty: 'data',
                    transform: {
                        fn: function (data) {
                            this.sayHello();
                            return data;
                        },
                        scope: me
                    }
                }
            };
        },

        sayHello: function () {
            Ext.Msg.alert('', 'Hello');
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
            columns: [{
                text: '#',
                dataIndex: 'id'
            }, {
                text: 'First Name',
                dataIndex: 'f'
            }, {
                text: 'Last Name',
                dataIndex: 'l'
            }],
            renderTo: Ext.getBody()
        });

    } catch (e) {
        Ext.Msg.alert('Error', e);
    }

});