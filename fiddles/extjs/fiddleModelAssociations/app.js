
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
 DEFINE PASSENGER MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Passenger', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Passenger',
    fields: [
        { name: 'Id', mapping: 'Id', type: 'string'},
        { name: 'Seat', mapping: 'Seat', type: 'string'}
    ]
});



/***************************
 DEFINE PACKAGE MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Package', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Package',
    fields: [
        { name: 'packageId', mapping: 'Id', reference: 'Passenger', type: 'string'},
        { name: 'packageLocal', mapping: 'Seat', reference: 'Passenger', type: 'string'},
        { name: 'section', mapping: 'Section', type: 'string'},
        { name: 'text',
            convert: function(val,rec) {
                return rec.data.Passenger.Id + ' (' + rec.data.Passenger.Seat + ')';
            },
            depends: ['packageId', 'packageLocal']
        },
        { name: 'flightId',
          convert: function(val, rec) {
             return parent.flightId;
         }}
    ]
});

/***************************
 DEFINE FLIGHT MODEL
 ****************************/
Ext.define('FiddleAssociatedModels.model.Flight', {
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
    rootVisible: false,
    scroll: 'both',
    columns: [{
        xtype: 'treecolumn',
        text: 'Tree Column',
        flex: 1.5,
        sortable: true,
        dataIndex: 'text'
    },{
        text: 'flight #',
        dataIndex: 'flightId',
        flex: 1
    }, {
        text: 'status',
        dataIndex: 'status'
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
    padding: 2,
    initComponent: function() {
        var me = this;
        Ext.each(me.items, function(item) {
            item.style = {
                backgroundColor: "#f4f4f",
                border: "1px solid #333"
            };
            item.padding = 2;
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

/*****************************
 ONCE EXT IS READY, CONFIGURE
 EXT'S AJAX SETTINGS, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.
 ******************************/
Ext.onReady(function() {
    Ext.create('FiddleAssociatedModels.store.Flights', {
        storeId: 'Flights'
    });
    Ext.create('FiddleAssociatedModels.Main', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'flights'
        }]
    });

});