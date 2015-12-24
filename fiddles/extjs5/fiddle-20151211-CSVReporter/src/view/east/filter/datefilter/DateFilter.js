Ext.define('Fiddle.DateFilter', {
    extend: 'Fiddle.BaseFilter',
    requires: [
        'Fiddle.DateSelector',
        'Fiddle.DateFilterController'
    ],
    alias: 'widget.datefilter',
    config: {
        controller: 'datefilter',
        title: 'Business Date',
        items: [{
            xtype: 'dateselector',
            listeners: {
                store: {
                    load: 'onDatesStoreLoad'
                }
            }
        }]
    }

});
