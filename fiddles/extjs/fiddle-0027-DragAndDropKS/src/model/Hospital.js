Ext.define('Fiddle.model.Hospital', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: ['name', 'address', 'telephone', 'patients']
});
