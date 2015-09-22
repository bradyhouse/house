Ext.define('Fiddle.Store', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'Fiddle.Flight'
    ],
    model: 'Fiddle.Flight',
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json'
        }
    }
}, function () {
    fiddleStore = Ext.create('Fiddle.Store', {
        storeId: 'fiddle'
    });
});
