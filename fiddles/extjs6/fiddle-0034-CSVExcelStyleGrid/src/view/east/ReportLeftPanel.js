Ext.define('Fiddle.ReportLeftPanel', {
    extend: 'Ext.panel.Panel',
    reqires: [
        'Fiddle.ReportManager',
        'Fiddle.FilterCmds',
        'Fiddle.FiltersContainer'
    ],
    alias: 'widget.reportleftpanel',
    border: false,
    items: [{
        xtype: 'panel',
        hideCollapseTool: true,
        border: false,
        itemId: 'leftpanelcard',

        items: [{
            xtype: 'filterscontainer',
            reportId: 'a'
        }, {
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            xtype: 'filtercmds'
        }]
    }]
});
