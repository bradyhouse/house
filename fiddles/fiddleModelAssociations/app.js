/* UNDER CONSTRUCTION */

/***************************
 DEFINE THE AIRPORT MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.AirportBase', {
    extend: 'Ext.data.TreeModel',
    entityName: 'AirportBase',
    fields: [
        { name: 'Id', type: 'string'},
        { name:'Time', type: 'string'}
    ]
});

/***************************
 DEFINE THE DESTINATION
 MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Destination', {
    extend: 'FiddleAssociatedModels.model.AirportBase',
    entityName: 'Destination'
});

/***************************
 DEFINE THE ARRIVAL MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Arrival', {
    extend: 'FiddleAssociatedModels.model.AirportBase',
    entityName: 'Arrival'
});

/***************************
 DEFINE AIR PLANE MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Airplane', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Airplane',
    fields: [
        { name: 'Id', type: 'string'},
        { name: 'longName', type: 'string'}
    ]
});


/***************************
 DEFINE CARGO MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Cargo', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Cargo',
    fields: [
        { name: 'passengerId', mapping: 'Passenger.Id', type: 'string'},
        { name: 'passengerSeat', mapping: 'Passenger.Seat', type: 'string'},
        { name: 'section', mapping: 'Section', type: 'string'},
        { name: 'text',
            convert: function(val,rec) {
                console.log(rec);
                return rec.get('passengerId');
            },
            depends: ['passengerId']
        },
        { name: 'flightId',
            reference: {
                parent: 'Flight',
                role: 'airplane',
                inverse: 'cargos',
                association: 'CargosByAirplane'
            }}
    ]
});

/***************************
 DEFINE FLIGHT MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Flight', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Flight',
    childType: 'Cargo',
    fields: [ {
        name: 'destinationId',
        mapping: 'Destination.Id',
        reference: 'Destination'
    }, {
        name: 'arrivalId',
        mapping: 'Arrival.Id',
        reference: 'Arrival'
    }, {
        name: 'airplaneId',
        mapping: 'Airplane.Id',
        reference: 'Airplane'
    }, {
        name: 'status',
        mapping: 'Status',
        type: 'string'
    }, {
        name: 'text',
        convert: function(value, record) {
            return record.get('airplaneId');
        },
        depends: ['airplaneId']
    }]
});





/*****************************
 DEFINE THE STORE.
 ******************************/
Ext.define('FiddleAssociatedModels.store.Flights', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'FiddleAssociatedModels.model.Flight'
    ],
    model: 'FiddleAssociatedModels.model.Flight',
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json'
        }
    }
});

/*****************************
 DEFINE THE TREE COMPONENT.
 ******************************/
Ext.define('FiddleAssociatedModels.view.Flights', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'FiddleAssociatedModels.model.*'],
    store: 'Flights',
    alias: 'widget.flights',
    title: 'Associated Models',
    columns: [{
        xtype: 'treecolumn',
        text: 'Flight-Passenger',
        flex: 2.5,
        sortable: true,
        dataIndex: 'text'
    }, {
        text: 'Entity',
        flex: 1,
        renderer: function(v, cellValues, record) {
            return record.entityName;
        }
    }],
    single: true
});

/*****************************
 DEFINE THE MAIN CONTAINER.
 ******************************/
Ext.define('FiddleAssociatedModels.Main', {
    extend: "Ext.container.Container",
    border: true,
    padding: 10,
    initComponent: function() {
        var me = this;
        Ext.each(me.items, function(item) {
            item.style = {
                backgroundColor: "#f4f4f",
                border: "1px solid #333"
            };
            item.padding = 10;
            item.height = 450;
        });
        me.callParent();
    },
    onRender: function() {
        var me = this;
        me.callParent(arguments);
        if (me.border) {
            me.el.setStyle("border", "1px solid #333");
        }
    }
});

Ext.require('Ext.form.field.Display');
Ext.require('Ext.form.field.Trigger');

/*****************************
 ONCE EXT IS READY, CONFIGURE
 EXT'S AJAX SETTINGS, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.
 ******************************/
Ext.onReady(function() {
    Ext.create('FiddleAssociatedModels.store.Flights', {
        storeId: 'Flights',
        autoLoad: true
    });
    Ext.create('FiddleAssociatedModels.Main', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'flights'
        }]
    });

});