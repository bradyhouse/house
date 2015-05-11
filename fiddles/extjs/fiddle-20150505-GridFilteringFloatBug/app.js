Ext.onReady(function () {

    var store = Ext.create('Ext.data.JsonStore', {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: '_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sortInfo: {
            field: 'name',
            direction: 'ASC'
        },
        pageSize: 50,
        storeId: 'myStore',
        fields: [{name: 'checkingBalance', type: 'float'}, {name: 'savingsBalance', type: 'auto'}]
    });

    Ext.create('Ext.grid.Panel', {
        border: false,
        store: store,
        renderTo: Ext.getBody(),
        columns: [{
            dataIndex: 'checkingBalance',
            text: 'Working Filter',
            format: '0,000.00',
            filter: {type: 'number'}
        }, {
            dataIndex: 'savingsBalance', format: '$0,000.00',
            text: 'Broken Filter', filter: {type: 'number'}
        }],
        loadMask: true,
        plugins: 'gridfilters'

    });

    store.load();


});
