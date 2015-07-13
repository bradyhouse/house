var meta = {
    fiddleHeader: 'Extreme Fiddle ~ Grid Item Context Tag Filter Plugin',
    fiddleSubHeader: 'Fiddle exploring how to create a grid item context menu that provides type-ahead, "tag style" filtering using a secondary mixin class. <br />' +
    '<br />' +
    '<b>To test:</b><br/>' +
    '<ul><li>In default Mode, simply right-click on any cell in the grid</li>' +
    '<li>To enter Pre-populated mode, select a cell and then right-click</li>' +
    '<li>To filter the grid, click the [apply] button.  This will sort the grid in ASC order and save filter criteria</li>' +
    '<li>To remove the filter and clear the criteria click [clear]</li>' +
    '<li>To sort the grid and criteria suggestion list, click the [ASC] or [DESC] buttons</li></ul>',
    recordsUrl: 'data.json'
};

Ext.define('Fiddle.Records', {
    extend: 'Ext.data.Store',
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: meta.recordsUrl,
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
            direction: 'DESC'
        },
        pageSize: 50,
        fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude'],
        autoLoad: true
    }
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
    Ext.create('Ext.data.ChainedStore', {
        source: 'records',
        storeId: 'viewrecords'
    });
});
Ext.define('Fiddle.ViewRecordsFilter', {
    extend: 'Ext.util.Filter',
    config: {
        criteria: '',
        field: '',
        filterFn: function (record) {
            var me = this;
            return Ext.Array.contains(me.getCriteria(), record.get(me.getField()));
        }
    }
});
Ext.define('Fiddle.CustomMenuTitle', {
    extend: 'Ext.panel.Title',
    xtype: 'custom-menu-title',
    config: {
        border: null,
        cls: 'custom-menu-title',
        text: '<b>Filter</b>',
        layout: {
            align: 'left'
        },
        style: {
            padding: '5px'
        },
        flex: 1
    }
});
Ext.define('Fiddle.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'fiddle-panel',
    title: null,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    border: null,
    items: [
        {
            xtype: 'splitbutton',
            border: true,
            listeners: {
                beforerender: 'onFieldSplitButtonBeforeRender'
            },
            text: 'field'
        }, {
            xtype: 'tagfield',
            border: null,
            displayField: 'name',
            valueField: 'name',
            typeAhead: true,
            minChars: 1,
            grow: true,
            collapseOnSelect: true,
            flex: 2,
            typeAheadDelay: 100,
            hideTriggers: true,
            listeners: {
                render: 'onSearchComboRender'
            },
            bind: {
                value: '{defaultTagValue}',
                store: '{records}'
            },
            listConfig: {
                loadingText: 'Searching...',
                emptyText: 'No matching names found.',
                itemSelector: '.search-item',
                itemTpl: [ '<tpl exec="this.group = []"></tpl>',
                    '<ul class="x-list-plain">',
                    '<tpl for=".">',
                    '<tpl if="Ext.Array.indexOf(this.group, values.name) != -1">',
                    '<li role="option" unselectable="on" class="x-boundlist-item" style="display: none">',
                    '{name}',
                    '</li>',
                    '</tpl>',
                    '<tpl if="Ext.Array.indexOf(this.group, values.name) == -1">',
                    '<tpl exec="this.group.push(values.name)"></tpl>',
                    '<li role="option" unselectable="on" class="x-boundlist-item">',
                    '{name}',
                    '</li>',
                    '</tpl>',
                    '</tpl>',
                    '</ul>']
            }
        }]
});
Ext.define('Fiddle.CustomMenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.custommenu',
    config: {
        data: {
            update: false,
            defaultTagValue: '',
            defaultValueField: 'name',
            defaultDisplayField: 'name'
        },
        stores: {
            records: Ext.getStore('records')
        }
    }
});
Ext.define('Fiddle.CustomMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.custommenu',
    requires: [
        'Fiddle.ViewRecordsFilter'
    ],
    onFieldSplitButtonBeforeRender: function (ctrl) {
        var me = this,
            i = 0,
            gridColumn = null,
            menuItems = [],
            menuItem = null,
            customMenu = me.getView(),
            splitButton = ctrl,
            grid = customMenu.getTargetGrid(),
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
    onSearchComboSelect: function (combo, record) {
        var recordField = combo.valueField,
            recordFieldValue = record.get(recordField);
        combo.setRawValue(recordFieldValue);
    },
    onFieldMenuCheckChange: function (checkItem) {
        var me = this,
            menu = me.getView(),
            splitButton = menu.down('splitbutton'),
            comboBox = menu.down('tagfield'),
            picker = comboBox.getPicker(),
            selectionModel = comboBox.pickerSelectionModel,
            fieldName = checkItem.dataIndex;
        splitButton.setText(checkItem.text);
        comboBox.valueField = fieldName;
        comboBox.displayField = fieldName;
        comboBox.labelTpl = me.buildNewComboBoxLabelTpl(fieldName);
        comboBox.displayTpl = me.buildNewComboBoxDisplayTpl(fieldName);
        picker.tpl = me.buildNewComboBoxPickerTpl(fieldName);
        picker.displayField = fieldName;
        picker.refresh();
        if (selectionModel && selectionModel.hasSelection()) {
            comboBox.setValue(selectionModel.getSelection()[0].get(fieldName));
        }
    },
    onSearchComboClearClick: function (combo) {
        combo.setValue('');
    },
    onSearchComboKeyUp: function (combo, event) {
        var value = combo
        if (event.ENTER || event.TAB) {
            combo.setRawValue(value);
            combo.fireEvent('change', combo, value, null);
        }
    },
    onMenuCloseButtonClick: function () {
        this.closeMenu();
    },
    onAscendingClick: function () {
        var view = this.getView();
        this.sortViewRecords(view, 'ASC');
        this.sortRecords(view, 'ASC');
    },
    onDescendingClick: function () {
        var me = this,
            menu = this.getView();
        me.sortViewRecords(menu, 'DESC');
        me.sortRecords(menu, 'DESC');
    },
    onApplyFilterClick: function (ctrl) {
        var me = this,
            menu = me.getView(),
            combo = menu.down('tagfield'),
            searchField = combo.valueField,
            store = Ext.getStore('viewrecords'),
            triggerValue = combo.value,
            filterConfig = {
                id: 'fiddle-filter',
                criteria: triggerValue,
                field: searchField
            },
            fiddleFilter = Ext.create('Fiddle.ViewRecordsFilter', filterConfig);

        if (!Ext.isEmpty(triggerValue)) {
            store.removeFilter('fiddle-filter');
            try {
                store.addFilter(fiddleFilter);
                menu.getTargetGrid().setCustomMenu(menu);
                me.sortViewRecords(menu, "ASC");
                me.closeMenu();
            } catch (e) {
                combo.markInvalid('Invalid Search Criteria');
            }
            if (store.getCount() === 0) {
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
            grid = menu.getTargetGrid(),
            store = grid.getStore();
        if (store) {
            store.removeFilter('fiddle-filter');
            me.sortRecords(menu, 'DESC');
        }
        grid.setCustomMenu(null);
        me.closeMenu();
    },
    onSearchComboRender: function (combo) {
        var me = this,
            menu = me.getView(),
            model = menu.viewModel,
            picker = combo.getPicker(),
            displayField = model.get('defaultDisplayField'),
            valueField = model.get('defaultValueField'),
            selectionModel = picker.getSelectionModel();
        if (menu.viewModel.get('update')) {
            combo.valueField = valueField;
            combo.displayField = valueField;
            combo.displayTpl = me.buildNewComboBoxDisplayTpl(displayField);
            picker.tpl = me.buildNewComboBoxPickerTpl(valueField);
            picker.refresh();
            if (selectionModel && selectionModel.hasSelection()) {
                combo.setValue(selectionModel.getSelection()[0].get(valueField));
            }
        }
    },
    // @private
    buildNewComboBoxLabelTpl: function (value) {
        return Ext.create('Ext.XTemplate', '<tpl for=".">', '<div class="x-boundlist-item">{' + value + '}</div>', '</tpl>');
    },
    // @private
    buildNewComboBoxDisplayTpl: function (value) {
        return Ext.create('Ext.XTemplate', '<tpl for=".">', '{' + value + '}  - {' + value + '}', '</tpl>');
    },
    // @private
    buildNewComboBoxPickerTpl: function (value) {
        return new Ext.XTemplate(
            '<tpl exec="this.group = []"></tpl>'+
                '<ul class="x-list-plain">'+
                '<tpl for=".">'+
                '<tpl if="Ext.Array.indexOf(this.group, values.' + value + ') != -1">'+
                '<li role="option" unselectable="on" class="x-boundlist-item" style="display: none">'+
                '{' + value + '}'+
                '</li>' +
                '</tpl>' +
                '<tpl if="Ext.Array.indexOf(this.group, values.' + value +') == -1">' +
                '<tpl exec="this.group.push(values.' + value + ')"></tpl>' +
                '<li role="option" unselectable="on" class="x-boundlist-item">' +
                '{' + value + '}' +
                '</li>'+
                '</tpl>' +
                '</tpl>'+
                '</ul>', {
                format: function(length) {
                    return Ext.util.Format.number(length / 1000, '0.00');
                }
            }
        );
    },
    // @private
    sortViewRecords: function (menu, direction) {
        var me = this,
            store = Ext.getStore('viewrecords'),
            filterPanel = menu.down('fiddle-panel'),
            comboBox = filterPanel.down('tagfield'),
            field = comboBox.valueField;
        if (store) {
            store.sort(field, direction);

        }
    },
    // @private
    sortRecords: function (menu, direction) {
        var me = this,
            store = Ext.getStore('records'),
            comboBox = menu.down('tagfield'),
            field = comboBox.valueField;
        if (store) {
            store.sort(field, direction);
        }
    },
    // @private
    closeMenu: function () {
        var view = this.getView();
        view.hide();
    }
});
Ext.define('Fiddle.CustomMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'custom-menu',
    requires: [
        'Fiddle.CustomMenuTitle',
        'Fiddle.Panel',
        'Fiddle.CustomMenuController',
        'Fiddle.CustomMenuModel'
    ],
    config: {
        width: 300,
        targetGrid: null,
        targetColumnIndex: 1,
        title: Ext.create('Fiddle.CustomMenuTitle'),
        tools: [{
            type: 'close',
            tooltip: 'Close',
            handler: 'onMenuCloseButtonClick',
            cls: 'custom-menu-title-close-btn',
            border: null
        }],
        bodyStyle: {
            background: '#C0C0C0',
            margin: '0px'
        },
        showSeparator: true,
        plain: true,
        controller: 'custommenu',
        viewModel: {
            type: 'custommenu'
        },
        items: [
            {
                xtype: 'fiddle-panel',
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
    }
});
Ext.define('Fiddle.Mixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'fiddlemixin',
        after: {
            constructor: 'onAfterConstructor'
        }
    },
    onAfterConstructor: function () {
        var me = this;
        me.on({
            cellclick: me.onCellClick,
            itemcontextmenu: me.onItemContextMenu
        });
    },
    onCellClick: function (panel, td, cellIndex, record, tr, rowIndex) {
        var me = this,
            innerDiv = td.getElementsByClassName('x-grid-cell-inner'),
            innerHtml = innerDiv[0].innerHTML,
            grid = me.ownerGrid,
            gridColumns = grid.query('gridcolumn'),
            column = gridColumns[cellIndex],
            menu = grid.getCustomMenu();
        if (menu && menu.isVisible()) {
            menu.hide();


        }
        grid.setLastColumnIndex(cellIndex);
        grid.setLastCellValue(innerHtml);
        grid.setLastColumnName(column.dataIndex);
    },
    onItemContextMenu: function (panel, record, item, index, event) {
        var me = this,
            grid = me.ownerGrid,
            defaultCriteria = grid.getLastCellValue(),
            defaultField = grid.getLastColumnName(),
            menu = grid.getCustomMenu();
        event.preventDefault();
        if (!menu) {
            menu = grid.inflateCustomMenu(grid, defaultCriteria, defaultField);
        }
        menu.showAt(event.getXY());
    },
    // @private
    inflateCustomMenu: function (panel, criteria, field, index) {
        var menu = Ext.create('Fiddle.CustomMenu', {
            targetGrid: panel,
            targetColumnIndex: panel.lastColumnIndex
        });
        if (!Ext.isEmpty(criteria)) {
            menu.getViewModel().setData({
                update: true,
                defaultTagValue: [criteria],
                defaultDisplayField: field,
                defaultValueField: field
            });
        }
        return menu;
    }
});
Ext.define('Fiddle.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fiddle-grid',
    store: 'viewrecords',
    requires: [
        'Fiddle.CustomMenu',
        'Fiddle.Mixin'
    ],
    mixins: [
        'Fiddle.Mixin'
    ],
    config: {
        customMenu: null,
        lastColumnIndex: 1,
        lastCellValue: '',
        lastColumnName: 'name',
        border: false,
        customMenu: null,
        loadMask: true,
        plugins: ['gridfilters', 'bufferedrenderer']
    },
    columns: [
        {
            dataIndex: 'index',
            text: 'id',
            locked: true,
            filter: {
                type: 'numeric'
            },
            width: 30
        },
        {
            dataIndex: 'name',
            text: 'Name',
            locked: true,
            id: '_id',
            filter: {
                type: 'numeric'
            },
            width: 150
        },
        {
            text: 'Banking',
            defaults: {
                hideable: false,
                menuDisabled: true,
                draggable: false,
                align: 'right'

            },
            columns: [{
                dataIndex: 'checkingBalance',
                text: 'Checking',
                filter: {}
            },
                {
                    dataIndex: 'savingsBalance',
                    text: 'Savings',
                    filter: {}
                }]
        },
        {
            text: 'Profile',
            defaults: {
                hideable: false,
                menuDisabled: true,
                draggable: false
            },
            columns: [{
                dataIndex: 'age',
                text: 'Age',
                filter: {
                    type: 'numeric'
                },
                width: 50,
                align: 'right'
            }, {
                dataIndex: 'registered',
                text: 'MemberSince',
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                filter: {
                    type: 'date'
                },
                width: 75
            },
                {
                    dataIndex: 'address',
                    text: 'Address',
                    filter: {
                        type: 'string'
                    },
                    width: 200
                }
            ]
        }
    ]
});
// BOILER PLATE
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
    items: [
        {
            xtype: 'panel',
            bind: {
                title: '<h2>{header}<h2>'
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
Ext.onReady(function () {
    var grid = Ext.create('Fiddle.Grid'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            height: 300,
            width: 500,
            maximizable: true,
            layout: 'fit',
            items: grid
        });
    win.showAt(25, 270);
    Ext.QuickTips.init();
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
