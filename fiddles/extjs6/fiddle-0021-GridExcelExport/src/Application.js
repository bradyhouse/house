Ext.application({
    name: 'Fiddle',
    launch: function () {
        Ext.QuickTips.init();
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
                fields: ['index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude']
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
                    text: 'export to excel',
                    handler: function () {
                        this.ownerCt.ownerCt.saveDocumentAs({
                                type: 'excel',
                                title: 'My export',
                                fileName: 'excel.xml'
                            });
                    }
                }]
            },
            pluginFactory = function () {
                return ['gridfilters', 'bufferedrenderer', 'gridexporter']
            },
            headerFactory = function () {
                var columns = [
                    {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'index',
                        text: 'id',
                        filter: {
                            type: 'numeric'
                        },
                        locked: true
                    },
                    {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'name',
                        text: 'Name',
                        filter: {
                            type: 'numeric'
                        },
                        locked: true,
                        width: 150
                    },
                    {
                        xtype: 'fiddlecolumn',
                        text: 'Banking',
                        defaults: {
                            hideable: false,
                            menuDisabled: true,
                            draggable: false
                        },
                        columns: [{
                            dataIndex: 'checkingBalance',
                            xtype: 'fiddlecolumn',
                            text: 'Checking',
                            filter: {}
                        },
                            {
                                dataIndex: 'savingsBalance',
                                xtype: 'fiddlecolumn',
                                text: 'Savings',
                                filter: {}
                            }]
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'age',
                        text: 'Age',
                        filter: {type: 'numeric'}
                    },
                    {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'registered',
                        text: 'MemberSince',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                        filter: {type: 'date'}
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'address',
                        text: 'Address',
                        filter: {type: 'string'},
                        flex: 2, stateId: 'address'

                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'eyeColor',
                        text: 'Eye Color',
                        filter: {type: 'string'}
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'gender',
                        text: 'Gender',
                        filter: {type: 'string'}
                    },
                    {xtype: 'fiddlecolumn', dataIndex: 'company', text: 'Employer', filter: {type: 'string'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'about', text: 'About', filter: {type: 'string'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'latitude', text: 'Latitude', filter: {type: 'numeric'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'longitude', text: 'Longitude', filter: {type: 'numeric'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'tags', text: 'Tags', filter: {type: 'string'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'favoriteFruit', text: 'Fruit', filter: {type: 'string'}}
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
                requires: ['Ext.grid.plugin.Exporter', 'FiddleStateManager', 'FiddleColumn'],
                id: 'fiddleGrid',
                store: store,
                //stateId: 'grid-state',
                viewConfig: {
                    //enableLockable: true,
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
