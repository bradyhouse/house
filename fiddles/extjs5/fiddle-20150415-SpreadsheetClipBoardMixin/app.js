Ext.define('Fiddle.Mixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'fiddlemixin',
        before: {
            initComponent: 'onBeforeInitComponent'
        }
    },
    onBeforeInitComponent: function () {
        var me = this;
        if (!me.clipboardPluginExists(me.plugins)) {
            me.plugins.push({
                ptype: 'clipboard'
            });
        }
        if (!me.selModel || !me.selModel.type !== 'spreadsheet') {
            me.selModel = {
                type: 'spreadsheet',
                columnSelect: true,
                rowSelect: true
            };
        }
    },
    // @ private
    clipboardPluginExists: function (plugins) {
        return Ext.Array.findBy(plugins, function (plugin) {
            return (plugin === "clipboard" || plugin.ptype === "clipboard" )
        });
    }
});
Ext.define('Fiddle.Store', {
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
    autoLoad: true,
    fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude']
}, function () {
    Ext.create('Fiddle.Store', {
        storeId: 'fiddle'
    });
});
Ext.define('Fiddle.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Fiddle.Mixin'
    ],
    mixins: {
        fiddlemixin: 'Fiddle.Mixin'
    },
    border: false,
    store: 'fiddle',
    columns: [
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
    ],
    loadMask: true,
    plugins: [{
        ptype: 'gridfilters'
    }, {
        ptype: 'bufferedrenderer'
    }],
    bbar: Ext.create('Ext.toolbar.Paging', {
        store: 'fiddle'
    }),
    initComponent: function () {
        var me = this;
        this.callParent(arguments);
        // <debug>
        this.unitTests.run(me);
        // </debug>
    },
    // <debug>
    unitTests: {
        pluginsContains: function (grid, type) {
            var plugin = grid.findPlugin(type);
            if (plugin) {
                return true;
            }
            return false;
        },
        selModelIsSpreadsheet: function (selModel) {
            return selModel.type === 'spreadsheet' ? true : false;
        },
        run: function (grid) {
            var me = this;
            // Unit Tests
            try {
                Ext.Assert.truthy(me.pluginsContains(grid, 'bufferedrenderer'), 'plugins contains bufferedrender');
                Ext.Assert.truthy(me.pluginsContains(grid, 'gridfilters'), 'plugins contains gridfilters');
                Ext.Assert.truthy(me.pluginsContains(grid, 'clipboard'), 'plugins contains clipboard');
                Ext.Assert.truthy(me.selModelIsSpreadsheet(grid.selModel), 'selModel is spreadsheet');
                console.log('All tests passed');
            } catch (e) {
                Ext.Msg.alert('Unit Test Failed', e);
            }
        }
    }
    // </debug>
});
Ext.onReady(function () {
    Ext.QuickTips.init();
    var fiddleHeader = 'Fiddle ~ Spreadsheet Selection & Clipboard mixin',
        fiddleSubHeader = '<p>Fiddle exploring how to define a mixin that configures the selModel and plugin properties of grid prior to the initComponent function firing.</p>' +
            '<p>This fiddle also leverages the <b><a href="http://docs-origin.sencha.com/extjs/5.1/5.1.0-apidocs/#!/api/Ext.Assert-method-truthy" target="_blank">Ext.Assert.truthy</a></b> function to invoke a set of unit tests after the grid is initialized</p>',
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
        toolFactory = function () {
            return ['->', {
                text: 'Reset',
                handler: function () {
                    grid.filters.clearFilters();
                }
            }]
        },
        grid = Ext.create('Fiddle.Grid'),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });
    grid.child('[dock=bottom]').add(toolFactory());
    win.showAt(25, 150);
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
