Ext.onReady(function () {

    Ext.QuickTips.init();

    var fiddleHeader = 'Fiddle ~ Clear Columns and Store',
        fiddleSubHeader = '<i>Fiddle exploring how to dynamically un-configure (or "clear") a grid panel and the store its bound too.</i>',
        url = {
            local: 'data.json'
        },
        encode = false,
        local = true,
        store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: (local ? url.local : url.remote),
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
            storeId: 'myStore',
            fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude']
        }),
        filters = {
            ftype: 'filters',
            encode: encode,
            local: local,
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
        toolFactory = function () {
            return ['->', {
                text: 'clear store',
                handler: function () {
                    var grid = this.up('grid'),
                        store = grid.getStore();
                    store.loadRecords([], {addRecords: false});
                }
            }, {
                text: 'clear columns',
                handler: function () {
                    var grid = this.up('grid');
                    grid.reconfigure(grid.getStore(), []);
                }
            }, {
                text: 'load columns',
                handler: function () {
                    var grid = this.up('grid'),
                        columns = headerFactory(7);
                    grid.reconfigure(grid.getStore(), columns);
                }
            }, {
                text: 'load store',
                handler: function () {
                    var store = Ext.getStore('myStore');
                    store.load();
                }
            }]
        },
        pluginFactory = function () {
            return ['gridfilters', 'bufferedrenderer']
        },
        headerFactory = function (finish, start) {
            var columns = [
                {
                    dataIndex: 'index',
                    text: 'id',
                    filter: {
                        type: 'numeric'
                    }
                },
                {
                    dataIndex: 'name',
                    text: 'Name',
                    id: '_id',
                    filter: {
                        type: 'numeric'
                    },
                    flex: 1
                },
                {
                    dataIndex: 'age',
                    text: 'Age',
                    filter: {
                        type: 'numeric'
                    }
                },
                {
                    dataIndex: 'checkingBalance',
                    text: 'Checking',
                    filter: {}
                },
                {
                    dataIndex: 'savingsBalance',
                    text: 'Savings',
                    filter: {}
                },
                {
                    dataIndex: 'registered',
                    text: 'MemberSince',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    filter: {
                        type: 'date'
                    }
                },
                {
                    dataIndex: 'address',
                    text: 'Address',
                    filter: {
                        type: 'string'
                    },
                    flex: 1
                }
            ];
            return columns.slice(start || 0, finish);
        },
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: store,
            columns: headerFactory(7),
            loadMask: true,
            plugins: pluginFactory(),
            bbar: Ext.create('Ext.toolbar.Toolbar')
        }),
        win = Ext.create('Ext.Window', {
            title: 'Fiddle ~ Buffered Rendered Column Filtering',
            modal: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });

    //grid.child('[dock=bottom]').add(toolFactory());
    store.load();
    win.show();

    // Boiler Plate
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
