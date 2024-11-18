
Ext.define('Fiddle.view.Patients', {
    extend: 'Ext.view.View',
    alias: 'widget.patientsview',
    cls: 'patient-view',
    tpl: '<tpl for=".">' +
    '<div class="patient-source"><table><tbody>' +
    '<tr><td class="patient-label">Name</td><td class="patient-name">{name}</td></tr>' +
    '<tr><td class="patient-label">Address</td><td class="patient-name">{address}</td></tr>' +
    '<tr><td class="patient-label">Telephone</td><td class="patient-name">{telephone}</td></tr>' +
    '</tbody></table></div>' +
    '</tpl>',
    itemSelector: 'div.patient-source',
    overItemCls: 'patient-over',
    selectedItemClass: 'patient-selected',
    singleSelect: true,
    store: patientStore,
    listeners: {
        render: initializePatientDragZone
    }
});


