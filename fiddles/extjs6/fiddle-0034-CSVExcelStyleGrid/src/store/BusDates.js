
Ext.define('Fiddle.BusDates', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.BusDate'
    ],
    config: {
        model: 'Fiddle.BusDate',
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'dates.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id'
            }
        },
        autoLoad: true
    }
});


