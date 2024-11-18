Ext.define('Fiddle.FieldsFilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fieldsfilter',
    onTagValueChange: function (field, newValue, oldValue) {
        var view = field.up('panel'),
            filterId = view.getReportFilterId(),
            filterField = view.getReportFilterField(),
            filterCriteria = view.getReportFilterCriteria(),
            filterConfig = {
                id: filterId,
                field: filterField,
                criteria: newValue
            }
            store = Ext.getStore('reportrecords');
        view.setReportFilterCriteria(newValue);
        if (newValue.length > 0) {
            store.addReportRecordsFilter(filterConfig, 'viewreportrecords');
        } else {
            store.clearReportRecordsFilter(filterId, 'viewreportrecords');
        }
    }
});
