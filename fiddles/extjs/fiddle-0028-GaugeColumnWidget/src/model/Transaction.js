
Ext.define('Fiddle.model.Transaction', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'a', type: 'float'},
        {name: 'b', type: 'float'},
        {name: 'c', type: 'date', dateFormat: 'U'},
        {
            name: 'd',
            convert: function(value, record) {
                var date = record.get('c');
                return Ext.Date.format(date, 'm/d/Y');
            },
            depends: ['c']
        },
        {
            name: 'e',
            convert: function(value, record) {
                return Ext.Number.randomInt(0, 99);
            }
        }
    ]
});
