Ext.define('Fiddle.Records', {
    extend: 'Ext.data.Store',
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: '_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sortInfo: {
            field: 'name',
            direction: 'ASC'
        },
        pageSize: 50,
        fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude'],
        autoLoad: true
    }
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
    // Create chained store
    Ext.create('Ext.data.ChainedStore', {
        source: 'records',
        storeId: 'viewrecords'
    });
});
Ext.define('Fiddle.FieldComboBox', {
    extend: 'Ext.panel.Panel',
    xtype: 'field-combo',
    listeners: {
        beforerender: 'onFieldSplitButtonBeforeRender'
    },
    items: [
        {
            xtype: 'splitbutton',
            text: 'field'
        }
    ]
});
Ext.define('Fiddle.GridFilterToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfiltertoolbar',
    onSearchComboChange: function (trigger) {
        console.log('onSearchComboChange');
        var me = this,
            toolbar = me.getView(),
            combo = toolbar.down('combo'),
            searchField = combo.valueField,
            window = toolbar.up('window'),
            grid = window.down('grid'),
            store = grid.getStore(),
            triggerValue = trigger.getValue();
        store.clearFilter();
        if (!Ext.isEmpty(triggerValue)) {
            try {
                store.filter({
                    filterFn: function (record) {
                        return triggerValue === record.get(searchField);
                    },
                    id: searchField + 'filter'
                });
            } catch (e) {
                combo.markInvalid('Invalid Search Criteria');
            }
        }
    },
    onSearchComboSelect: function (combo, record) {
        var recordField = combo.valueField,
            recordFieldValue = record.get(recordField);
        combo.setRawValue(recordFieldValue);
    },
    onFieldSplitButtonBeforeRender: function (panel) {
        var me = this,
            i = 0,
            gridColumn = null,
            menuItems = [],
            menuItem = null,
            splitButton = panel.down('splitbutton'),
            toolbar = me.getView(),
            window = toolbar.up('window'),
            grid = window.down('grid'),
            gridColumns = grid.query('gridcolumn'),
            gridColumnCount = gridColumns.length;
        for (; i < gridColumnCount; i++) {
            gridColumn = gridColumns[i];
            menuItem = new Ext.menu.CheckItem({
                text: gridColumn.text,
                checked: gridColumn.text === 'Name' ? true : false,
                group: 'fields',
                dataIndex: gridColumn.dataIndex,
                hideOnClick: true,
                checkHandler: me.onFieldMenuCheckChange,
                scope: me
            });
            menuItems.push(menuItem);
        }
        splitButton.setText('Name');
        splitButton.setMenu(Ext.create('Ext.menu.Menu', {
            items: menuItems,
            margin: '0 0 10 0'
        }));
    },
    onFieldMenuCheckChange: function (checkItem) {
        var me = this,
            toolbar = me.getView(),
            splitButton = toolbar.down('splitbutton'),
            comboBox = toolbar.down('combo'),
            picker = comboBox.getPicker(),
            selectionModel = picker.getSelectionModel(),
            fieldName = checkItem.dataIndex;
        splitButton.setText(checkItem.text);
        comboBox.valueField = fieldName;
        comboBox.displayField = fieldName;
        comboBox.displayTpl = me.buildNewComboBoxDisplayTpl(fieldName);
        picker.tpl = me.buildNewComboBoxPickerTpl(fieldName);
        picker.refresh();
        if (selectionModel && selectionModel.hasSelection()) {
            comboBox.setValue(selectionModel.getSelection()[0].get(fieldName));
        }
    },
    onSearchComboKeyUp: function (combo, event) {
        console.log('event');
        console.log(event);
        var value = combo.value;
        if (event.ENTER || event.TAB) {
            combo.setRawValue(value);
            combo.fireEvent('change', combo, value, null);
        }
    },
    onSearchComboClearClick: function (combo) {
        combo.setValue('');
    },
    // @private
    buildNewComboBoxPickerTpl: function (value) {
        return new Ext.XTemplate(
            '<tpl for=".">',
            '<li role="option" unselectable="on" class="x-boundlist-item"><h4>{' + value + '}</h4></li>',
            '</tpl>'
        );
    },
    // @private
    buildNewComboBoxDisplayTpl: function (value) {
        return new Ext.XTemplate(
            '<tpl for=".">' +
            '{[typeof values === "string" ? values : values["' + value + '"]]}' +
            '<tpl if="xindex < xcount">', '</tpl>' +
            '</tpl>'
        );
    }
});
Ext.define('Fiddle.GridFilterToolbar', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.GridFilterToolbarController',
        'Fiddle.FieldComboBox'
    ],
    xtype: 'grid-filter-toolbar',
    controller: 'gridfiltertoolbar',
    title: null,
    bodyPadding: 10,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    items: [
        {
            xtype: 'field-combo',
            border: false
        },
        {
            xtype: 'combo',
            store: 'records',
            displayField: 'name',
            valueField: 'name',
            typeAhead: true,
            minChars: 1,
            grow: true,
            flex: 2,
            typeAheadDelay: 100,
            triggers: {
                search: {
                    cls: 'x-form-clear-trigger',
                    handler: 'onSearchComboClearClick'
                }
            },
            listeners: {
                select: {
                    fn: 'onSearchComboSelect',
                    buffer: 250
                },
                change: {
                    fn: 'onSearchComboChange',
                    buffer: 250
                },
                keyup: {
                    fn: 'onSearchComboKeyUp'
                }
            },
            listConfig: {
                loadingText: 'Searching...',
                emptyText: 'No matching names found.',
                itemSelector: '.search-item',
                itemTpl: [
                    '<h4>{name}</h4>'
                ]
            }
        }]
});
Ext.onReady(function () {
    var fiddleHeader = 'Extreme Fiddle ~ Dynamic Field Filtering',
        fiddleSubHeader = 'Fiddle exploring (or exploiting) the logic exposed in the ' +
            '<b><a target="_blank" title="View Source" href="http://docs-origin.sencha.com/extjs/5.1/5.1.0-apidocs/source/Container3.html#Ext-grid-header-Container-method-getColumnMenu">' +
            'Ext.grid.header.Container > getColumnMenu</a></b> method. Specifically, ' +
            'this logic has been adapted (hacked) to create an external, column (or field) selection menu. ' +
            'Based on the user\'s selection in the field drop-down, ' +
            'a secondary filtering (or search) combo is dynamically reconfigured to point to the alternate field.' +
            '<br/><br/><i>Note - This fiddle also illustrates' +
            'the use of chained stores. The search combo is attached to a standard data store while the grid is bounded to a chained store ' +
            'copy. When the search criteria changes, a filtered is applied to the chained store leaving the original data store unaffected.  This means that ' +
            'the search drop-down list remains unaffected by the filter applied to the grid.</i>',
        filters = {
            ftype: 'filters',
            encode: false,
            local: true,
            filters: [
                {
                    type: 'numeric',
                    dataIndex: 'index'
                },
                {
                    type: 'string',
                    dataIndex: 'name'
                },
                {
                    type: 'numeric',
                    dataIndex: 'age'
                },
                {
                    type: 'numeric',
                    dataIndex: 'checkingBalance'
                },
                {
                    type: 'numeric',
                    dataIndex: 'savingsBalance'
                },
                {
                    type: 'date',
                    dataIndex: 'registered'
                },
                {
                    type: 'string',
                    dataIndex: 'address'
                }
            ]
        },
        topToolFactory = function () {
            return Ext.create('Fiddle.GridFilterToolbar');
        },
        pluginFactory = function () {
            return ['gridfilters', 'bufferedrenderer']
        },
        columnFactory = function (finish, start) {
            var columns = [
                {
                    dataIndex: 'index',
                    text: 'id',
                    filter: {
                        type: 'numeric'
                    },
                },
                {
                    dataIndex: 'name',
                    text: 'Name',
                    id: '_id',
                    filter: {
                        type: 'numeric'
                    },
                    flex: 1
                },
                {
                    dataIndex: 'age',
                    text: 'Age',
                    filter: {
                        type: 'numeric'
                    }
                },
                {
                    dataIndex: 'checkingBalance',
                    text: 'Checking',
                    filter: {}
                },
                {
                    dataIndex: 'savingsBalance',
                    text: 'Savings',
                    filter: {}
                },
                {
                    dataIndex: 'registered',
                    text: 'MemberSince',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    filter: {
                        type: 'date'
                    }
                },
                {
                    dataIndex: 'address',
                    text: 'Address',
                    filter: {
                        type: 'string'
                    },
                    flex: 1
                }
            ];
            return columns.slice(start || 0, finish);
        },
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: 'viewrecords',
            itemId: 'fiddle-grid',
            requires: [
                'Fiddle.CustomHeader'
            ],
            columns: columnFactory(7),
            loadMask: true,
            plugins: pluginFactory(),
            tbar: topToolFactory()
        }),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });

    win.show();

    // Boiler Plate
    Ext.QuickTips.init();
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
            }
        ]
    });
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});

