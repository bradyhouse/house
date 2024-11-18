Ext.define('Fiddle.Flight', {
    extend: 'Ext.data.TreeModel',
    isFlight: true,
    entityName: 'Flight',
    childType: 'Package',
    fields: [ {
        name: 'destinationId',
        mapping: 'Destination.Id',
        reference: 'Destination',
        unique: true
    }, {
        name: 'checked',
        type: 'auto',
        defaultValue: false
    }, {
        name: "expanded",
        defaultValue: false
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
    }],
    isVisibleChildChecked: function() {
        if (this.childNodes) {
            return this.childNodes.filter(function(child) {
                return child.data.checked && child.data.visible;
            }).length > 0;
        }
    },
    deselectHiddenChildren: function() {
        if (this.childNodes) {
            this.childNodes.map(function(child) {
                if(!child.data.visible && child.data.checked) {
                    child.set('checked', false);
                }
            });
        }
    }


});
