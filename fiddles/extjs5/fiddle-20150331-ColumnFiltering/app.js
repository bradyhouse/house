Ext.onReady(function() {

    Ext.QuickTips.init();

    var fiddleHeader = 'Fiddle ~ JSON Store Column Filtering',
        fiddleSubHeader = '<i>Grid panel configured with the "gridfilters" plugin and  bound to a Json Store populated with 781 records. NOTE - The data is ' + '<a href="http://www.json-generator.com/" title="json generator" target="_blank">generated json</a>.</i>',
        url = {
            local: 'data.json'
        },
        encode = false,
        local = true,
        store = Ext.create('Ext.data.JsonStore', {
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
            filters: [{
                type: 'numeric',
                dataIndex: 'index'
            }, {
                type: 'string',
                dataIndex: 'name'
            }, {
                type: 'numeric',
                dataIndex: 'age'
            }, {
                type: 'numeric',
                dataIndex: 'checkingBalance'
            }, {
                type: 'numeric',
                dataIndex: 'savingsBalance'
            }, {
                type: 'date',
                dataIndex: 'registered'
            }, {
                type: 'string',
                dataIndex: 'address'
            }]
        },
        createHeaders = function(finish, start) {
            var columns = [{
                dataIndex: 'index',
                text: 'id',
                filter: {
                    type: 'numeric'
                }
            }, {
                dataIndex: 'name',
                text: 'Name',
                id: '_id',
                filter: {
                    type: 'string'
                    // specify disabled to disable the filter menu
                    //, disabled: true
                },
                flex: 1
            }, {
                dataIndex: 'age',
                text: 'Age',
                filter: {
                    //type: 'numeric'  // specify type here or in store fields config
                }
            }, {
                dataIndex: 'checkingBalance',
                text: 'Checking',
                filter: {}
            }, {
                dataIndex: 'savingsBalance',
                text: 'Savings',
                filter: {}
            }, {
                dataIndex: 'registered',
                text: 'MemberSince',
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                filter: {
                    //type: 'date'     // specify type here or in store fields config
                }
            }, {
                dataIndex: 'address',
                text: 'Address',
                filter: {
                    //type: 'boolean'  // specify type here or in store fields config
                },
                flex: 1
            }];
            return columns.slice(start || 0, finish);
        },
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: store,
            columns: createHeaders(7),
            loadMask: true,
            plugins: 'gridfilters',
            bbar: Ext.create('Ext.toolbar.Paging', {
                store: store
            })
        }),
        win = Ext.create('Ext.Window', {
            title: 'Fiddle ~ JSON Store Column Filtering ',
            modal: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });

    grid.child('[dock=bottom]').add(['->', {
        text: 'All Filter Data',
        tooltip: 'Get Filter Data for Grid',
        handler: function() {
            var data = Ext.encode(grid.filters.getFilterData());
            Ext.Msg.alert('All Filter Data', data);
        }
    }, {
        text: 'Clear Filter Data',
        handler: function() {
            grid.filters.clearFilters();
        }
    }, {
        text: 'Add Columns',
        handler: function() {
            if (grid.headerCt.items.length < 6) {
                grid.headerCt.add(createHeaders(6, 4));
                grid.view.refresh();
                this.disable();
            }
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
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});