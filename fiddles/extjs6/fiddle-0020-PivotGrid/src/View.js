

Ext.define('Fiddle.View', {
    extend: 'Ext.pivot.Grid',
    xtype: 'fiddle',
    controller: 'fiddle',

    requires: [
        'Ext.pivot.Grid',
        'Ext.pivot.plugin.Exporter',
        'Fiddle.Store'
    ],

    title: null,
    collapsible: false,
    multiSelect: true,
    height: 350,

    selModel: {
        type: 'spreadsheet'
    },

    listeners: {
        render: 'onRender'
    },

    store: fiddleStore,

    aggregate: [{
        dataIndex:  'checkingBalance',
        header:     'checking',
        width: 150,
        aggregator: 'sum'
    }, {
        dataIndex:  'savingsBalance',
        header:     'Savings',
        width: 150,
        aggregator: 'sum'
    }],


    leftAxis: [{
        dataIndex:  'demo',
        header:     'Demo',
        width: 150
    }, {
        dataIndex:  'status',
        header: 'status',
        expanded: true,
        width: 150,
        sortable: false
    }, {
        dataIndex:  'name',
        header:     'customer',
        expanded: true,
        width: 150,
        sortable:   false
    }],

    plugins: [{
        ptype: 'pivotexporter',
        pluginId: 'exporter'
    }, {
        ptype:      'pivotconfigurator',
        pluginId:   'configurator',
        dock: 'right'
    }],

    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Export to Excel',
            handler: 'exportToExcel'
        }]
    }

});


