var meta = {
        fiddleHeader: 'Minimal JSON / Array Store',
        fiddleSubHeader: 'Fiddle exploring how to bind an array store to a comboBox given JSON without any keys. In other words, ' +
            'how do you populate a store when the source json looks like this:' +
            '<pre> ' +
            '{ "items": [ "A", "B", "C", "D", "E" ... ] }' +
            '</pre>' +
            '<br />'
    },
    fiddleStore = null;





Ext.define('Fiddle.model.Item', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'text'
    ]
})


Ext.define('Fiddle.Records', {
    extend: 'Ext.data.ArrayStore',
    requires: ['Fiddle.model.Item'],
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        autoLoad: true,
        remoteSort: false
    },
    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();
        if (me.destroyed) {
            return;
        }
        if (resultSet) {
            me.totalCount = resultSet.getTotal();
        }
        if (successful) {
            records = me.inflateRecords(records);
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
        } else {
            me.loading = false;
        }
        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
        me.callObservers('AfterLoad', [records, successful, operation]);
    },
    inflateRecords: function(records) {
        var inflatedRecords = [],
            i = 0;
        records.map(function(record) {
            inflatedRecords.push(new Fiddle.model.Item({
                id: i,
                text: record.data
            }));
            i++;
        });
        return inflatedRecords;
    }
}, function() {
    fiddleStore = new Fiddle.Records({
        storeId: 'records',
        autoLoad: true
    });
});


Ext.define('Fiddle.view.selector.ItemSelector', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.itemselector',
    isItemSelector: true,
    config: {
        displayField: 'text',
        valueField: 'id',
        editable: false,
        width: 200,
        listeners: {
            afterrender: 'onAfterRender'
        }
    },
    constructor: function(config) {
        config.store = fiddleStore;
        this.callParent([config]);
    }
})


Ext.define('Fiddle.view.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddlecontroller',
    isItemSelectorController: true,
    onAfterRender: function() {
        var view = this.getView().down('itemselector'),
            store = view.getStore();
        window.setTimeout(function() {
            view.setValue(store.data.first());
        }, 1000);
    }
});


Ext.define('Fiddle.view.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.view.selector.ItemSelector',
        'Fiddle.view.Controller'
    ],
    controller: 'fiddlecontroller',
    items: [{
        xtype: 'itemselector'
    }]
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
Ext.onReady(function() {
    var fiddle = Ext.create('Fiddle.view.View'),
        win = Ext.create('Ext.Window', {
            title: 'Bound ComboBox',
            closable: false,
            maximizable: false,
            height: 100,
            width: window.innerWidth - 50,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 210;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
