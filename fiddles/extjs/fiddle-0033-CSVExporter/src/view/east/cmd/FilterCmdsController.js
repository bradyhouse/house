Ext.define('Fiddle.FilterCmdsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.filtercmds',
    onResetButtonClick: function() {
        var fieldsfilter = Ext.ComponentQuery.query('fieldsfilter')[0];
        if (fieldsfilter) {
            fieldsfilter.resetFilters();
        }
    }
});
