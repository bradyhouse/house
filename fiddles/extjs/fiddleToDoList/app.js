Ext.onReady(function() {
    var deleteIconLink = 'http://dev.sencha.com/ext/5.0.1/examples/kitchensink/resources/images/icons/fam/delete.gif',
        kitchenSinkForkLink = 'http://dev.sencha.com/ext/5.0.0/examples/kitchensink/#cell-editing',
        fiddleHeader = '<i>There are 15+ "ToDo List" fiddles.&nbsp;&nbsp;Most are incomplete or don\'t work. This one works--it\'s '+
            'complete.&nbsp;&nbsp;It is adapted from Sencha\'s Kitchen Sink <a href="' +
            kitchenSinkForkLink
            +'" target="_blank" title="Kitchen Sink Fork link">' +
            'Cell Editting Example</a>.&nbsp;&nbsp;Beyond maintaining the ' +
            '<a href="' +
            deleteIconLink
            +'" target="_blank" title="Delete Icon Link">delete icon</a>,' +
            'it is a full refactor with a few tweaks.&nbsp;&nbsp;Of note, it persists ' +
            'user\'s input via local storage.</i>';

    // Fiddle
    Ext.define('MyFiddle.StateManager', {
        requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
    }, function () {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'MyFiddle-'
        }));
    });
    Ext.define('MyFiddle.ToDo', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'task', type: 'string'},
            {name: 'priority', type: 'int'}
        ]
    })
    Ext.define('MyFiddle.FiddleController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.fiddle',
        requires: [
            'MyFiddle.ToDo'
        ],
        onBeforeStateRestore: function() {
            console.log('onBeforeStateRestore');
            if (this.getView().isLayoutSuspended()) {
                return false;
            }
        },
        onAfterLayout: function() {
            console.log('onAfterLayout');
            this.getView().loadStore();
        },
        onAddClick: function(){
            console.log('onAddClick');
            var me = this.getView(),
                rec = new MyFiddle.ToDo({
                    task: '',
                    priority: me.getStore().count() + 1
                });
            me.getStore().insert(0, rec);
            me.cellEditing.startEditByPosition({
                row: me.getStore().count() - 1,
                column: 0
            });
        }
    });
    Ext.define('MyFiddle.Fiddle', {
        extend: 'Ext.grid.Panel',
        requires: [
            'Ext.selection.CellModel',
            'Ext.grid.*',
            'Ext.data.*',
            'Ext.util.*',
            'Ext.form.*',
            'MyFiddle.ToDo',
            'MyFiddle.FiddleController'
        ],
        listeners: {
            afterlayout: {
                fn:  'onAfterLayout',
                delay: 1,
                single: true
            },
            beforestaterestore: 'onBeforeStateRestore'
        },
        xtype: 'fiddle',
        title: 'Todo List',
        frame: true,
        stateEvents: ['add', 'remove'],
        stateful: true,
        stateId: 'fiddle-fdQT-state',
        saveDelay: 1000,
        controller: 'fiddle',
        initComponent: function() {
            console.log('initComponent');
            var me = this;
            // Suspend Layout to prevent State get
            me.suspendLayouts();
            Ext.apply(me, {
                plugins: me.inflatePlugins(),
                store: me.inflateStore(),
                columns: me.inflateColumns(),
                selModel: me.inflateSelModel(),
                tbar: me.inflateTbar()
            });
            me.callParent();
            me.mindTouchSupport();
            me.resumeLayouts();

        },
        // ToDo - Figure out how to move this to the Controller!!!
        onRemoveClick: function(grid, rowIndex){
            console.log('onRemoveClick')
            this.getView().getStore().removeAt(rowIndex);
        },
        getState: function () {
            console.log('getState');
            var me = this,
                data = me.getStore().data,
                rows = [],
                cols = me.getStore().getFields();
            Ext.Array.forEach(data.items, function(item) {
                rows.push({
                    task: item.data.task,
                    priority: item.data.priority
                })
            });
            return {
                fields: cols,
                data: rows
            };
        },
        applyState: Ext.emptyFn,
        // @private
        // Note - prefix chosen because (a) not used in the framework.
        // (b) Definition fits, "mind" - 'to take care or be careful
        // of or about something’, or ‘to pay attention to something’.
        mindTouchSupport: function() {
            console.log('mindTouchSupport');
            if (Ext.supports.Touch) {
                this.addDocked({
                    xtype: 'header',
                    title: '<b>Note that cell editing is not recommeded on keyboardless touch devices.</b>'
                });
            }
        },
        // @private
        // Note - Again, unique prefix. The meaning being, fill-up
        // the associated attribute.  Additional point: splitting
        // things out into functions makes code more readable.  Specifically,
        // it takes advantage of the expand/collapse functionality
        // built into most SDK's.
        inflateTbar: function() {
            console.log('inflateTbar');
            return [{
                text: 'Add Task',
                scope: this,
                listeners: {
                    'click': 'onAddClick'
                }
            }];
        },
        // @private
        inflateSelModel: function() {
            console.log('inflateSelModel');
            return {
                selType: 'cellmodel'
            };
        },
        // @private
        inflateColumns: function() {
            console.log('inflateColumns');
            return [{
                header: 'ToDo',
                dataIndex: 'task',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Priority',
                dataIndex: 'priority',
                width: 130,
                editor: {
                    allowBlank: false
                }
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: deleteIconLink,
                    tooltip: 'Delete ToDo',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }];
        },
        // @private
        loadStore: function() {
            console.log('loadStore');
            var me = this,
                id = me.getStateId(),
                state,
                rec;
            console.log('id');
            console.log(id);
            if (id) {
                state = Ext.state.Manager.get(id);
                if (!Ext.isEmpty(state)) {
                    Ext.Array.forEach(state.data, function(row) {
                        rec = new MyFiddle.ToDo({
                            task: row.task,
                            priority: row.priority
                        });
                        me.getStore().insert(0, rec);
                    });

                } else {
                    this.getStore().load();
                }
            }
        },
        // @private
        inflatePlugins: function() {
            console.log('inflatePlugins');
            this.cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1
            });
            return [this.cellEditing];
        },
        // @private
        inflateStore: function() {
            console.log('inflateStore');
            var myStateId = this.getStateId();
            return new Ext.data.Store({
                autoDestroy: true,
                model: MyFiddle.ToDo,
                proxy: {
                    type: 'ajax',
                    url: 'data.json',
                    reader: {
                        type: 'json'
                    }
                },
                sorters: [{
                    property: 'priority',
                    direction:'ASC'
                }]
            })
        }
    });

    // Boiler Plate
    Ext.define('MyFiddle.view.Main', {
        extend: 'Ext.panel.Panel',
        requires: ['MyFiddle.Fiddle'],
        alias: 'widget.main',
        layout: {
            type: 'accordion',
            multi: true,
            hideCollapseTool: true
        },
        items: [{
            xtype: 'fiddle'
        }]
    });
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: fiddleHeader
        }
    });
    Ext.define('App.Box', {
        extend: "Ext.container.Container",
        viewModel: {
            type: 'box'
        },
        items: [{
            xtype: 'panel',
            items: [{
                xtype: 'panel',
                bodyStyle: {
                    "background-color": "#FF0000",
                    "padding": "10px",
                    "font-weight": "bolder",
                    "font-family": "Times",
                    "font-size": "2em",
                    "line-height": "1.2em",
                    "color": "#ffffff",
                    "padding-bottom": "1em",
                    "padding-top": "1em"
                },
                bind: {
                    html: '{header}'
                }
            }],
            region: 'north'
        }, {
            type: 'panel',
            region: 'center',
            xtype: 'main'
        }]
    });

    // Start up
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});
