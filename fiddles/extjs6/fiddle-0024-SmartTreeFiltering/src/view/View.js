Ext.define('Fiddle.View', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Fiddle.Controller',
        'Fiddle.SeatComboBox'],
    controller: 'flights',
    store: flights,
    alias: 'widget.flights',
    rootVisible: false,
    scroll: 'both',
    store: flights,
    listeners: {
        'checkchange': {
            fn: 'onCheckChange',
            priority: 500
        }
    },
    tbar: Ext.create('Ext.toolbar.Toolbar', {
        dock: 'top',
        items: ['->',
            {
                xtype: 'seatcombobox'
            }
        ]


    }),
    columns: [{
        xtype: 'treecolumn',
        text: 'Tree Column',
        flex: 1.5,
        sortable: true,
        dataIndex: 'text'
    },{
        text: 'flight #',
        dataIndex: 'flightId',
        flex: 1
    }, {
        text: 'status',
        dataIndex: 'status'
    }, {
        text: 'Entity',
        flex: 1,
        renderer: function(v, cellValues, record) {
            return record.entityName;
        }
    }],
    single: true
});
