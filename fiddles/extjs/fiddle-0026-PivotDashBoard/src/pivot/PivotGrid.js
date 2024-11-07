Ext.define('Fiddle.PivotGrid', {
    extend: 'Ext.pivot.Grid',
    requires: [
        'Ext.pivot.Grid',
        'Ext.pivot.plugin.Exporter',
        'Fiddle.Store',
        'Fiddle.PivotGridController'
    ],
    alias: 'widget.fiddlepivot',
    controller: 'pivotgrid',
    title: null,
    collapsible: false,
    multiSelect: true,

    selModel: {
        type: 'spreadsheet'
    },

    listeners: {
        render: 'onRender'
    },
    store: fiddleStore,
    aggregate: [{
        dataIndex: 'a',
        header: 'a',
        flex: 1.5,
        aggregator: 'sum'
    }, {
        dataIndex: 'b',
        header: 'b',
        flex: 1.5,
        aggregator: 'sum'
    }],
    leftAxis: [
        {
            dataIndex: 'MemberFirmId',
            header: 'Member Firm',
            flex: 50,
            expand: true
        }, {
            dataIndex: 'MemberFirmLongName',
            header: 'Long Name',
            width: 50,
            sortable: true
        }, {
            dataIndex: 'TradeFirm',
            header: 'Trade Firm',
            width: 50,
            sortable: true
        }, {
            dataIndex: 'SettlementBank',
            header: 'Settle Bank',
            width: 50,
            sortable: true
        }, {
            dataIndex: 'ClearingAccountNumber',
            header: 'Clearing Acct',
            width: 50,
            sortable: true
        }, {
            dataIndex: 'SecurityAccountNumber',
            header: 'Security Acct',
            width: 50,
            sortable: true
        }, {
            dataIndex: 'CashAccountNumber',
            header: 'Cash Acct',
            width: 50,
            sortable: true
        }],

    plugins: [{
        ptype: 'pivotexporter',
        pluginId: 'exporter'
    }, {
        ptype: 'pivotconfigurator',
        pluginId: 'configurator',
        dock: 'right'
    }, {
        ptype: 'pivotrangeeditor'
    }],

    header: null
    /*{
     itemPosition: 1, // after title before collapse tool
     items: [{
     ui: 'default-toolbar',
     xtype: 'button',
     text: 'Export to Excel',
     handler: 'exportToExcel'
     }]
     }*/

});


