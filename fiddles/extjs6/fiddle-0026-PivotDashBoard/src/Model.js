
Ext.define('Fiddle.Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Id', type: 'string'},
        {name: 'a', type: 'string'},
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
            name: 'Scale',
            convert: function(value, record) {
                return record.isValidRecord() ? record.getScale(record) : 0;
            },
            depends: ['b']
        }
    ],
    isValidRecord: function(record) {
        var b = this.get('b');
        return Ext.isNumber(b);
    },
    getScale: function(record) {
        var b = record.get('b'),
            scale = (b === 0) ? 0 : Math.log(b);
        return scale;
    }
});
