


Ext.define('Fiddle.CustomHeader', {
    extend: 'Ext.grid.header.Container',
    xtype: 'customheader'
});

Ext.onReady(function () {

    Ext.QuickTips.init();

    var fiddleHeader = 'Fiddle ~ Custom Header Menu',
        fiddleSubHeader = '<i>Fiddle exploring how to override the default ' +
            'grid header menu with a custom pop-up.  ' +
            'When the user clicks a column header, a custom dialog appears.</i>',
        url = {
            local: 'data.json', // static data file
            remote: 'grid-filter.php'
        },
        encode = false,
        local = true,
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
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: store,
            columns: headerFactory(7),
            loadMask: true,
            plugins: 'gridfilters',
            bbar: Ext.create('Ext.toolbar.Paging', {
                store: store
            })
        }),
        win = Ext.create('Ext.Window', {
            title: 'Fiddle ~ JSON Store Column Filtering ',
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });

    grid.child('[dock=bottom]').add(['->', {
        text: 'Clear Filter Data',
        handler: function () {
            grid.filters.clearFilters();
        }
    }]);
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