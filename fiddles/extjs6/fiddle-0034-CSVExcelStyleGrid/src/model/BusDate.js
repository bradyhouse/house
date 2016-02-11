Ext.define('Fiddle.BusDate', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        mapping: 'id'
    }, {
        name: 'busDate',
        mapping: 'busDate'
    }, {
        name: 'displayDate',
        convert: function(value, record) {
            var date = new Date(record.data.busDate * 1000);
            return Ext.Date.format(date, 'm/d/Y');
        }
    }]
});
