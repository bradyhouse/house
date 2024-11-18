Ext.define('Fiddle.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dummypanel',
    collapsible: true,
    tools: [{
        type: 'restore',
        tooltip: 'restore'
    }],
    height: 200,
    html: ''
});
