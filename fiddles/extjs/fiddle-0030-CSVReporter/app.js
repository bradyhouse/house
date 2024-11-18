var meta = {
        fiddleHeader: 'CSV Reporter',
        fiddleSubHeader: 'Fiddle exploring how to bind multiple CSV files to a single grid.' + '<br />',
        urls: {
            a: 'report-a.csv',
            b: 'report-b.csv'
        }
    },
    fiddleStore = null,
    fiddleChainedStore = null,
    reportManager = null;




Ext.define('Fiddle.ReportManager', {
    config: {
        request: null
    },
    constructor: function(config) {
        this.initConfig(config);
    },
    fields: function(id) {
        return this.modelSchema()[id]();
    },
    url: function(id) {
        return this.urlSchema()[id];
    },
    filters: function(id) {
        return this.filterSchema()[id]();
    },
    columns: function(id) {
        return this.columnSchema()[id]();
    },
    load: function(id, callback, scope, includeColumns) {
        var url = this.url(id),
            fields = this.fields(id),
            cols = includeColumns ? this.columns(id) : null;
        this.setRequest(this.requestCSV(url, fields, cols, callback, scope));
    },
    statics: {
        reportNames: function() {
            return [{
                text: 'Report A',
                itemId: 'reportA'
            }, {
                text: 'Report B',
                itemId: 'reportB'
            }]
        }
    },
    privates: {
        requestCSV: function(url, fields, cols, callback, scope) {
            var request = Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: function(response, options) {
                    var root = {};
                    root.data = $.csv.toObjects(response.responseText);
                    Ext.callback(callback, scope, [root, fields, cols]);
                },
                failure: function(response, options) {
                    Ext.callback(callback, scope, [false]);
                }
            });
            return request;
        },
        urlSchema: function() {
            return {
                a: meta.urls.a,
                b: meta.urls.b
            }
        },
        modelSchema: function() {
            return {
                a: function() {
                    return ['a', 'b', 'c', 'd']
                },
                b: function() {
                    return ['Timestamp', 'close', 'high', 'low', 'open', 'volume']
                }
            }
        },
        columnSchema: function() {
            return {
                a: function() {
                    return [{
                        dataIndex: 'a',
                        align: 'center',
                        text: 'A',
                        tooltip: 'Column A',
                        emptyCellText: '',
                        flex: 1,
                        filter: {
                            type: 'numeric'
                        }
                    }, {
                        dataIndex: 'b',
                        align: 'center',
                        text: 'B',
                        flex: 1,
                        tooltip: 'Column B',
                        emptyCellText: '',
                        filter: {
                            type: 'numeric'
                        }
                    }, {
                        dataIndex: 'c',
                        align: 'center',
                        flex: 1,
                        text: 'C',
                        tooltip: 'Column C',
                        emptyCellText: '',
                        filter: {
                            type: 'numeric'
                        }
                    }, {
                        dataIndex: 'd',
                        align: 'center',
                        flex: 1,
                        text: 'D',
                        tooltip: 'Column D',
                        emptyCellText: '',
                        filter: {
                            type: 'numeric'
                        }
                    }]
                },
                b: function() {
                    return [{
                        dataIndex: 'Timestamp',
                        align: 'center',
                        text: 'Time',
                        tooltip: 'Time',
                        renderer: function(value) {
                            var date = new Date(value * 1000);
                            return Ext.Date.format(date, 'm/d/Y') + ' ' + Ext.Date.format(date, 'H:i');
                        },
                        flex: 1,
                        emptyCellText: '',
                        filter: {
                            type: 'date'
                        }
                    }, {
                        dataIndex: 'close',
                        align: 'center',
                        text: 'Close',
                        tooltip: 'Close',
                        emptyCellText: '',
                        flex: 1,
                        filter: {
                            type: 'numeric'
                        }
                    }, {
                        dataIndex: 'high',
                        align: 'center',
                        text: 'High',
                        tooltip: 'High',
                        flex: 1,
                        emptyCellText: '',
                        filter: {
                            type: 'numeric'
                        }
                    }, {
                        dataIndex: 'low',
                        align: 'center',
                        text: 'Low',
                        tooltip: 'Low',
                        flex: 1,
                        emptyCellText: '',
                        filter: {
                            type: 'numeric'
                        }
                    }]
                }
            }
        },
        filterSchema: function() {
            return {
                a: function() {
                    return ['Fiddle.FieldsFilter']
                },
                b: function() {
                    return [
                        'Fiddle.FieldsFilter'
                    ]
                }
            }
        }
    }
});


