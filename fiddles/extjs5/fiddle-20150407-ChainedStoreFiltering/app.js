Ext.define('Fiddle.Records', {
    extend: 'Ext.data.Store',
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
        field: 'name',
        direction: 'ASC'
    },
    pageSize: 50,
    fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude'],
    autoLoad: true
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
    // Create chained store
    Ext.create('Ext.data.ChainedStore', {
        source: 'records',
        storeId: 'viewrecords'
    });
});
Ext.define('Fiddle.CustomComboBoxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customcombobox',
    onCriteriaTextFieldChange: function (trigger) {
        var me = this,
            searchCombo = me.getView(),
            window = searchCombo.up('window'),
            grid = window.down('grid'),
            store = grid.getStore(),
            triggerValue = trigger.getValue(),
            value = new RegExp(triggerValue, 'i');
        store.clearFilter();
        if (!Ext.isEmpty(triggerValue)) {
            try {
                store.filter({
                    filterFn: function (record) {
                        return value.test(record.get('name'));
                    },
                    id: 'nameFilter'
                });
            } catch (e) {
                searchCombo.markInvalid('Invalid Search Criteria');
            }
        }
    }
});
Ext.define('Fiddle.CustomComboBox', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.CustomComboBoxController'
    ],
    xtype: 'search-combo',
    controller: 'customcombobox',
    title: null,
    width: 600,
    bodyPadding: 10,
    layout: 'fit',
    items: [{
        xtype: 'combo',
        store: 'records',
        displayField: 'name',
        typeAhead: true,
        fieldLabel: 'Name Filter',
        anchor: '100%',
        listeners: {
            change: {
                fn: 'onCriteriaTextFieldChange',
                buffer: 250
            }
        },
        listConfig: {
            loadingText: 'Searching...',
            emptyText: 'No matching names found.',
            itemSelector: '.search-item',
            itemTpl: [
                '<h4>{name}</h4>'
            ]
        }
    }, {
        xtype: 'component',
        style: 'margin-top: 10px',
        html: 'Type ahead suggestions (aka live search) requires a minimum of 4 input characters.'
    }]
});

Ext.onReady(function () {

    var fiddleHeader = 'Fiddle ~ Chained Store Filtering',
        fiddleSubHeader = '<i>Fiddle exploring how to filter a grid bound to a chained store using a combo box bound to the source store. Since' +
            'the search combo box is bound to the source store, ' +
            'the suggestion list remains unchanged after the grid is filtered.</i>',
        fiddle = Ext.create('Fiddle.CustomComboBox'),
        filters = {
            ftype: 'filters',
            encode: false,
            local: true,
            filters: [
                {
                    type: 'numeric',
                    dataIndex: 'index'
                },
                {
                    type: 'string',
                    dataIndex: 'name'
                },
                {
                    type: 'numeric',
                    dataIndex: 'age'
                },
                {
                    type: 'numeric',
                    dataIndex: 'checkingBalance'
                },
                {
                    type: 'numeric',
                    dataIndex: 'savingsBalance'
                },
                {
                    type: 'date',
                    dataIndex: 'registered'
                },
                {
                    type: 'string',
                    dataIndex: 'address'
                }
            ]
        },
        topToolFactory = function () {
            return Ext.create('Fiddle.CustomComboBox')
        },
        pluginFactory = function () {
            return ['gridfilters', 'bufferedrenderer']
        },
        columnFactory = function (finish, start) {
            var columns = [
                {
                    dataIndex: 'index',
                    text: 'id',
                    filter: {
                        type: 'numeric'
                    },
                    menuDisabled: true
                },
                {
                    dataIndex: 'name',
                    text: 'Name',
                    id: '_id',
                    filter: {
                        type: 'numeric'
                    },
                    menuDisabled: true,
                    flex: 1
                },
                {
                    dataIndex: 'age',
                    text: 'Age',
                    filter: {
                        type: 'numeric'
                    },
                    menuDisabled: true
                },
                {
                    dataIndex: 'checkingBalance',
                    text: 'Checking',
                    filter: {},
                    menuDisabled: true
                },
                {
                    dataIndex: 'savingsBalance',
                    text: 'Savings',
                    menuDisabled: true,
                    filter: {}
                },
                {
                    dataIndex: 'registered',
                    text: 'MemberSince',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    filter: {
                        type: 'date'
                    },
                    menuDisabled: true
                },
                {
                    dataIndex: 'address',
                    text: 'Address',
                    filter: {
                        type: 'string'
                    },
                    flex: 1,
                    menuDisabled: true
                }
            ];
            return columns.slice(start || 0, finish);
        },
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: 'viewrecords',
            itemId: 'fiddle-grid',
            requires: [
                'Fiddle.CustomHeader'
            ],
            columns: columnFactory(7),
            loadMask: true,
            plugins: pluginFactory(),
            tbar: topToolFactory()
        }),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });

    win.show();

    // Boiler Plate
    Ext.QuickTips.init();
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: fiddleHeader,
            subheader: fiddleSubHeader
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
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});

