Ext.define('Fiddle.Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'index', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'company', type: 'string'},
        {name: 'eyeColor', type: 'string'},
        {name: 'registered', type: 'date', dateFormat: 'c'},
        {name: 'checkingBalance', type: 'float'},
        {name: 'savingsBalance', type: 'float'},
        {name: 'isActive', type: 'boolean'},
        {name: 'age', type: 'int'},
        {
            name: 'status',
            convert: function (val, rec) {
                return rec.data.isActive ? 'Active Customer' : 'In Active Customer';
            },
            depends: ['isActive']
        },
        {
            name: 'demo',
            convert: function (val, rec) {
                if (rec.data.age < 20) {
                    return 'teenager'
                }
                else if (rec.data.age >= 20 && rec.data.age < 24) {
                    return 'College Student'
                }
                else if (rec.data.age >= 24 && rec.data.age < 30) {
                    return 'Single Adult'
                }
                else if (rec.data.age >= 30 && rec.data.age < 50) {
                    return 'Married'
                }
                else if (rec.data.age >= 50 && rec.data.age < 60) {
                    return 'Retired'
                }

            },
            depends: ['age']
        }
    ]
});
