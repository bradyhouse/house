var staticData = {
    data: [
        {
            "id": 0,
            "savingsBalance": "$666,485.12",
            "name": "Zimmerman Shelton"
        },
        {
            "id": 1,
            "savingsBalance": "$82,743.10",
            "name": "Sonya Morin"
        },
        {
            "id": 2,
            "savingsBalance": "$833,685.89",
            "name": "Paula Ayers"
        },
        {
            "id": 3,
            "savingsBalance": "$376,176.27",
            "name": "Anna Mcguire"
        },
        {
            "id": 4,
            "savingsBalance": "$171,351.11",
            "name": "Maryanne Santana"
        },
        {
            "id": 5,
            "savingsBalance": "$421,487.54",
            "name": "Morris Wood"
        },
        {
            "id": 6,
            "savingsBalance": "$130,369.04",
            "name": "Mccormick Faulkner"
        }
    ]
};

Ext.define('Fiddle.Record', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'savingsBalance', type: 'string'},
        {name: 'name', type: 'string'}
    ]
});

Ext.define('Fiddle.Store', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.Record'
    ],
    model: 'Fiddle.Record',
    data: staticData,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true,
    storeId: 'fiddleStore'
});
Ext.define('Fiddle.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fiddlegrid',
    requires: ['Fiddle.Store'],
    title: 'Click Any Cell',
    viewConfig: {
        enableLockable: true,
        height: window.innerHeight
    },
    columns: [
        {
            dataIndex: 'name',
            text: 'Column 0',
            locked: true
        },
        {
            dataIndex: 'savingsBalance',
            text: 'Column 1',
            locked: false
        }
    ],
    border: false,
    id: 'fiddleGrid',
    store: new Fiddle.Store(),
    listeners: {
        cellclick: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            Ext.Msg.alert('CellClick', 'Cell Index = ' + cellIndex);
        }
    }
});
Ext.onReady(function () {
    new Fiddle.Grid({
        renderTo: Ext.getBody()
    });
});
