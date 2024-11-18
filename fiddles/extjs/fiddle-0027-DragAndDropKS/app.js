var meta = {
    fiddleHeader: 'DragAndDrop KS',
    fiddleSubHeader: 'Fiddle adapted from the Kitchen sink drag and drop example.' +
        '<br />'
};

var patientStore = null,
    hospitalStore = null;

function initializePatientDragZone(v) {
    v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

        //      On receipt of a mousedown event, see if it is within a draggable element.
        //      Return a drag data object if so. The data object can contain arbitrary application
        //      data, but it should also contain a DOM element in the ddel property to provide
        //      a proxy to drag.
        getDragData: function(e) {
            var sourceEl = e.getTarget(v.itemSelector, 10),
                d;
            if (sourceEl) {
                d = sourceEl.cloneNode(true);
                d.id = Ext.id();
                return (v.dragData = {
                    sourceEl: sourceEl,
                    repairXY: Ext.fly(sourceEl).getXY(),
                    ddel: d,
                    patientData: v.getRecord(sourceEl).data
                });
            }
        },

        //      Provide coordinates for the proxy to slide back to on failed drag.
        //      This is the original XY coordinates of the draggable element.
        getRepairXY: function() {
            return this.dragData.repairXY;
        }
    });
}

function initializeHospitalDropZone(v) {
    var gridView = v,
        grid = gridView.up('gridpanel');

    function getHospitalFromTarget(target) {
        var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
            mainRow = rowBody.previousSibling;

        return gridView.getRecord(mainRow);
    }

    function allowPatient(hospital, name) {
        var patients = hospital.get('patients');
        return !patients || patients.indexOf(name) === -1;
    }

    grid.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

        //      If the mouse is over a target node, return that node. This is
        //      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
        getTargetFromEvent: function(e) {
            return e.getTarget('.hospital-target');
        },

        //      On entry into a target node, highlight that node.
        onNodeEnter: function(target, dd, e, data) {
            Ext.fly(target).addCls('hospital-target-hover');
        },

        //      On exit from a target node, unhighlight that node.
        onNodeOut: function(target, dd, e, data) {
            Ext.fly(target).removeCls('hospital-target-hover');
        },

        //      While over a target node, return the default drop allowed class which
        //      places a "tick" icon into the drag proxy.
        onNodeOver: function(target, dd, e, data) {
            var hospital = getHospitalFromTarget(target),
                name = data.patientData.name,
                proto = Ext.dd.DropZone.prototype;

            return allowPatient(hospital, name) ? proto.dropAllowed : proto.dropNotAllowed;
        },

        //      On node drop, we can interrogate the target node to find the underlying
        //      application object that is the real target of the dragged data.
        //      In this case, it is a Record in the GridPanel's Store.
        //      We can use the data set up by the DragZone's getDragData method to read
        //      any data we decided to attach.
        onNodeDrop: function(target, dd, e, data) {
            var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
                mainRow = rowBody.previousSibling,
                hospital = gridView.getRecord(mainRow),
                targetEl = Ext.get(target),
                html = targetEl.dom.innerHTML,
                patients = hospital.get('patients'),
                name = data.patientData.name;

            if (allowPatient(hospital, name)) {
                if (!patients) {
                    patients = [];
                    hospital.set('patients', patients);
                }
                patients.push(name);
                html = patients.join(', ');
                targetEl.update(html);
                Ext.Msg.alert('Drop gesture', 'Dropped patient ' + name +
                    ' on hospital ' + hospital.get('name'));

                return true;
            }
            return false;
        }
    });
}





Ext.define('Fiddle.model.Patient', {
    extend: 'Ext.data.Model',
    idProperty: 'insuranceCode',
    fields: ['name', 'address', 'telephone']
});


Ext.define('Fiddle.model.Hospital', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: ['name', 'address', 'telephone', 'patients']
});


Ext.define('Fiddle.store.Patients', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Patient'
    ],
    config: {
        model: 'Fiddle.model.Patient',
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'patients.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        remoteSort: false,
        autoLoad: true
    }
}, function() {
    patientStore = Ext.create('Fiddle.store.Patients', {
        storeId: 'patients'
    });
});


Ext.define('Fiddle.store.Hospitals', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Hospital'
    ],
    config: {
        model: 'Fiddle.model.Hospital',
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'hospitals.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        remoteSort: false,
        autoLoad: true
    }
}, function() {
    hospitalStore = Ext.create('Fiddle.store.Hospitals', {
        storeId: 'hospitals'
    });
});


Ext.define('Fiddle.view.Hospitals', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hospitalsview',
    title: 'Hospitals',
    region: 'center',
    margin: '0 5 5 0',
    bbar: [{
        text: 'View Source',
        handler: function() {
            helpWindow.show();
        }
    }],
    sortableColumns: false,
    columns: [{
        dataIndex: 'name',
        header: 'Name',
        width: 200
    }, {
        dataIndex: 'address',
        header: 'Address',
        width: 300
    }, {
        dataIndex: 'telephone',
        header: 'Telephone',
        width: 100
    }],
    features: [{
        ftype: 'rowbody',
        setup: function(rows, rowValues) {
            Ext.grid.feature.RowBody.prototype.setup.apply(this, arguments);
            rowValues.rowBodyDivCls = 'hospital-target';
        },
        getAdditionalData: function(data) {
            var patients = data.patients,
                html;
            if (patients) {
                html = patients.join(', ');
            } else {
                html = 'Drop patients here';
            }
            return {
                rowBody: html
            };
        }
    }],
    viewConfig: {
        listeners: {
            render: initializeHospitalDropZone
        }
    },
    store: hospitalStore
});


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

// Boiler plate
Ext.define('App.BoxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.box',
    data: {
        header: meta.fiddleHeader,
        subheader: meta.fiddleSubHeader
    }
});
Ext.define('App.Box', {
    extend: "Ext.container.Container",
    border: true,
    padding: 25,
    viewModel: {
        type: 'box'
    },
    items: [{
        xtype: 'panel',
        bind: {
            title: '{header}'
        },
        items: [{
            xtype: 'panel',
            padding: 10,
            border: false,
            bind: {
                html: '{subheader}'
            }
        }],
        region: 'north'
    }]
});
Ext.onReady(function() {
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            maximizable: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 192;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    window.setTimeout(function() {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
