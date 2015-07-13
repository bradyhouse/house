Ext.define('Fiddle.Record', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Record',
    idProperty: '_id',
    fields: [
        {
            name: "name"
        },
        {
            name: "checked",
            defaultValue: false
        }
    ]
});
Ext.define('Fiddle.Records', {
    extend: 'Ext.data.TreeStore',
    model: 'Fiddle.Record',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'data.json',
        rootProperty: 'data',
        idProperty: '_id',
        totalProperty: 'total'
    },
    autoload: true,
    sorters: [
        {
            property: 'name',
            direction: 'DESC'
        }
    ]
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
});
Ext.define('Fiddle.RecordTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Fiddle.Records'
    ],
    alias: 'widget.recordtree',
    store: 'records',
    width: 250,
    border: 1,
    height: 200,
    bodyStyle: {
        padding: '5px'
    },
    rootVisible: false,
    collapseFirst: false,
    useArrows: true,
    columns: [
        {
            text: 'Title',
            flex: 1,
            dataIndex: 'name'
        }
    ],
    tbar: [
        {
            labelWidth: null,
            xtype: 'triggerfield',
            fieldLabel: 'Filter',
            triggers: {
                search: {
                    cls: 'x-form-clear-trigger',
                    handler: 'onSearchFieldTriggerClick'
                }
            },
            listeners: {
                change: {
                    fn: 'onSearchCriteriaChange',
                    buffer: 250
                }
            }
        },
        {
            xtype: 'displayfield',
            itemId: 'matches',
            text: '0',
            // Use shrinkwrap width for the label
            labelWidth: null,
            listeners: {
                beforerender: function () {
                    var me = this,
                        tree = me.up('treepanel'),
                        root = tree.getRootNode(),
                        leafCount = 0;

                    tree.store.on('fillcomplete', function (store, node) {
                        if (node === root) {
                            root.visitPostOrder('', function (node) {
                                if (node.isLeaf()) {
                                    leafCount++;
                                }
                            });
                            me.setValue(leafCount);
                        }
                    });
                },
                single: true
            }
        }
    ]
});
Ext.define('Fiddle.CustomMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.custommenu',
    onAscendingClick: function (ctrl) {
        this.sortTree('ASC');
    },
    onDescendingClick: function (ctrl) {
        this.sortTree('DESC');
    },
    onClearFilterClick: function (ctrl) {
        var me = this,
            menu = me.getView(),
            tree = menu.down('recordtree'),
            treeStore = tree.getStore(),
            treeSearchTrigger = tree.down('triggerfield'),
            treeSearchMatches = tree.down('displayfield');
        if (treeStore) {
            treeStore.clearFilter();
            me.sortTree('DESC');
            treeSearchTrigger.reset();
            tree.collapseAll();
        }
    },
    onSearchCriteriaChange: function (field) {
        var me = this,
            menu = me.getView(),
            tree = menu.down('recordtree'),
            fieldValue,
            matches = 0;

        try {
            fieldValue = new RegExp(field.getValue(), 'i');
            if (!Ext.isEmpty(fieldValue)) {
                tree.store.filter({
                    filterFn: function (node) {
                        var children = node.childNodes,
                            len = children && children.length,
                            visible = node.isLeaf() ? fieldValue.test(node.get('title')) : false,
                            i;
                        for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                        if (visible && node.isLeaf()) {
                            matches++;
                        }
                        return visible;
                    },
                    id: 'titleFilter'
                });
                tree.down('#matches').setValue(matches);
            } else {
                tree.down('#matches').setValue('0');
            }
        } catch (e) {
            this.markInvalid('Invalid regular expression');
        }
    },
    onSearchFieldTriggerClick: function (trigger) {
        var me = this,
            menu = me.getView(),
            tree = menu.down('recordtree'),
            treeStore = tree.getStore();
        trigger.reset();
        treeStore.clearFilter();
        trigger.focus();
    },

    // @private
    sortTree: function (direction) {
        var me = this,
            menu = me.getView(),
            tree = menu.down('recordtree'),
            treeStore = tree.getStore();
        if (treeStore) {
            treeStore.sort('title', direction);
        }
    }

});
Ext.define('Fiddle.CustomMenuTitle', {
    extend: 'Ext.panel.Title',
    xtype: 'custom-menu-title',
    border: 1,
    style: {
        background: '#638BB5',
        color: '#FFFFFF',
        padding: '5px'
    },
    text: '<b>Custom Menu</b>',
    layout: {
        align: 'left'
    },
    flex: 1
});
Ext.define('Fiddle.CustomMenu', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Fiddle.RecordTree',
        'Fiddle.CustomMenuTitle',
        'Fiddle.CustomMenuController'
    ],
    title: Ext.create('Fiddle.CustomMenuTitle'),
    controller: 'custommenu',
    xtype: 'custom-menu',
    bodyStyle: {
        background: '#C0C0C0',
        marginLeft: '0px',
        marginRight: '0px'
    },
    showSeparator: true,
    plain: true,
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'right'
            },
            bodyStyle: {
                background: '#C0C0C0',
                paddingTop: '5px',
                paddingBottom: '5px'
            },
            items: [
                {
                    xtype: 'title',
                    bodyStyle: {
                        background: '#C0C0C0',
                        paddingBottom: '5px'
                    },
                    text: 'Sort:&nbsp;&nbsp;',
                    layout: {
                        align: 'left'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Ascending',
                    handler: 'onAscendingClick',
                    flex: 1

                },
                {
                    xtype: 'button',
                    text: 'Descending',
                    handler: 'onDescendingClick',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'recordtree'
        },
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'right'
            },
            bodyStyle: {
                background: '#C0C0C0',
                paddingTop: '5px',
                paddingBottom: '5px'
            },
            items: [
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    flex: 1,
                    handler: 'onClearFilterClick'
                }
            ]
        }
    ]
});

Ext.onReady(function () {

    var fiddleHeader = 'Fiddle ~ Buffered Rendered Column Filtering',
        fiddleSubHeader = '<i>Grid panel configured with the "gridfilters" and "bufferedrenderer" plugins. The grid is bound to a vanilla data store populated with 471 records. NOTE - The data is ' + '<a href="http://www.json-generator.com/" title="json generator" target="_blank">generated json</a>.</i>',
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
        topToolFactory = function () {
            return [
                { xtype: 'splitbutton', text: 'filter', menu: Ext.create('Fiddle.CustomMenu') }
            ]
        },
        bottomToolFactory = function () {
            return ['->', {
                text: 'Reset',
                handler: function () {
                    grid.filters.clearFilters();
                }
            }]
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
            store: store,
            requires: [
                'Fiddle.CustomHeader'
            ],
            columns: columnFactory(7),
            loadMask: true,
            plugins: pluginFactory(),
            tbar: topToolFactory(),
            bbar: Ext.create('Ext.toolbar.Paging', {
                store: store
            })
        }),
        win = Ext.create('Ext.Window', {
            title: 'Fiddle ~ Buffered Rendered Column Filtering',
            modal: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });


    grid.child('[dock=bottom]').add(bottomToolFactory());
    store.load();
    win.show();


    Ext.QuickTips.init();

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
