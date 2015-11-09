Ext.define('Fiddle.SeatComboBoxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.seatcombobox',
    onSeatComboBoxChange: function (combo, newValue, oldValue) {
        var tree = this.getView().up('panel'),
            store = tree.getStore();
        if (newValue == "All") {
            store.removeFilter('seatFilter');
        } else {
            store.addSeatFilter(newValue);
        }
    }
});
