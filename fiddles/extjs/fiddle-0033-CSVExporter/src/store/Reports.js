
Ext.define('Fiddle.Reports', {
    extend: 'Ext.data.Store',
    alias: 'store.reports',
    config: {
        storeId: 'reports',
        fields: ['displayName', 'id' ],
        data: [{
            id: 'a',
            displayName: 'Report-A',
        }, {
            id: 'b',
            displayName: 'Report-B'
        }]
    }
});
