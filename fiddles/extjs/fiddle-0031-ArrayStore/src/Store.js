
Ext.define('Fiddle.Records', {
    extend: 'Ext.data.ArrayStore',
    requires: ['Fiddle.model.Item'],
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        autoLoad: true,
        remoteSort: false
    },

    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();

        if (me.destroyed) {
            return;
        }

        if (resultSet) {
            me.totalCount = resultSet.getTotal();
        }

        if (successful) {
            records = me.inflateRecords(records);
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
        } else {
            me.loading = false;
        }

        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
        me.callObservers('AfterLoad', [records, successful, operation]);
    },

    inflateRecords: function(records) {
        var inflatedRecords = [],
            i = 0;

        records.map(function(record){
            inflatedRecords.push(new Fiddle.model.Item({
                id: i,
                text: record.data
            }));
            i++;
        });

        return inflatedRecords;

    }
}, function() {
    fiddleStore = new Fiddle.Records({
        storeId: 'records',
        autoLoad: true
    });
});


