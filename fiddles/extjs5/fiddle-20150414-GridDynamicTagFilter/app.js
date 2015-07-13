var meta = {
    fiddleHeader: 'Extreme Fiddle ~ Dynamic Field "Tag" Filtering',
    fiddleSubHeader: 'Fiddle exploring how to create a dynamic Field filter that uses a Tag field for the criteria input.'
};
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
Ext.define('Fiddle.Tag', {
    extend: 'Ext.form.field.Tag',
    xtype: 'fiddle-tag',
    store: 'records',
    border: null,
    displayField: 'name',
    valueField: 'name',
    typeAhead: true,
    minChars: 1,
    grow: false,
    collapseOnSelect: true,
    flex: 2,
    typeAheadDelay: 100,
    triggers: {
        search: {
            cls: 'x-form-clear-trigger',
            handler: 'onSearchComboClearClick'
        }
    },
    listeners: {
        /*select: {
         fn: 'onSearchComboSelect',
         buffer: 250
         },*/
        change: {
            fn: 'onSearchComboChange',
            buffer: 250
        }
        /*,
         keyup: {
         fn: 'onSearchComboKeyUp'
         }*/
    },
    listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching names found.',
        itemSelector: '.search-item',
        itemTpl: ['<h4>{name}</h4>']
    }
});
Ext.define('Fiddle.ComboBox', {
    extend: 'Ext.panel.Panel',
    xtype: 'fiddle-combo',
    border: null,
    listeners: {
        beforerender: 'onFieldSplitButtonBeforeRender'
    },
    items: [{
        xtype: 'splitbutton',
        text: 'field'
    }]
});
Ext.define('Fiddle.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar',
    onSearchComboChange: function (trigger) {

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
    onSearchComboSelect: function (combo, record) {
        var recordField = combo.valueField,
            recordFieldValue = record.get(recordField);
        combo.setRawValue(recordFieldValue);
    },
    onFieldMenuCheckChange: function (checkItem) {
        console.log('onFieldMenuCheckChange');
        var me = this,
            toolbar = me.getView(),
            splitButton = toolbar.down('splitbutton'),
            comboBox = toolbar.down('fiddle-tag'),
            picker = comboBox.getPicker(),
            selectionModel = comboBox.pickerSelectionModel,
            fieldName = checkItem.dataIndex;
        splitButton.setText(checkItem.text);
        comboBox.valueField = fieldName;
        comboBox.displayField = fieldName;
        comboBox.labelTpl = me.buildNewComboBoxTpl(fieldName);
        comboBox.displayTpl = me.buildNewComboBoxDisplayTpl(fieldName);
        picker.tpl = me.buildNewComboBoxPickerTpl(fieldName);
        picker.displayField = fieldName;
        picker.refresh();
        if (selectionModel && selectionModel.hasSelection()) {
            console.log('updating selection model');
            comboBox.setValue([selectionModel.getSelection()[0].get(fieldName)]);
            comboBox.clearValue();
        }
    },
    onSearchComboClearClick: function (combo) {
        combo.setValue('');
    },
    onSearchComboKeyUp: function (combo, event) {
        console.log('event');
        console.log(event);
        var value = combo
        if (event.ENTER || event.TAB) {
            combo.setRawValue(value);
            combo.fireEvent('change', combo, value, null);
        }
    },
    // @private
    buildNewComboBoxTpl: function (value) {
        return Ext.create('Ext.XTemplate', '<tpl for=".">', '<div class="x-boundlist-item">{' + value + '}</div>', '</tpl>');
    },
    // @private
    buildNewComboBoxDisplayTpl: function (value) {
        return Ext.create('Ext.XTemplate', '<tpl for=".">', '{' + value + '}  - {' + value + '}', '</tpl>');
    },
    // @private
    buildNewComboBoxPickerTpl: function (value) {
        return Ext.create('Ext.XTemplate', '<tpl for=".">', '<li role="option" unselectable="on" class="x-boundlist-item"><h4>{' + value + '}</h4></li>', '</tpl>');
    },
    // @private
    buildNewComboBoxDisplayTpl: function (value) {
        return new Ext.create('Ext.XTemplate', '<tpl for=".">' + '{[typeof values === "string" ? values : values["' + value + '"]]}' + '<tpl if="xindex < xcount">', '</tpl>' + '</tpl>');
    }
});
Ext.define('Fiddle.Toolbar', {
    extend: 'Ext.panel.Panel',
    requires: ['Fiddle.ToolbarController', 'Fiddle.ComboBox', 'Fiddle.Tag'],
    xtype: 'fiddle-toolbar',
    controller: 'toolbar',
    title: null,
    bodyPadding: 10,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    items: [{
        xtype: 'fiddle-combo'
    }, {
        xtype: 'fiddle-tag'
    }]
});
Ext.onReady(function () {
    var filters = {
            ftype: 'filters',
            encode: false,
            local: true,
            filters: [{
                type: 'numeric',
                dataIndex: 'index'
            }, {
                type: 'string',
                dataIndex: 'name'
            }, {
                type: 'numeric',
                dataIndex: 'age'
            }, {
                type: 'numeric',
                dataIndex: 'checkingBalance'
            }, {
                type: 'numeric',
                dataIndex: 'savingsBalance'
            }, {
                type: 'date',
                dataIndex: 'registered'
            }, {
                type: 'string',
                dataIndex: 'address'
            }]
        },
        topToolFactory = function () {
            return Ext.create('Fiddle.Toolbar');
        },
        pluginFactory = function () {
            return ['gridfilters', 'bufferedrenderer']
        },
        columnFactory = function (finish, start) {
            var columns = [{
                dataIndex: 'index',
                text: 'id',
                filter: {
                    type: 'numeric'
                },
            }, {
                dataIndex: 'name',
                text: 'Name',
                id: '_id',
                filter: {
                    type: 'numeric'
                },
                flex: 1
            }, {
                dataIndex: 'age',
                text: 'Age',
                filter: {
                    type: 'numeric'
                }
            }, {
                dataIndex: 'checkingBalance',
                text: 'Checking',
                filter: {}
            }, {
                dataIndex: 'savingsBalance',
                text: 'Savings',
                filter: {}
            }, {
                dataIndex: 'registered',
                text: 'MemberSince',
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                filter: {
                    type: 'date'
                }
            }, {
                dataIndex: 'address',
                text: 'Address',
                filter: {
                    type: 'string'
                },
                flex: 1
            }];
            return columns.slice(start || 0, finish);
        },
        grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: 'viewrecords',
            itemId: 'fiddle-grid',
            columns: columnFactory(7),
            loadMask: true,
            plugins: pluginFactory(),
            tbar: topToolFactory()
        }),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: grid
        });

    win.showAt(25, 192);

    // Boiler Plate
    Ext.QuickTips.init();
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
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});
