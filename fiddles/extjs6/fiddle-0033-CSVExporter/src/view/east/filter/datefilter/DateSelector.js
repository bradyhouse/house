Ext.define('Fiddle.DateSelector', {
   extend: 'Ext.form.field.ComboBox',
   requires: [
       'Fiddle.BusDates'
   ],
   alias: 'widget.dateselector',
   config: {
       queryMode: 'local',
       editable: 'false',
       displayField: 'displayDate',
       valueField: 'busDate'
   },
   constructor: function(config) {
       config.store = new Fiddle.BusDates({
           storeId: 'busdates',
           autoLoad: true
       });
       config.value = config.store.data.first();
       this.callParent([config]);
   }
});
