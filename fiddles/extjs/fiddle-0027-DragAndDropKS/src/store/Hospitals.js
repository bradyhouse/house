Ext.define('Fiddle.store.Hospitals', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Hospital'
    ],
    config: {
        model: 'Fiddle.model.Hospital',
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'hospitals.json',
            reader: {
                type: 'json',
                rootProperty: 'data'

            }
        },
        remoteSort: false,
        autoLoad: true
    }
}, function () {
    hospitalStore = Ext.create('Fiddle.store.Hospitals', {
        storeId: 'hospitals'
    });
});
