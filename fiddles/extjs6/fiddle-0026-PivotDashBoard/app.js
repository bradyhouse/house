var meta = {
    fiddleHeader: 'The "Premium" Pivot Grid',
    fiddleSubHeader: 'Fiddle exploring the celebrated (but mysterious) Pivot Grid Control.' +
        '<br />',
    recordsUrl: 'data.json'
};

var fiddleStore = null;




Ext.define('Fiddle.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'MemberFirmId',
        type: 'string'
    }, {
        name: 'MemberFirmLongName',
        type: 'string'
    }, {
        name: 'TradeFirm',
        type: 'string'
    }, {
        name: 'SettlementBank',
        type: 'string'
    }, {
        name: 'ClearingAccountNumber',
        type: 'string'
    }, {
        name: 'SecurityAccountNumber',
        type: 'string'
    }, {
        name: 'CashAmount',
        type: 'float'
    }, {
        name: 'SecurityFaceValue',
        type: 'float'
    }, {
        name: 'ClientSide',
        type: 'string'
    }, {
        name: 'TradeDate',
        type: 'date',
        dateFormat: 'U'
    }, {
        name: 'Buy',
        convert: function(value, record) {
            side = record.get('ClientSide'),
                cashAmount = record.get('CashAmount');
            if (side === 'B') {
                return cashAmount;
            }
            return 0.0;
        },
        depends: ['CashAmount', 'ClientSide']
    }, {
        name: 'Sell',
        convert: function(value, record) {
            side = record.get('ClientSide');
            cashAmount = record.get('CashAmount');
            if (side == 'S') {
                return -1.0 * cashAmount;
            }
            return 0.0;
        }
    }, {
        name: 'BusDate',
        convert: function(value, record) {
            var date = record.get('TradeDate');
            return Ext.Date.format(date, 'm/d/Y');
        },
        depends: ['TradeDate']
    }, {
        name: 'Scale',
        convert: function(value, record) {
            return record.isValidRecord() ? record.getScale(record) : 0;
        },
        depends: ['CashAmount', 'SecurityFaceValue']
    }],
    isValidRecord: function(record) {
        var cash = this.get('CashAmount'),
            secValue = this.get('SecurityFaceValue');
        return Ext.isNumber(cash) && Ext.isNumber(secValue);
    },
    getScale: function(record) {
        var cash = record.get('CashAmount'),
            secValue = record.get('SecurityFaceValue'),
            side = record.get('CientSide')
        scale = (cash === 0) ? 0 : secValue / cash;
        if (side == 'S') {
            scale = -1 * scale;
        }
        return scale;
    }
});


Ext.define('Fiddle.Store', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: meta.recordsUrl,
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },
    autoLoad: true,
    model: 'Fiddle.Model',
    remoteSort: false,
    sortInfo: {
        field: 'MemberFirmId',
        direction: 'ASC'
    },
    pageSize: 50,
    storeId: 'myStore'
}, function() {
    fiddleStore = new Fiddle.Store();
});


Ext.define('Fiddle.PivotGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pivotgrid',
    exportToExcel: function() {
        this.getView().saveDocumentAs({
            title: 'Repo Export',
            fileName: 'excelExport.xml'
        });
    },
    changeDock: function(button, checked) {
        if (checked) {
            this.getView().getPlugin('configurator').setDock(button.text.toLowerCase());
        }
    },
    onRender: function() {
        window.setTimeout(function() {
            var pivot = Ext.ComponentQuery.query('pivotgrid')[0];
            pivot.down('panel').collapse();
        }, 2000);
    }
});


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
        dataIndex: 'CashAmount',
        header: 'Cash Amount',
        flex: 1.5,
        aggregator: 'sum'
    }, {
        dataIndex: 'SecurityFaceValue',
        header: 'Security Face Value',
        flex: 1.5,
        aggregator: 'sum'
    }, {
        dataIndex: 'Buy',
        header: 'Buys',
        flex: 1.5,
        aggregator: 'sum'
    }, {
        dataIndex: 'Sell',
        header: 'Sells',
        flex: 1.5,
        aggregator: 'sum'
    }],
    leftAxis: [{
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


Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.PivotGrid'
    ],
    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },
    items: [{
        xtype: 'fiddlepivot',
        flex: 1
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
