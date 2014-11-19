Ext.onReady(function () {
    Ext.define('App.MyPlugin', {
        extend: 'Ext.plugin.Abstract',
        alias: 'plugin.myplugin',
        init: function(parent) {
            parent.on({
                itemcontextmenu: function (panel, record, item, index, event) {
                    event.preventDefault();
                    new Ext.menu.Menu({
                        items: [{
                            iconCls: 'clsMenuItemExcelExport',
                            text: 'Export to Excel ... '
                        }],
                        listeners: {
                            click: function (menu, item) {
                                parent.fireEvent('excelexport');
                            }
                        }
                    }).showAt(event.getXY());
                }
            });
        }
    });
    Ext.define('App.MyGridPanelController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mygridpanel',
        onExcelExport: function () {
            window.location = 'http://houseknecht.com/2014/labs/xlsx/ExcelExportFile.xlsx';
        }

    });
    Ext.define('App.Store', {
        extend: 'Ext.data.Store',
        constructor: function (config) {
            var me = this,
                cfg = config || {};
            cfg.proxy = me.getStoreProxy();
            cfg.fields = me.getStoreFields();
            me.callParent([cfg]);
        },
        getStoreFields: function () {
            return [{
                name: "employeeNo"
            }, {
                name: "rating",
                type: "int"
            }, {
                name: "salary",
                type: "float"
            }, {
                name: "forename"
            }, {
                name: "surname"
            }, {
                name: "name",
                convert: function(a, b) {
                    return b.editing ? a : b.get("forename") + " " + b.get("surname")
                }
            }, {
                name: "email"
            }, {
                name: "department"
            }, {
                name: "dob",
                type: "date",
                dateFormat: "Ymd"
            }, {
                name: "joinDate",
                type: "date",
                dateFormat: "Ymd"
            }, {
                name: "noticePeriod"
            }, {
                name: "sickDays",
                type: "int"
            }, {
                name: "holidayDays",
                type: "int"
            }, {
                name: "holidayAllowance",
                type: "int"
            }, {
                name: "avatar"
            }];
        },
        getStoreProxy: function () {
            return {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json'
                }
            };
        }
    });

    Ext.define('App.MyGridPanel', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.mygridpanel',
        requires: [
            'App.MyGridPanelController',
            'App.MyPlugin'
        ],
        title: 'Fiddle ~ Grid Context Menu Plugin',
        plugins: [{
            ptype: 'myplugin'
        }],
        controller:  'mygridpanel',
        listeners: {
            excelexport: 'onExcelExport'
        },
        columns: [{
            xtype: 'rownumberer',
            sortable: false,
            flex:.05
        }, {
        text: 'Id',
            sortable: true,
            dataIndex: 'employeeNo',
            groupable: false,
    }, {
        text: 'Name',
            sortable: true,
            dataIndex: 'name',
            groupable: false,
            flex:.5

    }, {
            text: 'Dept',
            sortable: true,
            dataIndex: 'department',
            groupable: false,
            flex: 1

        }],
        initComponent: function () {
            this.title += '&nbsp;&nbsp;(ExtJS Version ' + Ext.getVersion().getMajor() + '.' + Ext.getVersion().getMinor() + '.' + Ext.getVersion().getPatch() + '.' + Ext.getVersion().getBuild() + ')</span>';
            this.callParent();
        }
    });

    Ext.create('App.Store', {
        storeId: 'myStore'
    });

    var myStore = Ext.getStore('myStore');
    myStore.load();
    Ext.create('App.MyGridPanel', {
        store: myStore,
        renderTo: Ext.getBody()
    });
});
