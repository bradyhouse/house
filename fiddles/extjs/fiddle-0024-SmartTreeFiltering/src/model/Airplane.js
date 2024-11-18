Ext.define('Fiddle.Airplane', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Airplane',
    fields: [
        { name: 'Id', type: 'string'},
        { name: 'longName', type: 'string'}
    ]
});
