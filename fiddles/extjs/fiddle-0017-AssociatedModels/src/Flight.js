Ext.define('Fiddle.Flight', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Flight',

    /* NEW REQUIRED ATTRIBUTE */
    childType: 'Package',
    fields: [ {
        name: 'destinationId',
        mapping: 'Destination.Id',
        reference: 'Destination',
        unique: true
    }, {
        name: 'arrivalId',
        mapping: 'Arrival.Id',
        reference: 'Arrival',
        unique: true
    }, {
        name: 'airplaneId',
        mapping: 'Airplane.Id',
        reference: 'Airplane',
        unique: true
    }, {
        name: 'status',
        mapping: 'Status',
        type: 'string'
    }, {
        name: 'text',
        convert: function(value, record) {
            return record.get('airplaneId') + ' ' + record.get('destinationId') + '/' + record.get('arrivalId');
        },
        depends: ['airplaneId']
    }, {
        name: 'flightId',
        convert: function(value, record) {
            return record.get('airplaneId')
        },
        depends: ['airplaneId']
    }]
});
