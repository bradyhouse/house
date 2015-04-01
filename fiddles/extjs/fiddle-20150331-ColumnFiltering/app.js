Ext.onReady(function () {

    Ext.QuickTips.init();

    var fiddleHeader = 'Forkable Fiddle ~ A Buffered Data Grid',
        fiddleSubHeader = '<i>Datagrid populated with some ' +
            '<a href="http://www.json-generator.com/" title="json generator" target="_blank">generated json</a>.' +
            '  This one is for "forking" purposes.</i>',
        fiddleStore = null;


    Ext.define('App.Store', {
        extend: 'Ext.data.BufferedStore',
        config: {
            proxy: {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['_id', 'index', 'isActive',
                'checkingBalance', 'savingBalance',
                'picture', 'age', 'eyeColor',
                'name', 'gender', 'company',
                'email', 'address', 'about',
                'latitude', 'longitude'],
            pageSize: 500,
            trailingBufferZone: 20,
            leadingBufferZone: 281,
            autoLoad: true
        }
    }, function () {
        fiddleStore = Ext.create('App.Store', {
            storeId: 'myStore'
        });
    });

    Ext.define('App.GridPanel', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.app-grid-panel',
        loadMask: true,
        width: 700,
        height: 500,
        viewConfig: {
            preserveScrollOnRefresh: true
        },
        forceFit: true,
        columns: [
            {
                text: "Id",
                dataIndex: "index"
            },
            {
                text: "Name",
                dataIndex: "name",
                flex: 2
            },
            {
                text: "Age",
                dataIndex: "age",
                groupable: true,
                flex: 1
            },
            {
                text: "Checking",
                dataIndex: "checkingBalance",
                flex: 1
            },
            {
                text: "Savings",
                dataIndex: "savingsBalance",
                flex: 1
            },
            {
                text: "Member Since",
                dataIndex: "registered",
                groupable: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 1
            },
            {
                text: "Address",
                dataIndex: "address",
                flex: 2
            }
        ]
    });

    Ext.define('App.view.Main', {
        extend: 'Ext.panel.Panel',
        requires: ['Ext.layout.container.Accordion', 'App.GridPanel'],
        alias: 'widget.main',
        layout: {
            type: 'accordion',
            activeOnTop: true
        },
        items: [
            {
                xtype: 'app-grid-panel',
                title: '781 Records',
                store: fiddleStore,
                flex: 1

            }
        ]
    });


    // Boiler Plate
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: fiddleHeader,
            subheader: fiddleSubHeader
        }
    });
    Ext.define('App.Box', {
        extend: "Ext.container.Container",
        border: true,
        padding: 25,
        viewModel: {
            type: 'box'
        },
        items: [
            {
                xtype: 'panel',
                bind: {
                    title: '{header}'
                },
                items: [
                    {
                        xtype: 'panel',
                        padding: 10,
                        border: false,
                        bind: {
                            html: '{subheader}'
                        }
                    }
                ],
                region: 'north'
            },
            {
                type: 'panel',
                region: 'center',
                xtype: 'main'
            }
        ]
    });

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
