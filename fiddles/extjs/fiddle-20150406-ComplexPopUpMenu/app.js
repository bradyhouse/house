Ext.define('Fiddle.Animal', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Animal',
    idProperty: 'animalid',
    fields: [
        {
            name: "title",
            convert: undefined
        }
    ]
});
Ext.define('Fiddle.Animals', {
    extend: 'Ext.data.TreeStore',
    model: 'Fiddle.Animal',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'data.json'
    },
    autoload: true,
    sorters: [
        {
            property: 'title',
            direction: 'DESC'
        }
    ]
}, function () {
    Ext.create('Fiddle.Animals', {
        storeId: 'Animals'
    });
});
Ext.define('Fiddle.AnimalTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Fiddle.Animals'
    ],
    alias: 'widget.animaltree',
    store: 'Animals',
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
            xtype: 'treecolumn',
            flex: 1,
            dataIndex: 'title'
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
            tree = menu.down('animaltree'),
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
            tree = menu.down('animaltree'),
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
            tree = menu.down('animaltree'),
            treeStore = tree.getStore();
        trigger.reset();
        treeStore.clearFilter();
        trigger.focus();
    },

    // @private
    sortTree: function (direction) {
        var me = this,
            menu = me.getView(),
            tree = menu.down('animaltree'),
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
        'Fiddle.AnimalTree',
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
            xtype: 'animaltree'
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

    var fiddleHeader = 'Extreme Fiddle ~ Dialog Context Menu',
        fiddleSubHeader = '<i>Fiddle exploring how to create a "complex" context menu that includes an embedded tree panel.</i>',
        fiddleMenu = Ext.create('Fiddle.CustomMenu'),
        fiddle = Ext.create('Ext.Panel', {
            bodyPadding: 5,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        { xtype: 'splitbutton', text: 'menu', menu: fiddleMenu }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    html: 'Click the menu button'
                }
            ]
        }),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            closable: false,
            height: 150,
            width: 500,
            layout: 'fit',
            items: fiddle
        });


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