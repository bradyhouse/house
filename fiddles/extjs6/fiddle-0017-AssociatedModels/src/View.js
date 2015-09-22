Ext.define('Fiddle.View', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*'],
    store: 'Flights',
    alias: 'widget.flights',
    rootVisible: false,
    scroll: 'both',
    store: fiddleStore,
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
