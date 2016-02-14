
Ext.define('Fiddle.Records', {
    extend: 'Ext.data.Store',
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'items.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sortInfo: {
            field: 'name',
            direction: 'DESC'
        },
        pageSize: 50,
        fields: ['title', 'link', 'desc'],
        autoLoad: true
    }
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
    Ext.create('Ext.data.ChainedStore', {
        source: 'records',
        storeId: 'viewrecords'
    });
});


