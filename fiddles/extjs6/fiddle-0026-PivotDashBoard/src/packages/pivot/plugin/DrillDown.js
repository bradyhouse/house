/**
 *
 * This plugin allows the user to view all records that were aggregated for a specified cell.
 * The user has to double click that cell to open the viewer.
 */
Ext.define('Ext.pivot.plugin.DrillDown', {
    alternateClassName: [
        'Mz.pivot.plugin.DrillDown'
    ],

    alias: [
        'plugin.pivotdrilldown',
        'plugin.mzdrilldown'
    ],

    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.pivot.Grid',
        'Ext.window.Window',
        'Ext.data.proxy.Memory',
        'Ext.data.Store',
        'Ext.toolbar.Paging'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {Ext.grid.column.Column[]} [columns] Specify which columns should be visible in the grid.
     * Use the same definition you would use for a grid column. Header and dataIndex are the most important ones.
     */
    columns: 	[],
    /**
     * @cfg {Number} width Width of the viewer's window.
     */
    width:		400,
    /**
     * @cfg {Number} height Height of the viewer's window.
     */
    height:		300,
    /**
     * @cfg {String} textWindow Viewer's window title.
     */
    textWindow: 'Drill down window',

    /**
     *  `"both"` (the default) - The plugin is added to both grids
     *  `"top"` - The plugin is added to the containing Panel
     *  `"locked"` - The plugin is added to the locked (left) grid
     *  `"normal"` - The plugin is added to the normal (right) grid
     *
     * @private
     */
    lockableScope:  'top',

    init: function(grid){
        var me = this;

        //<debug>
        // this plugin is available only for the pivot grid
        if (!grid.isPivotGrid) {
            Ext.raise('This plugin is only compatible with Ext.pivot.Grid');
        }
        //</debug>

        me.pivot = grid;
        me.pivotListeners = me.pivot.on({
            pivotitemcelldblclick:      me.runPlugin,
            pivotgroupcelldblclick:     me.runPlugin,
            pivottotalcelldblclick:     me.runPlugin,
            scope:                      me,
            destroyable:                true
        });

        me.callParent(arguments);
    },

    destroy: function(){
        var me = this;

        Ext.destroyMembers(me, 'view', 'pivotListeners');

        me.pivot = me.view = me.pivotListeners = me.store = null;

        me.callParent(arguments);
    },

    showView: function(records){
        var me = this,
            fields = me.pivot.getMatrix().store.model.getFields(),
            columns = me.columns,
            store;

        if (!me.view) {
            store = Ext.create('Ext.data.Store', {
                pageSize: 25,
                remoteSort: true,
                fields: Ext.clone(fields),
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'array'
                    },
                    enablePaging: true
                }
            });

            // if no columns are defined then use those defined in the pivot grid store
            if (columns.length === 0) {
                Ext.Array.each(fields, function (value, index, all) {
                    columns.push({
                        header: Ext.String.capitalize(value.name),
                        dataIndex: value.name
                    });
                });
            }

            // create the window that will show the records
            me.view = Ext.create('Ext.window.Window', {
                title: me.textWindow,
                width: me.width,
                height: me.height,
                layout: 'fit',
                modal: true,
                closeAction: 'hide',
                items: [{
                    xtype: 'grid',
                    border: false,
                    viewConfig: {
                        loadMask: false
                    },
                    columns: columns,
                    store: store,
                    dockedItems: [{
                        itemId: 'idPager',
                        xtype: 'pagingtoolbar',
                        store: store,   // same store GridPanel is using
                        dock: 'bottom',
                        displayInfo: true
                    }]
                }]
            });

            me.store = store;
        }
        me.store.getProxy().data = records;
        me.store.load();
        me.view.show();
        me.view.down('#idPager').moveFirst();
    },

    runPlugin: function(params, e, eOpts){
        var me = this,
            matrix = me.pivot.getMatrix(),
            result;

        // do nothing if the plugin is disabled
        if(me.disabled) {
            return;
        }

        if(params.topKey){
            result = matrix.results.get(params.leftKey, params.topKey);
            if(result){
                me.showView(result.records);
            }
        }
    }

});
