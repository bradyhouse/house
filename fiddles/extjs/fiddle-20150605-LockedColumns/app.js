var fiddleHeader = 'Extreme Fiddle ~ Grid Panel',
    fiddleSubHeader = '<i>Fiddle exploring the limits of the grid panel.  Among other things, it explores sub columns, tooltips, column locking and dynamic reconfiguration. </i>';

Ext.define('FiddleTooltipMixin', {
    extend: 'Ext.Mixin',
    isFiddleTooltipMixin: true,
    mixinConfig: {
        id: 'FiddleToolTip',
        after: {
            init: 'init'
        }
    },
    init: function () {
        this.listen({
            component: {
                fiddletooltip: {
                    beforeshow: 'onBeforeShow'
                }
            }
        })
    },
    onBeforeShow: function (tip) {
        var columns = tip.view.ownerGrid.columns,
            record = tip.view.getRecord(tip.triggerElement.parentNode),
            tooltipValue = this.table(columns, record, this);
        tip.update(tooltipValue);
    },
    privates: {
        tr: function (label, value) {
            return '<tr><td>' + label + ':&nbsp;</td><td>' + value + '</td></tr>';
        },
        table: function (columns, record, scope) {
            var html = '<table width="100%">';
            columns.forEach(function (column) {
                html += scope.tr(column.text, record.get(column.dataIndex));
            });
            return html + '</table>';
        }
    }
});
Ext.define('FiddleTooltipController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddletooltip',
    isFiddleTooltip: true,
    mixins: [
        'FiddleTooltipMixin'
    ]
});
Ext.define('FiddleTooltip', {
    extend: 'Ext.tip.ToolTip',
    alias: 'widget.fiddletooltip',
    requires: [
        'FiddleTooltipController'
    ],
    config: {
        controller: 'fiddletooltip',
        delegate: '.x-grid-cell',
        trackMouse: true
    }
});

Ext.onReady(function () {

    Ext.QuickTips.init();
    var store = Ext.create('Ext.data.Store', {
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
            storeId: 'myStore',
            fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude']
        }),
        toolTipFactory = function (grid) {
            return new FiddleTooltip({
                id: "gridToolTip" + grid.id,
                target: grid.view.el,
                renderTo: Ext.getBody()
            });
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
                    locked: true,
                    filter: {
                        type: 'numeric'
                    }
                },
                {
                    dataIndex: 'name',
                    text: 'Name',
                    locked: true,
                    id: '_id',
                    filter: {
                        type: 'numeric'
                    },
                    width: 150
                },
                {
                    text: 'Profile',
                    defaults: {
                        hideable: false,
                        menuDisabled: true,
                        draggable: false
                    },
                    columns: [{
                        dataIndex: 'age',
                        text: 'Age',
                        filter: {
                            type: 'numeric'
                        }
                    }, {
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
                    ]
                }, {
                    text: 'Banking',
                    defaults: {
                        hideable: false,
                        menuDisabled: true,
                        draggable: false
                    },
                    columns: [{
                        dataIndex: 'checkingBalance',
                        text: 'Checking',
                        filter: {}
                    },
                        {
                            dataIndex: 'savingsBalance',
                            text: 'Savings',
                            filter: {}
                        }]
                }
            ];
            return columns.slice(start || 0, finish);
        },
        onGridAfterRender = function (grid) {
            var view = grid.view;
            if (Ext.getCmp("gridToolTip" + grid.id) != undefined) {
                Ext.destroy(Ext.getCmp("gridToolTip" + grid.id));
            }
            grid.tip = toolTipFactory(grid);
            grid.tip.view = view;
        },
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            id: 'fiddleGrid',
            store: store,
            viewConfig: {
                enableLockable: true
            },
            columns: headerFactory(7),
            loadMask: true,
            plugins: pluginFactory(),
            bbar: Ext.create('Ext.toolbar.Toolbar'),
            listeners: {
                afterrender: onGridAfterRender
            }
        }),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            height: 500,
            width: 700,
            closable: false,
            layout: 'fit',
            items: grid
        });
    grid.child('[dock=bottom]').add(toolFactory());
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
