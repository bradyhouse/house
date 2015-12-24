
Ext.define('Fiddle.store.Patients', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Patient'
    ],
    config: {
        model: 'Fiddle.model.Patient',
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'patients.json',
            reader: {
                type: 'json',
                rootProperty: 'data'

            }
        },
        remoteSort: false,
        autoLoad: true
    }
}, function () {
    patientStore = Ext.create('Fiddle.store.Patients', {
        storeId: 'patients'
    });
});


