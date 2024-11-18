Ext.define('Fiddle.BaseFilter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.basefilter',
    isBaseFilter: true,
    config: {
        layout: {
            type: 'fit',
            align: 'left'
        },
        bodyStyle: {
            background: '#3A4155'
        },
        reportId: '',
        reportFilterId: '',
        reportFilterField: '',
        reportFilterCriteria: []
    }
});
