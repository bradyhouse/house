Ext.define('Fiddle.store.Transactions', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Transaction'
    ],
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: meta.url,
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },
    autoLoad: true,
    model: 'Fiddle.model.Transaction',
    remoteSort: false,
    pageSize: 50,
    storeId: 'transactions'
}, function() {
    fiddleStore = new Fiddle.store.Transactions();
});
