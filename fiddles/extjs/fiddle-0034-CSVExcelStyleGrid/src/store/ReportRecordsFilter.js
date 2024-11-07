Ext.define('Fiddle.ReportRecordsFilter', {
    extend: 'Ext.util.Filter',
    config: {
        criteria: '',
        field: '',
        filterFn: function (record) {
            var me = this;
            return Ext.Array.contains(me.getCriteria(), record.get(me.getField()));
        }
    }
});
