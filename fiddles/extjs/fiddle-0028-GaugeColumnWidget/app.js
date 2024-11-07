var meta = {
    fiddleHeader: 'Gauge View',
    fiddleSubHeader: 'Fiddle exploring how (or if) a to add a gauge chart to every row of a grid using a widget column' +
        '<br />',
    url: 'data.json'
};

var fiddleStore = null;




Ext.define('Fiddle.model.Transaction', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'a',
        type: 'float'
    }, {
        name: 'b',
        type: 'float'
    }, {
        name: 'c',
        type: 'date',
        dateFormat: 'U'
    }, {
        name: 'd',
        convert: function(value, record) {
            var date = record.get('c');
            return Ext.Date.format(date, 'm/d/Y');
        },
        depends: ['c']
    }, {
        name: 'e',
        convert: function(value, record) {
            return Ext.Number.randomInt(0, 99);
        }
    }]
});


Ext.define('Fiddle.store.Transactions', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Transaction'
    ],
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: meta.url,
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },
    autoLoad: true,
    model: 'Fiddle.model.Transaction',
    remoteSort: false,
    pageSize: 50,
    storeId: 'transactions'
}, function() {
    fiddleStore = new Fiddle.store.Transactions();
});


Ext.define('Fiddle.widget.Gauge', {
    extend: 'Ext.grid.column.Widget',
    xtype: 'gaugecolumnwidget',
    widget: {
        xtype: 'polar',
        border: false,
        height: 200,
        width: '100%',
        insetPadding: '15',
        axes: {
            label: {
                fontSize: 8
            },
            type: 'numeric',
            position: 'gauge',
            minimum: 0,
            maximum: 100,
            majorTickSteps: 4
        },
        series: {
            type: 'gauge',
            colors: ['#2B952B', '#444'],
            donut: 60
        }
    },
    initComponent: function() {
        console.log('init');
        this.callParent();
    }
});


Ext.define('Fiddle.view.Gauges', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Fiddle.widget.Gauge'
    ],
    alias: 'widget.gaugesview',
    store: fiddleStore,
    height: 350,
    width: 1050,
    title: null,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        markDirty: false
    },
    trackMouseOver: false,
    disableSelection: true,
    columns: [{
        dataIndex: 'id',
        text: 'id',
        flex: 1
    }, {
        dataIndex: 'd',
        text: 'd',
        flex: 1
    }, {
        dataIndex: 'a',
        text: 'a',
        flex: 1
    }, {
        dataIndex: 'b',
        text: 'b',
        flex: 1
    }, {
        xtype: 'gaugecolumnwidget',
        dataIndex: 'e',
        width: 250,
        text: 'e'
    }]
});


Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.view.Gauges'
    ],
    layout: 'fit',
    items: [{
        xtype: 'gaugesview'
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
    window.setTimeout(function() {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
