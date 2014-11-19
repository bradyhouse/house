Ext.onReady(function () {
    Ext.define('App.MyContextMenu', {
        extend: 'Ext.menu.Menu',
        alias: 'widget.mycontextmenu',
        width: 50,
        height: 50,
        items: [{

            text: 'Export to Excel ...'
        }],
        listeners: {
            itemclick: this.onContextMenuItemClick
        },
        onContextMenuItemClick: function(item) {
            Ext.Msg.alert('Hi Mom!', 'You clicked' + item.text);
        }
    });

    Ext.define('App.MyGridPanelController', {
        extend: 'Ext.app.ViewController',
        requires: [
            'App.MyContextMenu'
        ],
        alias: 'controller.mygridpanel',
        onItemContextMenu: function (panel, record, item, index, event) {
            console.log('onItemContextMenu');
            console.log('event');
            console.log(event);
            event.preventDefault();
            var me = this;
            new Ext.menu.Menu({
                items: [{
                    iconCls: 'excel',
                    text: 'Export to Excel ... '
                }],
                listeners: {
                    click: me.onContextMenuClick
                }
            }).showAt(event.getXY());
        },
        onContextMenuClick: function(menu, item) {
            Ext.Msg.alert('Hi Mom!', 'You clicked' + item.text);
            console.log(item);
        },
        onContainerContextMenu: function (panel, event) {
            console.log('onContainerContextMenu');
            console.log('event');
            console.log(event);

        },
        onBeforeItemContextMenu: function (panel, td, cellIndex, record, tr, rowIndex, event) {
            console.log('onBeforeItemContextMenu');
        }

    });

    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        constructor: function (config) {
            var me = this,
                cfg = config || {};
            cfg.proxy = me.getStoreProxy();
            cfg.fields = me.getStoreFields();
            me.callParent([cfg]);
        },
        getStoreFields: function () {
            return [{
                name: "text",
                convert: undefined
            }, {
                name: "checked",
                defaultValue: false
            }, {
                name: "expanded",
                defaultValue: true
            }, {
                name: "status"
            }];
        },
        getStoreProxy: function () {
            return {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            };
        }

    });

    Ext.define('App.MyGridPanel', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.mygridpanel',
        requires: [
            'App.MyGridPanelController'
        ],
        title: 'Fiddle ~ Context Menu',
        controller:  'mygridpanel',
        listeners: {
            beforeitemcontextmenu: 'onBeforeItemContextMenu',
            itemcontextmenu: 'onItemContextMenu',
            containercontextmenu: 'onContainerContextMenu'
        },
        columns: [{
            text: "text",
            dataIndex: "text",
            flex: 3
        }, {
            text: "checked",
            dataIndex: "checked",
            flex: 1.5
        }, {
            text: "expanded",
            dataIndex: "expanded",
            flex: 1.5
        }, {
            text: "status",
            dataIndex: "status",
            flex: 1.5
        }],
        initComponent: function () {
            this.title += '&nbsp;&nbsp;(ExtJS Version ' + Ext.getVersion().getMajor() + '.' + Ext.getVersion().getMinor() + '.' + Ext.getVersion().getPatch() + '.' + Ext.getVersion().getBuild() + ')</span>';
            this.callParent();
        }
    });

    Ext.create('App.Store', {
        storeId: 'myStore'
    });

    var myStore = Ext.getStore('myStore');
    myStore.load();
    Ext.create('App.MyGridPanel', {
        store: myStore,
        renderTo: Ext.getBody()
    });
});
