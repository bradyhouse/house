Ext.define('Fiddle.CustomMenuTitle', {
    extend: 'Ext.panel.Title',
    xtype: 'custom-menu-title',
    border: null,
    style: {
        background: '#638BB5',
        color: '#FFFFFF',
        padding: '5px'
    },
    text: '<b>Filter</b>',
    layout: {
        align: 'left'
    },
    flex: 1
});
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
    bodyStyle: {
        background: '#C0C0C0',
    },
    border: false,
    listeners: {
        beforerender: 'onFieldSplitButtonBeforeRender'
    },
    items: [
        {
            xtype: 'splitbutton',
            text: 'field'
        }
    ],
    init: function (obj) {
        try {
            console.log(this);
        } catch (e) {
            console.log(e);
        }
    }
});
Ext.define('Fiddle.FilterPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.FieldComboBox'
    ],
    xtype: 'grid-filter-panel',
    title: null,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    border: null,
    style: {
        marginTop: '-1px'
    },
    items: [
        {
            xtype: 'field-combo',
            border: false
        },
        {
            xtype: 'combo',
            store: 'records',
            bind: {
                value: '{defaultSearchCriteria}'
            },
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
                },
                render: {
                    fn: 'onSearchComboRender'
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
Ext.define('Fiddle.CustomMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.custommenu',
    onMenuCloseButtonClick: function (tool) {
        var view = this.getView();
        view.hide();
    },
    onAscendingClick: function (ctrl) {
        this.sortViewRecords('ASC');
        this.sortRecords('ASC');
    },
    onDescendingClick: function (ctrl) {
        this.sortViewRecords('DESC');
        this.sortRecords('DESC');
    },
    onApplyFilterClick: function (ctrl) {
        console.log('onSearchComboChange');
        var me = this,
            toolbar = me.getView(),
            combo = toolbar.down('combo'),
            searchField = combo.valueField,
            store = Ext.getStore('viewrecords'),
            triggerValue = combo.value;
        if (!Ext.isEmpty(triggerValue)) {
            store.clearFilter();
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
            if (store.getCount() > 0) {
                toolbar.hide();
            } else {
                store.clearFilter();
                combo.markInvalid('No matches found');
            }
        } else {
            combo.markInvalid('Invalid Search Criteria');
        }
    },
    onClearFilterClick: function (ctrl) {
        var me = this,
            menu = me.getView(),
            grid = menu.targetGrid,
            store = grid.getStore();
        if (store) {
            store.clearFilter();
            me.sortRecords('DESC');
        }
        menu.hide();
    },
    onSearchComboChange: function (trigger) {

    },
    onSearchComboSelect: function (combo, record) {
        var recordField = combo.valueField,
            recordFieldValue = record.get(recordField);
        combo.setRawValue(recordFieldValue);
    },
    onSearchComboRender: function(combo) {
        var me = this,
            menu = me.getView(),
            model = menu.viewModel,
            picker = combo.getPicker(),
            displayField = model.get('defaultDisplayField'),
            valueField = model.get('defaultValueField'),
            selectionModel = picker.getSelectionModel();
        if (menu.viewModel.get('update')) {
            combo.valueField = valueField;
            combo.displayField = displayField;
            combo.displayTpl = me.buildNewComboBoxDisplayTpl(displayField);
            picker.tpl = me.buildNewComboBoxPickerTpl(valueField);
            picker.refresh();
            if (selectionModel && selectionModel.hasSelection()) {
                combo.setValue(selectionModel.getSelection()[0].get(valueField));
            }
        }
    },
    onFieldSplitButtonBeforeRender: function (ctrl) {
        var me = this,
            i = 0,
            gridColumn = null,
            menuItems = [],
            menuItem = null,
            customMenu = me.getView(),
            splitButton = ctrl.down('splitbutton'),
            grid = customMenu.targetGrid,
            gridColumns = grid.query('gridcolumn'),
            gridColumnCount = gridColumns.length,
            selectedColumnIndex = customMenu.targetColumnIndex < gridColumnCount ? customMenu.targetColumnIndex : 1,
            displayText = gridColumns[selectedColumnIndex].text;
        for (; i < gridColumnCount; i++) {
            gridColumn = gridColumns[i];
            menuItem = new Ext.menu.CheckItem({
                text: gridColumn.text,
                checked: i === selectedColumnIndex ? true : false,
                group: 'fields',
                dataIndex: gridColumn.dataIndex,
                hideOnClick: true,
                checkHandler: me.onFieldMenuCheckChange,
                scope: me
            });
            menuItems.push(menuItem);
        }
        splitButton.setText(displayText);
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
    },
    // @private
    sortViewRecords: function (direction) {
        var me = this,
            store = Ext.getStore('viewrecords'),
            toolbar = me.getView(),
            comboBox = toolbar.down('combo'),
            field = comboBox.valueField;
        if (store) {
            store.sort(field, direction);
        }
    },
    // @private
    sortRecords: function (direction) {
        var me = this,
            store = Ext.getStore('records'),
            toolbar = me.getView(),
            comboBox = toolbar.down('combo'),
            field = comboBox.valueField;
        if (store) {
            store.sort(field, direction);
        }
    }
});
Ext.define('Fiddle.CustomMenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.custommenu',
    data: {
        update: false,
        defaultSearchCriteria: '',
        defaultValueField: 'name',
        defaultDisplayField: 'name'
    }
});
Ext.define('Fiddle.CustomMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'custom-menu',
    requires: [
        'Fiddle.CustomMenuTitle',
        'Fiddle.FilterPanel',
        'Fiddle.CustomMenuController',
        'Fiddle.CustomMenuModel'
    ],
    config: {
        targetGrid: null,
        targetColumnIndex: 1
    },
    title: Ext.create('Fiddle.CustomMenuTitle'),
    controller: 'custommenu',
    viewModel: {
        type: 'custommenu'
    },
    tools: [{
        type: 'close',
        tooltip: 'Close',
        handler: 'onMenuCloseButtonClick',
        style: {
            background: '#638BB5',
            color: '#FFFFFF',
            marginLeft: '-1px',
            marginBottom: '-1px',
            padding: '5px'
        },
        border: null
    }],
    bodyStyle: {
        background: '#C0C0C0',
        margin: '0px'
    },
    showSeparator: true,
    plain: true,
    items: [
        {
            xtype: 'grid-filter-panel',
            bodyStyle: {
                background: '#C0C0C0',
                paddingTop: '5px',
                paddingBottom: '5px'
            }
        },
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'right'
            },
            border: null,
            bodyStyle: {
                background: '#C0C0C0',
                paddingTop: '5px',
                paddingBottom: '5px'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'ASC',
                    toolTip: 'Sort Ascending',
                    handler: 'onAscendingClick',
                    flex: 1

                },
                {
                    xtype: 'button',
                    text: 'DESC',
                    toolTip: 'Sort Descending',
                    handler: 'onDescendingClick',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    toolTip: 'Clear Filter',
                    flex: 1,
                    handler: 'onClearFilterClick'
                },
                {
                    xtype: 'button',
                    text: 'Apply',
                    toolTip: 'Filter the Grid',
                    flex: 1,
                    handler: 'onApplyFilterClick'
                }
            ]
        }
    ]
});
Ext.define('Fiddle.Plugin', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.fiddleplugin',
    requires: [
        'Fiddle.CustomMenu'
    ],
    init: function (parent) {
        parent.on({
            cellclick: function (panel, td, cellIndex, record, tr, rowIndex) {
                var innerDiv = td.getElementsByClassName('x-grid-cell-inner'),
                    innerHtml = innerDiv[0].innerHTML,
                    grid = panel.ownerGrid,
                    gridColumns = grid.query('gridcolumn'),
                    column = gridColumns[cellIndex];
                panel.lastColumnIndex = cellIndex;
                panel.lastCellValue = innerHtml;
                panel.lastColumnName = column.dataIndex;
            },
            itemcontextmenu: function (panel, record, item, index, event) {
                var defaultCriteria = panel.lastCellValue,
                    defaultField = panel.lastColumnName,
                    defaultValue = panel.lastColumnName,
                    menu = new Fiddle.CustomMenu({
                        targetGrid: parent,
                        targetColumnIndex: panel.lastColumnIndex
                    });
                event.preventDefault();
                if (!Ext.isEmpty(defaultCriteria)) {
                    menu.getViewModel().setData({
                        update: true,
                        defaultValueField: defaultField,
                        defaultDisplayField: defaultField,
                        defaultSearchCriteria: defaultCriteria
                    });
                }
                menu.showAt(event.getXY());
                console.log(event.getXY());
            }
        });
    }
});

Ext.onReady(function () {
    var fiddleHeader = 'Extreme Fiddle ~ Grid Type-Ahead Filter Plugin',
        fiddleSubHeader = 'Fiddle exploring how to create a grid filtering plug-in that provides type-ahead suggestions. <br />' +
            '<br />'+
            '<b>To test:</b><br/>'+
            '<ul><li>In default Mode, simply right-click on any cell in the grid</li>' +
            '<li>In Pre-populated mode, select a cell and then right-click</li></ul>',
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
        pluginFactory = function () {
            return ['gridfilters', 'bufferedrenderer', {
                ptype: 'fiddleplugin'
            }]
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
                'Fiddle.CustomMenu'
            ],
            lastColumnIndex: 1,
            lastCellValue: '',
            lastColumnName: 'name',
            columns: columnFactory(7),
            loadMask: true,
            plugins: pluginFactory()
        }),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        }),
        positionX = 25,
        positionY = 192;

    win.showAt([positionX, positionY]);

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

