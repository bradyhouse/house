Ext.define('Fiddle.model.Patient', {
    extend: 'Ext.data.Model',
    idProperty: 'insuranceCode',
    fields: ['name', 'address', 'telephone']
});