Ext.define('Fiddle.BusDate', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        mapping: 'id'
    }, {
        name: 'busDate',
        mapping: 'busDate'
    }, {
        name: 'displayDate',
        convert: function(value, record) {
            var date = new Date(record.data.busDate * 1000);
            return Ext.Date.format(date, 'm/d/Y');
        }
    }]
});


Ext.define('Fiddle.ReportRecordsFilter', {
    extend: 'Ext.util.Filter',
    config: {
        criteria: '',
        field: '',
        filterFn: function(record) {
            var me = this;
            return Ext.Array.contains(me.getCriteria(), record.get(me.getField()));
        }
    }
});


Ext.define('Fiddle.ReportRecords', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.ReportManager',
        'Fiddle.ReportRecordsFilter'
    ],
    config: {
        reportId: null,
        fields: []
    },
    constructor: function(config) {
        var me = this,
            baseConfig = config || {};
        baseConfig.reportManager = new Fiddle.ReportManager({});
        baseConfig.proxy = me.getAppProxy();
        me.callParent([baseConfig]);
        reportManager.load(this.getReportId(), function(json, schema) {
            this.fields = schema;
            this.setData(json.data);
        }, this);
    },
    getAppProxy: function() {
        var me = this;
        return {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        };
    },
    clearReportRecordsFilter: function(filterId, storeId) {
        var store = Ext.getStore(storeId);
        if (store) {
            store.removeFilter(filterId);
        }
    },
    addReportRecordsFilter: function(filterConfig, storeId) {
        var filterId = filterConfig.id,
            filterField = filterConfig.field,
            filterCriteria = filterConfig.criteria,
            filter = new Fiddle.ReportRecordsFilter({
                id: filterId,
                field: filterField,
                criteria: filterCriteria
            }),
            store = Ext.getStore(storeId);
        if (store) {
            store.removeFilter(filterId);
            store.addFilter(filter);
        }
    }
}, function() {
    reportManager = new Fiddle.ReportManager();
    fiddleStore = Ext.create('Fiddle.ReportRecords', {
        storeId: 'reportrecords',
        reportId: 'a'
    });
    fiddleChainedStore = Ext.create('Ext.data.ChainedStore', {
        source: 'reportrecords',
        storeId: 'viewreportrecords'
    });
});


Ext.define('Fiddle.BusDates', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.BusDate'
    ],
    config: {
        model: 'Fiddle.BusDate',
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'dates.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id'
            }
        },
        autoLoad: true
    }
});


Ext.define('Fiddle.Reports', {
    extend: 'Ext.data.Store',
    alias: 'store.reports',
    config: {
        storeId: 'reports',
        fields: ['displayName', 'id'],
        data: [{
            id: 'a',
            displayName: 'Report-A',
        }, {
            id: 'b',
            displayName: 'Report-B'
        }]
    }
});


Ext.define('Fiddle.ReportHeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportheader',
    onSelectorChange: function(field, newValue, oldValue) {
        this.reconfigureReportGrid(newValue);
    },
    privates: {
        reconfigureReportFilters: function(reportId) {
            var reportFilters = Ext.ComponentQuery.query('filterscontainer')[0],
                newReportFilters = reportManager.filters(reportId),
                store = Ext.getStore('reportrecords'),
                index = 0,
                filter = null;
            reportFilters.items.each(function(item) {
                item.destroy();
            });
            newReportFilters.map(function(filterName) {
                reportFilters.insert(index, Ext.create(filterName, {
                    reportId: reportId
                }));
                index++;
            });
        },
        reconfigureReportGrid: function(reportId) {
            var grid = Ext.ComponentQuery.query('reportgrid')[0];
            // Clear the grid columns
            grid.reconfigure(grid.getStore(), []);
            // Clear the grid rows
            fiddleStore.loadRecords([], {
                addRecords: false
            });
            // Load the alternate report and refresh the filters panel
            reportManager.load(reportId, function(json, schema, cols) {
                fiddleStore.fields = schema;
                fiddleStore.setData(json.data);
                fiddleChainedStore = Ext.create('Ext.data.ChainedStore', {
                    source: 'reportrecords',
                    storeId: 'viewreportrecords'
                });
                grid.reconfigure(fiddleChainedStore, cols);
                this.reconfigureReportFilters(reportId);
            }, this, true);
        }
    }
});


