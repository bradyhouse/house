Ext.define('Fiddle.Seats', {
    extend: 'Ext.data.Store',
    fields: ['seat'],
    data : [
        {"seat": "All"},
        {"seat":"1A" },
        {"seat":"1B" },
        {"seat": "2A"},
        {"seat": "2B"},
        {"seat": "3A"},
        {"seat": "3B"}
    ]
}, function () {
    seats = Ext.create('Fiddle.Seats', {
        storeId: 'seats'
    });
});
