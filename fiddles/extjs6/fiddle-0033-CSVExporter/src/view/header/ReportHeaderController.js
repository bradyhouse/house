Ext.define('Fiddle.ReportHeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportheader',
    onSelectorChange: function (field, newValue, oldValue) {
         this.reconfigureReportGrid(newValue);
    },
    privates: {
        reconfigureReportFilters: function(reportId) {
            var reportFilters = Ext.ComponentQuery.query('filterscontainer')[0],
                newReportFilters = reportManager.filters(reportId),
                store = Ext.getStore('reportrecords'),
                index = 0,
                filter = null;
            reportFilters.items.each(function(item){
                item.destroy();
            });
            newReportFilters.map(function(filterName) {
                reportFilters.insert(index, Ext.create(filterName, {
                    reportId: reportId
                }));
                index++;
            });
        },
        reconfigureReportGrid: function(reportId) {
            var grid = Ext.ComponentQuery.query('reportgrid')[0];

            // Clear the grid columns
            grid.reconfigure(grid.getStore(), []);

            // Clear the grid rows
            fiddleStore.loadRecords([], {addRecords: false});

            // Load the alternate report and refresh the filters panel
            reportManager.load(reportId, function(json, schema, cols){
                fiddleStore.fields = schema;
                fiddleStore.setData(json.data);
                fiddleChainedStore = Ext.create('Ext.data.ChainedStore', {
                    source: 'reportrecords',
                    storeId: 'viewreportrecords'
                });
                grid.reconfigure(fiddleChainedStore, cols);
                this.reconfigureReportFilters(reportId);
            }, this, true);
        }
    }
});
