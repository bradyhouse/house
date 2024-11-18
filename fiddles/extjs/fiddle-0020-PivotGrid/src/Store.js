
Ext.define('Fiddle.Store', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: meta.recordsUrl,
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: '_id',
            totalProperty: 'total'
        }
    },
    autoLoad: true,
    model: 'Fiddle.Model',
    remoteSort: false,
    sortInfo: {
        field: 'name',
        direction: 'ASC'
    },
    pageSize: 50,
    storeId: 'myStore'
}, function() {
    fiddleStore = new Fiddle.Store();
});


