Ext.onReady(function () {

    Ext.define('App.Model', {
        extend: 'Ext.data.Model',
        fields: ['id', 'f', 'l']
    });


    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        model: 'App.Model',
        requires: ['App.Model'],
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                root: 'data',
                readRecords: function (data) {
                    Ext.Msg.alert('', 'Custom Read Records Fired!');
                    return Ext.data.reader.Json.prototype.readRecords.call(this, data);
                }
            }
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