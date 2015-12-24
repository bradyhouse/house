Ext.define('Fiddle.ReportLeftPanel', {
    extend: 'Ext.panel.Panel',
    reqires: [
        'Fiddle.ReportManager',
        'Fiddle.FilterCmds',
        'Fiddle.FiltersContainer'
    ],
    alias: 'widget.reportleftpanel',
    layout: {
        type: 'fit'
        //animate: true,
        //activeOnTop: true
    },
    border: true,
    bodyStyle: {
        background: '#3A4155'
    },
    items: [{
        xtype: 'panel',
        hideCollapseTool: true,
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

    /**/
});
