Ext.define('Fiddle.Passenger', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Passenger',
    fields: [
        { name: 'Id', mapping: 'Id', type: 'string'},
        { name: 'Seat', mapping: 'Seat', type: 'string'}
    ]
});
