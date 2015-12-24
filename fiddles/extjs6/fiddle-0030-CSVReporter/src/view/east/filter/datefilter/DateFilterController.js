Ext.define('Fiddle.DateFilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.datefilter',
    onDatesStoreLoad: function(store) {
        var view = this.getView(),
            selector = view.down('dateselector'),
            busDate = store.data.first();

        if (busDate) {
            selector.setValue(busDate);
        }


    }
})
