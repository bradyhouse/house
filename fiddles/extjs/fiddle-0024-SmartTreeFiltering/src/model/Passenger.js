Ext.define('Fiddle.Passenger', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Passenger',
    isPassenger: true,
    fields: [
        { name: 'Id', mapping: 'Id', type: 'string'},
        { name: 'Seat', mapping: 'Seat', type: 'string'},
        { name: 'checked', mapping: 'confirmed', defaultValue: false }

    ]
});
