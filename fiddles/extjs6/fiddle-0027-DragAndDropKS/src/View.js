Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.view.Hospitals',
        'Fiddle.view.Patients'
    ],
    layout: 'border',
    items: [{
        title: 'Patients',
        region: 'west',
        width: 300,
        margin: '0 5 5 5',
        items: [{
            xtype: 'patientsview'
        }]
    }, {
        xtype: 'hospitalsview'
    }]
});

