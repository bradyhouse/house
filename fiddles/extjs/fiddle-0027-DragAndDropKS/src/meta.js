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
        getDragData: function (e) {
            var sourceEl = e.getTarget(v.itemSelector, 10), d;
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
        getRepairXY: function () {
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
        getTargetFromEvent: function (e) {
            return e.getTarget('.hospital-target');
        },

//      On entry into a target node, highlight that node.
        onNodeEnter: function (target, dd, e, data) {
            Ext.fly(target).addCls('hospital-target-hover');
        },

//      On exit from a target node, unhighlight that node.
        onNodeOut: function (target, dd, e, data) {
            Ext.fly(target).removeCls('hospital-target-hover');
        },

//      While over a target node, return the default drop allowed class which
//      places a "tick" icon into the drag proxy.
        onNodeOver: function (target, dd, e, data) {
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
        onNodeDrop: function (target, dd, e, data) {
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



