Ext.define('Fiddle.view.Hospitals', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hospitalsview',
    title: 'Hospitals',
    region: 'center',
    margin: '0 5 5 0',
    bbar: [{
        text: 'View Source',
        handler: function () {
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
        setup: function (rows, rowValues) {
            Ext.grid.feature.RowBody.prototype.setup.apply(this, arguments);
            rowValues.rowBodyDivCls = 'hospital-target';
        },
        getAdditionalData: function (data) {
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

