var fiddleHeader = 'Extreme Fiddle ~ Grid Panel Layout Persistence',
    fiddleSubHeader = '<i>Fiddle exploring the limits of the grid panel.  Among other things, it explores sub columns, tooltips, column locking, dynamic reconfiguration <b><i>and</i></b> persistence. </i>',
    recordsUrl= 'data.json';

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
                    url: recordsUrl,
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
                    text: 'reset',
                    handler: function () {
                        var grid = this.up('grid'),
                            store = grid.getStore(),
                            columns = headerFactory();
                        // Clear the columns
                        grid.reconfigure(grid.getStore(), []);
                        // Clear the store
                        store.loadRecords([], {addRecords: false});
                        // Reload the columns
                        grid.reconfigure(grid.getStore(), columns);
                        // Reload the store
                        store.load();
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
                    {dataIndex: 'registered', text: 'MemberSince', renderer: Ext.util.Format.dateRenderer('Y-m-d'), filter: {type: 'date'}},
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
                stateful: true,
                stateId: 'grid-state',
                viewConfig: {
                    enableLockable: true
                },
                columns: headerFactory(),
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
                maximizable: true,
                closable: false,
                layout: 'fit',
                items: grid
            }),
            positionX = 25,
            positionY = 125;
        grid.child('[dock=bottom]').add(toolFactory());
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
    }
});

