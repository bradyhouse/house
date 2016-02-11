Ext.define('Fiddle.view.header.mixin.ReportHeader', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'reportViewerHeader',
        after: {
            init: 'init'
        }
    },
    init: function() {
        this.listen({
            component: {
                'reportselector': {
                    change: 'onSelectorChange'
                }
            }
        });
    },
    onSelectorChange: function (field, newValue, oldValue) {
        this.reconfigureReportGrid(newValue);
    },
    privates: {
        inflateFieldFilters: function(id) {
            return new Fiddle.FieldsFilter({
                reportId: id
            });
        },
        reconfigureReportFilters: function(reportId) {
            var view = this.getView(),
                reportNavigation = view.up().down('reportviewernavigation'),
                reportFilters = view.up().down('filterscontainer'),
                newReportFilters = reportId ? this.inflateFieldFilters(reportId) : null;
            if (reportFilters) {
                reportFilters.items.each(function(item){
                    item.destroy();
                });
                reportFilters.setReportId(reportId);
            }
            if (reportId && newReportFilters) {
                reportFilters.insert(0, newReportFilters);
            }
            if (reportNavigation) {
                reportNavigation.setVisible((reportId ? true : false));
            }
        },
        reconfigureReportGrid: function(reportId) {
            var grid = Ext.ComponentQuery.query('reportgrid')[0];

            // Clear the grid columns
            grid.reconfigure(grid.getStore(), []);

            // Clear the grid rows
            fiddleStore.loadRecords([], {addRecords: false});

            // Load the alternate report and refresh the filters panel
            reportManager.loadReportData(reportId, function(json, schema, cols){
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
