var meta = {
    fiddleHeader: 'Extreme Fiddle ~ Manual Grid Persistence',
    fiddleSubHeader: '<br>Fiddle exploring how to manually persist (and then restore) the state of a grid using a local storage provider.</i></br>',
    recordsUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json'
}

function onGridSaveState(grid) {
    var me = grid,
        state = {},
        storeState = me.store.getState(),
        localStorage = Ext.state.Manager.getProvider();

    state = me.addPropertyToState(state, 'columns', me.headerCt.getColumnsState());

    if (storeState) {
        state.storeState = storeState;
    }
    localStorage.set(me.getStateId(), state);
}
function onGridApplyState(grid) {
    var me = grid,
        localStorage = Ext.state.Manager.getProvider(),
        state = localStorage.get(me.getStateId(), []),
        sorter = !Ext.isEmpty(state) ? state.sort : null,
        storeState = !Ext.isEmpty(state) ? state.storeState : null,
        store = !Ext.isEmpty(state) ? me.store : null,
        columns = !Ext.isEmpty(state) ? state.columns : null;

    if (!Ext.isEmpty(state)) {
        store.loadRecords([], {addRecords: false});
        delete state.columns;
        if (columns) {
            me.headerCt.applyColumnsState(columns);
        }
        if (sorter) {
            if (store.remoteSort) {
                store.sort({
                    property: sorter.property,
                    direction: sorter.direction,
                    root: sorter.root
                }, null, false);
            } else {
                store.sort(sorter.property, sorter.direction);
            }
        }
        else if (storeState) {
            store.applyState(storeState);
        }
        store.load();
    }
}

// Forked Fiddle ~

Ext.application({
    name: 'Fiddle',
    launch: function () {
        Ext.QuickTips.init();
        Ext.define('FiddleStateManager', {
            requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
        }, function () {
            Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
                prefix: 'fiddle-'
            }));
        });
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
        var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                proxy: {
                    type: 'ajax',
                    url: meta.recordsUrl,
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
                return [{
                    text: 'clear store',
                    id: 'btnClearStore',
                    handler: function () {
                        var grid = this.up('grid'),
                            store = grid.getStore();
                        store.loadRecords([], {addRecords: false});
                    }
                }, {
                    text: 'clear columns',
                    id: 'btnClearColumns',
                    handler: function () {
                        var grid = this.up('grid');
                        grid.reconfigure(grid.getStore(), []);
                    }
                }, {
                    text: 'load columns',
                    id: 'btnLoadColumns',
                    handler: function () {
                        var grid = this.up('grid'),
                            columns = headerFactory();
                        grid.reconfigure(grid.getStore(), columns);
                    }
                }, {
                    text: 'load store',
                    id: 'btnLoadStore',
                    handler: function () {
                        var store = Ext.getStore('myStore');
                        store.load();
                    }
                }, {
                    text: 'save state',
                    id: 'btnSaveState',
                    handler: function () {
                        var grid = this.up('grid');
                        grid.fireEvent('savestate', grid);
                    }
                }, {
                    text: 'restore state',
                    id: 'btnRestoreState',
                    handler: function () {
                        var grid = this.up('grid');
                        grid.fireEvent('applystate', grid);
                    }
                }]
            },
            pluginFactory = function () {
                return ['gridfilters', 'bufferedrenderer']
            },
            headerFactory = function () {
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
                    },
                    {dataIndex: 'age', text: 'Age', filter: {type: 'numeric'}},
                    {
                        dataIndex: 'registered',
                        text: 'MemberSince',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                        filter: {type: 'date'}
                    },
                    {dataIndex: 'address', text: 'Address', filter: {type: 'string'}, flex: 2},
                    {dataIndex: 'eyeColor', text: 'Eye Color', filter: {type: 'string'}},
                    {dataIndex: 'gender', text: 'Gender', filter: {type: 'string'}},
                    {dataIndex: 'company', text: 'Employer', filter: {type: 'string'}},
                    {dataIndex: 'about', text: 'About', filter: {type: 'string'}},
                    {dataIndex: 'latitude', text: 'Latitude', filter: {type: 'numeric'}},
                    {dataIndex: 'longitude', text: 'Longitude', filter: {type: 'numeric'}},
                    {dataIndex: 'tags', text: 'Tags', filter: {type: 'string'}},
                    {dataIndex: 'favoriteFruit', text: 'Fruit', filter: {type: 'string'}}
                ];
                return columns;
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
                requires: ['FiddleStateManager'],
                id: 'fiddleGrid',
                store: store,
                stateId: 'grid-state',
                viewConfig: {
                    enableLockable: true,
                    emptyText: '<div style="width:auto; height:auto; text-align:center; color:red; font-weight:bold;">Completely Empty.</div>'
                },
                columns: headerFactory(),
                loadMask: true,
                plugins: pluginFactory(),
                tbar: Ext.create('Ext.toolbar.Toolbar'),
                listeners: {
                    afterrender: onGridAfterRender,
                    applystate: onGridApplyState,
                    savestate: onGridSaveState
                }
            }),
            win = Ext.create('Ext.Window', {
                title: meta.fiddleHeader,
                height: 500,
                width: 700,
                maximizable: true,
                closable: false,
                layout: 'fit',
                items: grid
            }),
            positionX = 25,
            positionY = 125;
        grid.child('[dock=top]').add(toolFactory());
        store.load();
        win.showAt([positionX, positionY]);
        window.setTimeout(function () {
            win.maximize(true);
        }, 2500);
        // Boiler Plate
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
    }
});

