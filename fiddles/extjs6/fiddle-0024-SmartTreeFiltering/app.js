var meta = {
    fiddleHeader: 'Smart Tree Node Filtering',
    fiddleSubHeader: 'Fiddle exploring how to change the state of a tree node amid filter based on the state of its child nodes.' +
    '<br />'
};

var flights = null,
    seats = null;


Ext.define('Fiddle.Airplane', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Airplane',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'longName',
        type: 'string'
    }]
});


Ext.define('Fiddle.AirportBase', {
    extend: 'Ext.data.TreeModel',
    entityName: 'AirportBase',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Time',
        type: 'string'
    }]
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
    isFlight: true,
    entityName: 'Flight',
    childType: 'Package',
    fields: [{
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
        convert: function (value, record) {
            return record.get('airplaneId') + ' ' + record.get('destinationId') + '/' + record.get('arrivalId');
        },
        depends: ['airplaneId']
    }, {
        name: 'flightId',
        convert: function (value, record) {
            return record.get('airplaneId')
        },
        depends: ['airplaneId']
    }],
    isVisibleChildChecked: function () {
        if (this.childNodes) {
            return this.childNodes.filter(function (child) {
                    return child.data.checked && child.data.visible;
                }).length > 0;
        }
    },
    deselectHiddenChildren: function () {
        if (this.childNodes) {
            this.childNodes.map(function (child) {
                if (!child.data.visible && child.data.checked) {
                    child.set('checked', false);
                }
            });
        }
    }
});


Ext.define('Fiddle.Package', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Package',
    isPackage: true,
    fields: [{
        name: 'packageId',
        mapping: 'Id',
        reference: 'Passenger',
        type: 'string'
    }, {
        name: 'packageLocal',
        mapping: 'Seat',
        reference: 'Passenger',
        type: 'string'
    }, {
        name: 'section',
        mapping: 'Section',
        type: 'string'
    }, {
        name: 'text',
        convert: function (val, rec) {
            return rec.data.Passenger.Id + ' (' + rec.data.Passenger.Seat + ')';
        },
        depends: ['packageId', 'packageLocal']
    }, {
        name: 'flightId',
        convert: function (val, rec) {
            return parent.flightId;
        }
    }, {
        name: 'checked',
        type: 'auto',
        defaultValue: false
    }]
});


Ext.define('Fiddle.Passenger', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Passenger',
    isPassenger: true,
    fields: [{
        name: 'Id',
        mapping: 'Id',
        type: 'string'
    }, {
        name: 'Seat',
        mapping: 'Seat',
        type: 'string'
    }, {
        name: 'checked',
        mapping: 'confirmed',
        defaultValue: false
    }]
});


Ext.define('Fiddle.Seats', {
    extend: 'Ext.data.Store',
    fields: ['seat'],
    data: [{
        "seat": "All"
    }, {
        "seat": "1A"
    }, {
        "seat": "1B"
    }, {
        "seat": "2A"
    }, {
        "seat": "2B"
    }, {
        "seat": "3A"
    }, {
        "seat": "3B"
    }]
}, function () {
    seats = Ext.create('Fiddle.Seats', {
        storeId: 'seats'
    });
});


Ext.define('Fiddle.SeatFilter', {
    extend: 'Ext.util.Filter',
    config: {
        seat: null,
        filterFn: function (node) {
            var ret = false,
                seat = this.getSeat();
            if (node.isFlight) {
                ret = this.filterFlight(node, seat);
            }
            if (node.isPackage && node.data.Passenger.Seat == seat) {
                ret = true;
            }
            return ret;
        },
        id: 'seatFilter'
    },
    filterFlight(node, seat) {
        var ret = false;
        ret = node.childNodes ? node.childNodes.filter(function (package) {
            return package.data.Passenger.Seat == seat;
        }).length > 0 : false;
        if (ret && node.data.checked && !node.isVisibleChildChecked()) {
            node.deselectHiddenChildren();
        }
        return ret;
    }
});


Ext.define('Fiddle.Flights', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'Fiddle.Flight',
        'Fiddle.SeatFilter'
    ],
    model: 'Fiddle.Flight',
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json'
        }
    },
    addSeatFilter: function (seat) {
        var filter = new Fiddle.SeatFilter({
                seat: seat
            }),
            tree = this.ownerTree;
        this.addFilter(filter);
        if (tree) {
            tree.getChecked().map(function (node) {
                if (node.isFlight && (!node.data.visible || !node.isVisibleChildChecked())) {
                    tree.fireEvent('checkchange', node, false);
                }
            });
        }
    }
}, function () {
    flights = Ext.create('Fiddle.Flights', {
        storeId: 'flights'
    });
});


Ext.define('Fiddle.SeatComboBoxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.seatcombobox',
    onSeatComboBoxChange: function (combo, newValue, oldValue) {
        var tree = this.getView().up('panel'),
            store = tree.getStore();
        if (newValue == "All") {
            store.removeFilter('seatFilter');
        } else {
            store.addSeatFilter(newValue);
        }
    }
});


Ext.define('Fiddle.SeatComboBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.seatcombobox',
    requires: [
        'Fiddle.SeatComboBoxController'
    ],
    controller: 'seatcombobox',
    fieldLabel: 'Seat Filter:',
    value: ['ALL'],
    store: seats,
    queryMode: 'local',
    displayField: 'seat',
    valueField: 'seat',
    listeners: {
        change: 'onSeatComboBoxChange'
    }
});


Ext.define('Fiddle.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flights',
    onCheckChange: function (node, checked) {
        if (node.isPackage) {
            this.packageCheckChange(node, checked);
        } else if (node.isFlight) {
            this.flightCheckChange(node, checked);
        }
    },
    packageCheckChange: function (node, checked) {
        if (checked) {
            node.parentNode.set('checked', true);
        } else {
            if (!node.parentNode.isVisibleChildChecked()) {
                node.parentNode.set('checked', false);
                this.getView().fireEvent('checkchange', node.parentNode, checked);
            }
        }
    },
    flightCheckChange: function (node, checked) {
        node.set('checked', checked);
        if (checked) {
            node.childNodes.map(function (child) {
                if (child.data.visible) {
                    child.data.checked = true;
                }
            });
            node.expand();
        } else {
            node.childNodes.map(function (child) {
                child.data.checked = false;
            });
            node.collapse();
        }
    }
});


Ext.define('Fiddle.View', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Fiddle.Controller',
        'Fiddle.SeatComboBox'
    ],
    controller: 'flights',
    store: flights,
    alias: 'widget.flights',
    rootVisible: false,
    scroll: 'both',
    store: flights,
    listeners: {
        'checkchange': {
            fn: 'onCheckChange',
            priority: 500
        }
    },
    tbar: Ext.create('Ext.toolbar.Toolbar', {
        dock: 'top',
        items: ['->', {
            xtype: 'seatcombobox'
        }]
    }),
    columns: [{
        xtype: 'treecolumn',
        text: 'Tree Column',
        flex: 1.5,
        sortable: true,
        dataIndex: 'text'
    }, {
        text: 'flight #',
        dataIndex: 'flightId',
        flex: 1
    }, {
        text: 'status',
        dataIndex: 'status'
    }, {
        text: 'Entity',
        flex: 1,
        renderer: function (v, cellValues, record) {
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
    items: [{
        xtype: 'panel',
        bind: {
            title: '{header}'
        },
        items: [{
            xtype: 'panel',
            padding: 10,
            border: false,
            bind: {
                html: '{subheader}'
            }
        }],
        region: 'north'
    }]
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
