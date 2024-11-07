Ext.define('Fiddle.AirportBase', {
    extend: 'Ext.data.TreeModel',
    entityName: 'AirportBase',
    fields: [
        { name: 'Id', type: 'string'},
        { name:'Time', type: 'string'}
    ]
});
