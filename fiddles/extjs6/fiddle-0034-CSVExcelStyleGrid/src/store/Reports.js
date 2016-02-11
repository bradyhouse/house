
Ext.define('Fiddle.Reports', {
    extend: 'Ext.data.Store',
    alias: 'store.reports',
    config: {
        storeId: 'reports',
        fields: ['displayName', 'id' ],
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: meta.urls.reports,
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id'
            }
        },
        autoLoad: true

    }
});