Ext.define('Fiddle.ReportSelector', {
    extend: 'Ext.form.ComboBox',
    requires: [
        'Fiddle.Reports'
    ],
    alias: 'widget.reportselector',
    config: {
        displayField: 'displayName',
        valueField: 'id',
        editable: false,
        width: 120,
        listeners: {
            change: 'onSelectorChange'
        }
    },
    constructor: function(config) {
        config.store = new Fiddle.Reports({
            autoLoad: true
        });
        config.value = config.store.data.first();
        this.callParent([config]);
    }
});


Ext.define('Fiddle.ReportHeader', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ReportSelector',
        'Fiddle.ReportHeaderController'
    ],
    alias: 'widget.reportheader',
    config: {
        controller: 'reportheader',
        layout: 'hbox',
        items: [{
            xtype: 'reportselector'
        }]
    }
});


Ext.define('Fiddle.FilterCmdsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.filtercmds',
    onResetButtonClick: function() {
        var fieldsfilter = Ext.ComponentQuery.query('fieldsfilter')[0];
        if (fieldsfilter) {
            fieldsfilter.resetFilters();
        }
    }
});


Ext.define('Fiddle.FilterCmds', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.FilterCmdsController'
    ],
    alias: 'widget.filtercmds',
    controller: 'filtercmds',
    padding: '20 10 10 10',
    bodyStyle: {
        background: '#3A4155'
    },
    items: [{
        xtype: 'button',
        width: 100,
        height: 40,
        text: 'Reset',
        handler: 'onResetButtonClick'
    }]
});


Ext.define('Fiddle.BaseFilter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.basefilter',
    isBaseFilter: true,
    config: {
        layout: {
            type: 'fit',
            align: 'left'
        },
        bodyStyle: {
            background: '#3A4155'
        },
        reportId: '',
        reportFilterId: '',
        reportFilterField: '',
        reportFilterCriteria: []
    }
});


Ext.define('Fiddle.DateSelector', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'Fiddle.BusDates'
    ],
    alias: 'widget.dateselector',
    config: {
        queryMode: 'local',
        editable: 'false',
        displayField: 'displayDate',
        valueField: 'busDate'
    },
    constructor: function(config) {
        config.store = new Fiddle.BusDates({
            storeId: 'busdates',
            autoLoad: true
        });
        config.value = config.store.data.first();
        this.callParent([config]);
    }
});


Ext.define('Fiddle.DateFilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.datefilter',
    onDatesStoreLoad: function(store) {
        var view = this.getView(),
            selector = view.down('dateselector'),
            busDate = store.data.first();
        if (busDate) {
            selector.setValue(busDate);
        }
    }
})


Ext.define('Fiddle.DateFilter', {
    extend: 'Fiddle.BaseFilter',
    requires: [
        'Fiddle.DateSelector',
        'Fiddle.DateFilterController'
    ],
    alias: 'widget.datefilter',
    config: {
        controller: 'datefilter',
        title: 'Business Date',
        items: [{
            xtype: 'dateselector',
            listeners: {
                store: {
                    load: 'onDatesStoreLoad'
                }
            }
        }]
    }
});


Ext.define('Fiddle.FieldFilter', {
    extend: 'Fiddle.BaseFilter',
    alias: 'widget.fieldfilter',
    constructor: function(config) {
        if (config) {
            config.items = this.inflateItems(Ext.getStore('reportrecords'), config.displayField, config.valueField);
        }
        this.callParent([config]);
    },
    privates: {
        inflateItems: function(dataStore, displayFieldName, valueFieldName, labelText) {
            var tagField = this.inflateTagField(dataStore, displayFieldName, valueFieldName);
            return [
                tagField
            ]
        },
        inflateTagField: function(dataStore, displayFieldName, valueFieldName, labelText) {
            return {
                xtype: 'tagfield',
                store: dataStore,
                width: 338,
                shrinkWrap: 2,
                displayField: displayFieldName,
                valueField: valueFieldName,
                queryMode: 'local',
                //filterPickList: true,
                listeners: {
                    change: 'onTagValueChange'
                }
            }
        }
    }
})


