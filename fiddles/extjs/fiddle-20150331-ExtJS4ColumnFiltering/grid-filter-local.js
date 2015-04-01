Ext.onReady(function () {

    Ext.QuickTips.init();

    var url = {
            local: 'grid-filter.json',  // static data file
            remote: 'grid-filter.php'
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
                    idProperty: 'id',
                    totalProperty: 'total'
                }
            },
            remoteSort: false,
            sortInfo: {
                field: 'company',
                direction: 'ASC'
            },
            pageSize: 50,
            storeId: 'myStore',
            fields: [
                { name: 'id' },
                { name: 'company' },
                { name: 'price', type: 'float' },
                { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
                { name: 'visible', type: 'boolean' },
                { name: 'size' }
            ]
        }),
        filters = {
            ftype: 'filters',
            encode: encode,
            local: local,
            filters: [
                {
                    type: 'numeric',
                    dataIndex: 'id'
                },
                {
                    type: 'string',
                    dataIndex: 'company',
                    disabled: true
                },
                {
                    type: 'numeric',
                    dataIndex: 'price'
                },
                {
                    type: 'date',
                    dataIndex: 'date'
                },
                {
                    type: 'list',
                    dataIndex: 'size',
                    options: ['small', 'medium', 'large', 'extra large'],
                    phpMode: true
                },
                {
                    type: 'boolean',
                    dataIndex: 'visible'
                }
            ]
        },
        createHeaders = function (finish, start) {
            var columns = [
                {
                    dataIndex: 'id',
                    text: 'Id',
                    // instead of specifying filter config just specify filterable=true
                    // to use store's field's type property (if type property not
                    // explicitly specified in store config it will be 'auto' which
                    // GridFilters will assume to be 'StringFilter'
                    filterable: true
                    //,filter: {type: 'numeric'}
                },
                {
                    dataIndex: 'company',
                    text: 'Company',
                    id: 'company',
                    flex: 1,
                    filter: {
                        type: 'string'
                        // specify disabled to disable the filter menu
                        //, disabled: true
                    }
                },
                {
                    dataIndex: 'price',
                    text: 'Price',
                    filter: {
                        //type: 'numeric'  // specify type here or in store fields config
                    }
                },
                {
                    dataIndex: 'size',
                    text: 'Size',
                    filter: {
                        type: 'list',
                        options: ['small', 'medium', 'large', 'extra large']
                        //,phpMode: true
                    }
                },
                {
                    dataIndex: 'date',
                    text: 'Date',
                    renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                    filter: {
                        //type: 'date'     // specify type here or in store fields config
                    }
                },
                {
                    dataIndex: 'visible',
                    text: 'Visible',
                    filter: {
                        //type: 'boolean'  // specify type here or in store fields config
                    }
                }
            ];
            return columns.slice(start || 0, finish);
        },
        grid = Ext.create('Ext.grid.Panel', {
        border: false,
        store: store,
        columns: createHeaders(4),
        loadMask: true,
        plugins: 'gridfilters',
        bbar: Ext.create('Ext.toolbar.Paging', {
            store: store
        })
    });

    grid.child('[dock=bottom]').add([
        '->',
        {
            text: 'Encode: ' + (encode ? 'On' : 'Off'),
            tooltip: 'Toggle Filter encoding on/off',
            enableToggle: true,
            handler: function (button, state) {
                var encode = (grid.filters.encode !== true);
                var text = 'Encode: ' + (encode ? 'On' : 'Off');
                grid.filters.encode = encode;
                grid.filters.reload();
                button.setText(text);
            }
        },
        {
            text: 'Local Filtering: ' + (local ? 'On' : 'Off'),
            tooltip: 'Toggle Filtering between remote/local',
            enableToggle: true,
            handler: function (button, state) {
                var local = (grid.filters.local !== true),
                    text = 'Local Filtering: ' + (local ? 'On' : 'Off'),
                    newUrl = local ? url.local : url.remote,
                    store = grid.view.getStore();

                // update the GridFilter setting
                grid.filters.local = local;
                // bind the store again so GridFilters is listening to appropriate store event
                grid.filters.bindStore(store);
                // update the url for the proxy
                store.proxy.url = newUrl;

                button.setText(text);
                store.load();
            }
        },
        {
            text: 'All Filter Data',
            tooltip: 'Get Filter Data for Grid',
            handler: function () {
                var data = Ext.encode(grid.filters.getFilterData());
                Ext.Msg.alert('All Filter Data', data);
            }
        }, {
            text: 'Clear Filter Data',
            handler: function () {
                grid.filters.clearFilters();
            }
        }, {
            text: 'Add Columns',
            handler: function () {
                if (grid.headerCt.items.length < 6) {
                    grid.headerCt.add(createHeaders(6, 4));
                    grid.view.refresh();
                    this.disable();
                }
            }
        }
    ]);

    var win = Ext.create('Ext.Window', {
        title: 'Grid Filters Example',
        height: 400,
        width: 700,
        layout: 'fit',
        items: grid
    }).show();

    store.load();
});