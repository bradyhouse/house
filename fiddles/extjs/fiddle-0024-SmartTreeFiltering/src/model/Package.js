Ext.define('Fiddle.Package', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Package',
    isPackage: true,
    fields: [
        { name: 'packageId', mapping: 'Id', reference: 'Passenger', type: 'string'},
        { name: 'packageLocal', mapping: 'Seat', reference: 'Passenger', type: 'string'},
        { name: 'section', mapping: 'Section', type: 'string'},
        { name: 'text',
            convert: function(val,rec) {
                return rec.data.Passenger.Id + ' (' + rec.data.Passenger.Seat + ')';
            },
            depends: ['packageId', 'packageLocal']
        }, {
            name: 'flightId',
            convert: function(val, rec) {
                return parent.flightId;
            }
        },{
            name: 'checked',
            type: 'auto',
            defaultValue: false
        }
    ]
});
