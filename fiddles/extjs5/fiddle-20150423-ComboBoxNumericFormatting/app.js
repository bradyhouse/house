var meta = {
    fiddleHeader: 'ComboBox Numeric Formatting',
    fiddleSubHeader: 'Fiddle exploring how to format the values displayed in a tagfield drop-down using a XTemplate with a custom format function.' +
    '<br />'
};

Ext.define('Fiddle.Records', {
    extend: 'Ext.data.Store',
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: '_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sortInfo: {
            field: 'checkingBalance',
            direction: 'ASC'
        },
        pageSize: 50,
        fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude'],
        autoLoad: true
    }
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
});
Ext.define('Fiddle.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'fiddle-panel',
    title: null,
    layout: {
        type: 'vbox'
    },
    bodyPadding: '5px',
    items: [{
        xtype: 'tagfield',
        value: [999999.45911],
        autoSelect: true,
        border: null,
        displayField: 'checkingBalance',
        valueField: 'checkingBalance',
        fieldLabel: 'Unformatted',
        minChars: 1,
        store: 'records',
        grow: true,
        collapseOnSelect: true,
        flex: 2,
        typeAheadDelay: 100,
        hideTriggers: true
    }, {
        xtype: 'tagfield',
        border: null,
        displayField: 'checkingBalance',
        valueField: 'checkingBalance',
        minChars: 1,
        grow: true,
        value: [999999.45911],
        collapseOnSelect: true,
        flex: 2,
        autoSelect: true,
        typeAheadDelay: 100,
        hideTriggers: true,
        anyMatch: true,
        fieldLabel: 'Formatted',
        store: 'records',
        labelTpl: Ext.create('Ext.XTemplate', '{[this.formatNumeric(values.checkingBalance)]}', {
            formatNumeric: function (value) {
                return Ext.typeOf(value) == 'number' ? Ext.util.Format.number(value, '$0,000.00') : value;
            }
        }),
        listConfig: {
            loadingText: 'Searching...',
            emptyText: 'No matching names found.',
            itemTpl: Ext.create('Ext.XTemplate', '{[this.formatNumeric(values.checkingBalance)]}', {
                formatNumeric: function (value) {
                    return Ext.typeOf(value) == 'number' ? Ext.util.Format.number(value, '$0,000.00') : value;
                }
            })
        }
    }]
});
Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.Panel'
    ],
    items: {
        xtype: 'fiddle-panel'
    }
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
                title: '<h2>{header}<h2>'
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
    var view = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            scrollable: true,
            height: 200,
            width: 500,
            layout: 'vbox',
            items: view
        });
    win.showAt(25, 150);
    Ext.QuickTips.init();
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