Ext.define('Fiddle.FieldsFilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fieldsfilter',
    onTagValueChange: function(field, newValue, oldValue) {
        var view = field.up('panel'),
            filterId = view.getReportFilterId(),
            filterField = view.getReportFilterField(),
            filterCriteria = view.getReportFilterCriteria(),
            filterConfig = {
                id: filterId,
                field: filterField,
                criteria: newValue
            }
        store = Ext.getStore('reportrecords');
        view.setReportFilterCriteria(newValue);
        if (newValue.length > 0) {
            store.addReportRecordsFilter(filterConfig, 'viewreportrecords');
        } else {
            store.clearReportRecordsFilter(filterId, 'viewreportrecords');
        }
    }
});


Ext.define('Fiddle.FieldsFilter', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.FieldFilter',
        'Fiddle.FieldsFilterController'
    ],
    alias: 'widget.fieldsfilter',
    config: {
        controller: 'fieldsfilter',
        layout: {
            type: 'vbox',
            align: 'left'
        },
        reportId: ''
    },
    constructor: function(config) {
        var myConfig = config || {};
        myConfig.items = this.buildItems(config.reportId, Ext.getStore('reportrecords'));
        this.callParent([myConfig]);
    },
    applyFilters: function() {
        var viewStore = Ext.getStore('reportrecords'),
            filters = this.items.filter(function(item) {
                return item.isBaseFilter;
            });
        filters.items.map(function(item) {
            if (item.getFilter().criteria.length > 0) {
                viewStore.addReportRecordsFilter(item.getFilter());
            }
        });
    },
    resetFilters: function() {
        var store = Ext.getStore('reportrecords'),
            filters = this.items.filter(function(item) {
                return item.isBaseFilter;
            });
        filters.items.map(function(item) {
            item.down('tagfield').setValue([]);
        });
    },
    privates: {
        buildItems: function(reportId, store) {
            var fields = store.count() > 0 ? store.getFields() : reportManager.fields(reportId),
                items = [],
                item = null;
            fields.map(function(field) {
                item = new Fiddle.FieldFilter({
                    displayField: field,
                    valueField: field,
                    title: field,
                    reportFilterId: field + '-filter',
                    reportFilterField: field,
                    reportFilterCriteria: []
                });
                items.push(item);
            });
            return items;
        }
    }
});


Ext.define('Fiddle.FiltersContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.filterscontainer',
    requires: [
        'Fiddle.BaseFilter',
        'Fiddle.FieldsFilter',
        'Fiddle.DateFilter'
    ],
    layout: {
        type: 'form'
    },
    constructor: function(config) {
        config.items = this.inflateItems(config.reportId, reportManager.filters(config.reportId));
        this.callParent([config]);
    },
    privates: {
        inflateItems: function(id, list) {
            var items = [];
            list.map(function(itemName) {
                items.push(Ext.create(itemName, {
                    reportId: id
                }));
            });
            return items;
        }
    }
});


Ext.define('Fiddle.ReportLeftPanel', {
    extend: 'Ext.panel.Panel',
    reqires: [
        'Fiddle.ReportManager',
        'Fiddle.FilterCmds',
        'Fiddle.FiltersContainer'
    ],
    alias: 'widget.reportleftpanel',
    layout: {
        type: 'fit'
            //animate: true,
            //activeOnTop: true
    },
    border: true,
    bodyStyle: {
        background: '#3A4155'
    },
    items: [{
        xtype: 'panel',
        hideCollapseTool: true,
        itemId: 'leftpanelcard',
        items: [{
            xtype: 'filterscontainer',
            reportId: 'a'
        }, {
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            xtype: 'filtercmds'
        }]
    }]
});


Ext.define('Fiddle.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportgrid',
    loadMask: true,
    layout: {
        type: 'card',
        deferredRender: true,
        duration: 500
    },
    constructor: function(config) {
        config.columns = reportManager.columns(config.reportId);
        this.callParent([config]);
    }
});


Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ReportLeftPanel',
        'Fiddle.ReportHeader',
        'Fiddle.ReportGrid'
    ],
    layout: {
        type: 'border'
    },
    items: [{
        xtype: 'reportheader',
        region: 'north'
    }, {
        xtype: 'reportleftpanel',
        title: 'Filters',
        region: 'west',
        split: true,
        collapsible: true,
        width: 350
    }, {
        xtype: 'reportgrid',
        region: 'center',
        reportId: 'a',
        store: Ext.getStore('viewreportrecords')
    }]
});

// Boiler plate
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
Ext.onReady(function() {

    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            resizable: true,
            maximizable: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 192;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    window.setTimeout(function() {
        win.maximize(true);
        Ext.ComponentQuery.query('reportleftpanel')[0].collapse();
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
