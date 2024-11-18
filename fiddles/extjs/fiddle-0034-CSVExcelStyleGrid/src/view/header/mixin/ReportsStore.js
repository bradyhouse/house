Ext.define('Fiddle.view.header.mixin.ReportsStore', {
    extend: 'Ext.Mixin',
    isReportsStore: true,
    mixinConfig: {
        id: 'reportsStore',
        after: {
            beforeInit: 'beforeInit'
        }
    },
    beforeInit: function() {
        this.listen({
            store: {
                reports: {
                    load: 'onStoreLoad'
                }
            }
        });
    },
    onStoreLoad: function(store) {
        var view = this.getView(),
            reportSelector = view.down('reportselector'),
            record = store.count() ? store.data.first() : null;
        if (reportSelector && record) {
            reportSelector.setValue(record);
        }
    }
});
