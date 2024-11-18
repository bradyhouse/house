Ext.define('Fiddle.SeatComboBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.seatcombobox',
    requires: [
        'Fiddle.SeatComboBoxController'
    ],
    controller: 'seatcombobox',
    fieldLabel: 'Seat Filter:',
    value: ['ALL'],
    store: seats,
    queryMode: 'local',
    displayField: 'seat',
    valueField: 'seat',
    listeners: {
        change: 'onSeatComboBoxChange'
    }
});
