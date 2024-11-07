Ext.onReady(function() {

    Ext.define('App.Store', {
        extend: 'Ext.data.BufferedStore',
        config: {
            proxy: {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['checkingBalance'],
            trailingBufferZone: 20,
            leadingBufferZone: 281,
            autoLoad: true,
            sortReload: false // Custom flag
        }
    });

    Ext.define('App.CtrlListeners', {
        extend: 'Ext.Mixin',
        mixinConfig: {
            id: 'ctrlListeners',
            after: {
                init: 'init'
            }
        },
        init: function(view) {
            this.listen({
                component: {
                    fiddlegrid: {
                        sortchange: 'onSortChange'
                    }
                },
                store: {
                    '*': {
                        load: 'onStoreLoad'
                    }
                }

            });
        },
        onSortChange: function(panel) {
            this.getView().getStore().setSortReload(true);
        },
        onStoreLoad: function(store) {
            if (store.getSortReload()) {
                // Perform store load specific logic
                // ....
                // Initiate Reload
                store.reload();
                store.setSortReload(false);
            }
        }
    });

    Ext.define('App.Ctrl', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.ctrl',
        mixins: ['App.CtrlListeners']
    });

    Ext.define('App.GridPanel', {
        extend: 'Ext.grid.Panel',
        requires: ['App.Ctrl'],
        title: 'Open your console and Sort the Column',
        alias: 'widget.fiddlegrid',
        width: window.innerWidth,
        height: window.innerHeight,
        controller: 'ctrl',
        store: Ext.create('App.Store', {
            storeId: 'gridpanel'
        }),
        columns: [{
            text: "Checking",
            dataIndex: "checkingBalance"
        }]
    });

    Ext.create('App.GridPanel', {
        renderTo: Ext.getBody()
    });
});
