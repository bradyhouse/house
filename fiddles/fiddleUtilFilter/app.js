/* UNDER CONSTRUCTION @ 07/11/2014
 * NOTE - BASIC LOGIC AS WELL AS THE DATA.JSON
 * LIFTED FROM THE KITCHEN SINK GRID FILTERING EXAMPLE--
 * http://dev.sencha.com/ext/5.0.0/examples/kitchensink/#grid-filtering
 */

Ext.onReady(function() {

    Ext.require('Ext.form.field.Display');
    Ext.require('Ext.grid.filters.Filters');

    Ext.define('App.store.Filter', {
        extend: 'Ext.util.Filter',
        valueCounters: {},
        expandedValues: {},
        root: 'data',
        id: 'appFilter',
        config: {
            value: ''
        },
        filterFn: function(record) {
            var regExp,
                visible = false,
                found = 0,
                value = this.getValue() | '';
            try {
                regExp = new RegExp(value, 'i');
                visible = regExp.test(record.get('text'));
                found = this.matches;
                if (visible) {
                    this.setMatches(found++);
                }
            } catch (e) {
                Ext.Msg.show(e);
            }
            return visible;
        }

    });

    Ext.define('App.model.Model', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'text'
        }]
    });

    Ext.define('App.store.Store', {
        extend: 'Ext.data.TreeStore',
        requires: 'App.model.Model',
        model: 'App.model.Model',
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
        },
        autoLoad: true,
        remoteSort: false,
        sorters: [{
            property: 'text',
            direction: 'ASC'
        }]
    });

    var filter = new App.store.Filter();

    Ext.define('App.view.Grid', {
        extend: 'Ext.grid.Panel',
        requires: ['Ext.grid.filters.Filters'],
        xtype: 'appgrid',
        title: 'Custom Filter + Custom Store',
        collapsible: true,
        iconCls: 'icon-grid',
        frame: true,
        width: 700,
        height: 300,
        resizable: true,
        defaultListenerScope: true,
        emptyText: 'No Matching Records',
        loadMask: true,
        stateful: true,
        columns: [{
            dataIndex: 'id',
            text: 'Id',
            width: 50,
            filter: 'number'
        }, {
            dataIndex: 'text',
            text: 'data',
            flex: 1
        }],
        tbar: [{
            labelWidth: 130,
            xtype: 'triggerfield',
            fieldLabel: 'Filter',
            triggerCls: 'x-form-clear-trigger',
            onTriggerClick: function() {
                var store = this.up('appgrid').store;
                this.reset();
                store.clearFilter();
                this.focus()
            },
            listeners: {
                change: function() {
                    var grid = this.up('appgrid'),
                        v,
                        matches = 0,
                        filter;
                    try {

                        console.log(filter);

                        grid.store.filter();


                    } catch (e) {

                    }


                }
            }
        }, {
            xtype: 'displayfield',
            itemId: 'matches',
            fieldLabel: 'Matches',
            // Use shrinkwrap width for the label
            labelWidth: null,
            listeners: {
                beforerender: function() {
                    var me = this,
                        grid = me.up('appgrid');
                    grid.store.on('fillcomplete', function(store, rec) {

                    });
                },
                single: true
            }
        }]
    });

    var filter = new App.store.Filter({
        property: 'text',
        value   : 'foo'
    });
    console.log(filter);

    var grid = Ext.create('App.view.Grid', {
        store: new App.store.Store(),
        renderTo: Ext.getBody()
    });

});