Ext.define('Fiddle.Store', {
    extend: 'Ext.data.BufferedStore',
    config: {
        proxy: {
            type: 'ajax',
            url: meta.recordsUrl,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        fields: ['_id', 'index', 'isActive',
            'checkingBalance', 'savingBalance',
            'picture', 'age', 'eyeColor',
            'name', 'gender', 'company',
            'email', 'address', 'about',
            'latitude', 'longitude'],
        pageSize: 500,
        trailingBufferZone: 20,
        leadingBufferZone: 281,
        autoLoad: true
    }
}, function () {
    fiddleStore = Ext.create('Fiddle.Store', {
        storeId: 'myStore'
    });
});
