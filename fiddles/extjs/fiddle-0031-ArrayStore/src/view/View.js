
Ext.define('Fiddle.view.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.view.selector.ItemSelector',
        'Fiddle.view.Controller'
    ],
    controller: 'fiddlecontroller',
    items: [{
        xtype: 'itemselector'
    }]
});

