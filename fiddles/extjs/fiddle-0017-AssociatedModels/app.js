var meta = {
    fiddleHeader: 'Model Associations',
    fiddleSubHeader: 'Fiddle exploring how to establish associations between tree models' +
    '<br />'
};

var fiddleStore = null;




Ext.define('Fiddle.Airplane', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Airplane',
    fields: [
        { name: 'Id', type: 'string'},
        { name: 'longName', type: 'string'}
    ]
});


Ext.define('Fiddle.AirportBase', {
    extend: 'Ext.data.TreeModel',
    entityName: 'AirportBase',
    fields: [
        { name: 'Id', type: 'string'},
        { name:'Time', type: 'string'}
    ]
});


Ext.define('Fiddle.Arrival', {
    extend: 'Fiddle.AirportBase',
    entityName: 'Arrival'
});


Ext.define('Fiddle.Destination', {
    extend: 'Fiddle.AirportBase',
    entityName: 'Destination'
});


Ext.define('Fiddle.Flight', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Flight',
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


Ext.define('Fiddle.Package', {
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


Ext.define('Fiddle.Passenger', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Passenger',
    fields: [
        { name: 'Id', mapping: 'Id', type: 'string'},
        { name: 'Seat', mapping: 'Seat', type: 'string'}
    ]
});


Ext.define('Fiddle.Store', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'Fiddle.Flight'
    ],
    model: 'Fiddle.Flight',
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json'
        }
    }
}, function () {
    fiddleStore = Ext.create('Fiddle.Store', {
        storeId: 'fiddle'
    });
});


Ext.define('Fiddle.View', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*'],
    store: 'Flights',
    alias: 'widget.flights',
    rootVisible: false,
    scroll: 'both',
    store: fiddleStore,
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

// Boiler plate
Ext.define('App.BoxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.box',
    data: {
        header: meta.fiddleHeader,
        subheader: meta.fiddleSubHeader
    }
});
Ext.define('App.Box', {
    extend: "Ext.container.Container",
    border: true,
    padding: 25,
    viewModel: {
        type: 'box'
    },
    items: [
        {
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [
                {
                    xtype: 'panel',
                    padding: 10,
                    border: false,
                    bind: {
                        html: '{subheader}'
                    }
                }
            ],
            region: 'north'
        }
    ]
});
Ext.onReady(function () {
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            maximizable: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 192;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    window.setTimeout(function () {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
