var meta = {
        fiddleHeader: 'CSV Excel Style Grid',
        fiddleSubHeader: 'Fiddle exploring how to bind/unbind CSV files to a grid when the layout of the CSV defies any convention.<br />',
        urls: {
            reports: 'reports.json',
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/extjs6/fiddle-0034-CSVExcelStyleGrid'
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
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
    mapReportColumns: function(fields) {
        var columnTemplate = {
                emptyCellText: '',
                minWidth: 50,
                filter: {
                    type: 'string'
                }
            },
            columns = [],
            column;
        if (fields) {
            fields.map(function(field) {
                column = new Object();
                Ext.apply(column, columnTemplate);
                column.dataIndex = field;
                column.text = field;
                column.tooltip = field;
                columns.push(column);
            });
        }
        return columns;
    },
    loadReportData: function(url, callback, scope) {
        this.setRequest(this.requestCSV(url, callback, scope));
    },
    privates: {
        requestCSV: function(url, callback, scope) {
            var me = this,
                reportUrl = url,
                request = Ext.Ajax.request({
                    url: reportUrl,
                    defaultHeaders: {
                        'Accepts': "text/csv"
                    },
                    method: 'GET',
                    success: function(response) {
                        var root = {},
                            record,
                            fields,
                            cols,
                            header = '',
                            csvRaw = response.responseText ? header + response.responseText.trimLeft().trimRight() : null;
                        if (csvRaw) {
                            csvRaw = me.addFieldHeader(csvRaw);
                            root.data = $.csv.toObjects(csvRaw);
                        } else {
                            root.data = [];
                        }
                        if (root.data.length) {
                            record = root.data[0];
                            fields = Object.keys(record);
                            cols = me.mapReportColumns(fields);
                            Ext.callback(callback, scope, [root, fields, cols]);
                        } else {
                            Ext.callback(callback, scope, [false]);
                        }
                    },
                    failure: function() {
                        Ext.callback(callback, scope, [false]);
                    }
                });
            return request;
        },
        parseFieldCount: function(csv) {
            var lines = csv.split('\n'),
                longestLine = lines.reduce(function(lineA, lineB) {
                    if (lineB.split(',').length > lineA.split(',').length) {
                        return lineB;
                    }
                    return lineA;
                }),
                fields = longestLine ? longestLine.split(',') : [];
            return fields.length;
        },
        addFieldHeader: function(csv) {
            var cnt = this.parseFieldCount(csv),
                alphabet = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z',
                fields = alphabet.split(','),
                fieldQuotient,
                fieldRemainder,
                cols = [],
                i = 0,
                header;
            if (cnt <= fields.length) {
                cols = fields.slice(0, cnt);
            }
            if (cnt > fields.length) {
                fieldQuotient = (Math.floor(cnt / fields.length)) - 1;
                fieldRemainder = cnt % fields.length;
                cols = alphabet.split(',');
                if (fieldQuotient > 0) {
                    for (; i < fieldQuotient; i++) {
                        fields.map(function(field) {
                            cols.push(field + (i + 1));
                        });
                    }
                }
                fields.slice(0, fieldRemainder).map(function(field) {
                    cols.push(field + (i + 1));
                });
            }
            cols.map(function(col, index) {
                if (index == 0) {
                    header = col;
                } else {
                    header += ',' + col;
                }
            });
            return header + '\n' + csv;
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
        reportManager.loadReportData(this.getReportId(), function(json, schema) {
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
        reportId: 'report-a.csv'
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
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: meta.urls.reports,
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'id'
            }
        },
        autoLoad: true
    }
});


Ext.define('Fiddle.view.header.mixin.ReportHeader', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'reportViewerHeader',
        after: {
            init: 'init'
        }
    },
    init: function() {
        this.listen({
            component: {
                'reportselector': {
                    change: 'onSelectorChange'
                }
            }
        });
    },
    onSelectorChange: function(field, newValue, oldValue) {
        this.reconfigureReportGrid(newValue);
    },
    privates: {
        inflateFieldFilters: function(id) {
            return new Fiddle.FieldsFilter({
                reportId: id
            });
        },
        reconfigureReportFilters: function(reportId) {
            var view = this.getView(),
                reportNavigation = view.up().down('reportviewernavigation'),
                reportFilters = view.up().down('filterscontainer'),
                newReportFilters = reportId ? this.inflateFieldFilters(reportId) : null;
            if (reportFilters) {
                reportFilters.items.each(function(item) {
                    item.destroy();
                });
                reportFilters.setReportId(reportId);
            }
            if (reportId && newReportFilters) {
                reportFilters.insert(0, newReportFilters);
            }
            if (reportNavigation) {
                reportNavigation.setVisible((reportId ? true : false));
            }
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
            reportManager.loadReportData(reportId, function(json, schema, cols) {
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


Ext.define('Fiddle.view.header.mixin.ReportsStore', {
    extend: 'Ext.Mixin',
    isReportsStore: true,
    mixinConfig: {
        id: 'reportsStore',
        after: {
            beforeInit: 'beforeInit'
        }
    },
    beforeInit: function() {
        this.listen({
            store: {
                reports: {
                    load: 'onStoreLoad'
                }
            }
        });
    },
    onStoreLoad: function(store) {
        var view = this.getView(),
            reportSelector = view.down('reportselector'),
            record = store.count() ? store.data.first() : null;
        if (reportSelector && record) {
            reportSelector.setValue(record);
        }
    }
});


Ext.define('Fiddle.ReportHeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportheader',
    mixins: [
        'Fiddle.view.header.mixin.ReportHeader',
        'Fiddle.view.header.mixin.ReportsStore'
    ]
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
        width: 120
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
    bodyPadding: 5,
    border: false,
    items: [{
        xtype: 'button',
        width: 100,
        height: 25,
        text: 'Reset',
        handler: 'onResetButtonClick'
    }, {
        xtype: 'tbspacer',
        width: 20
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
                width: 320,
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
        border: false,
        bodyPadding: 2,
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
        buildItems: function(id, store) {
            var reportId = id,
                fields = store.fields,
                items = [],
                item = null;
            if (fields) {
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
            }
            return items;
        }
    }
});


Ext.define('Fiddle.FiltersContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.filterscontainer',
    requires: [
        'Fiddle.BaseFilter',
        'Fiddle.FieldsFilter'
    ],
    config: {
        layout: {
            type: 'fit'
        },
        border: false,
        reportId: null
    },
    constructor: function(config) {
        config.items = this.inflateItems(config.reportId);
        this.callParent([config]);
    },
    privates: {
        inflateItems: function(id) {
            return [{
                xtype: 'fieldsfilter',
                reportId: id
            }];
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
    border: false,
    items: [{
        xtype: 'panel',
        hideCollapseTool: true,
        border: false,
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


Ext.define('Fiddle.mixin.CSVExport', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'csvexport',
        after: {
            addTools: 'onAfterAddTools'
        }
    },
    onAfterAddTools: function() {
        var me = this;
        me.addTool([{
            type: 'save',
            tooltip: 'Export to CSV'
        }]);
    },
    downloadCSVFile: function(url, filename) {
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function(response, opts) {
                var uri = 'data:text/csv;charset=utf-8,' + escape(response.responseText),
                    link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = filename + ".csv";
                link.click();
                delete link;
            },
            failure: function(response, opts) {
                console.log(response);
            }
        });
    }
});


Ext.define('Fiddle.reportgrid.mixin.CSVExport', {
    extend: 'Ext.Mixin',
    isCSVExport: true,
    mixinConfig: {
        id: 'CSVExport',
        after: {
            init: 'init'
        }
    },
    init: function(view) {
        this.listen({
            component: {
                'tool[type=save]': {
                    click: 'onSaveToolClick'
                }
            }
        });
    },
    onSaveToolClick: function(tool, e, owner) {
        var view = this.getView(),
            selector = view.up().down('reportselector'),
            reportId = selector ? selector.getValue() : null,
            reportName = selector ? selector.getDisplayValue() : null,
            downloadDate = Ext.Date.format(new Date(), 'd-M-y').toUpperCase(),
            downloadFileName = reportName ? downloadDate + '_' + reportName : null;
        if (reportId && downloadFileName) {
            return this.getView().downloadCSVFile(reportId, downloadFileName);
        }
    }
});


Ext.define('Fiddle.reportgrid.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportgrid',
    loadMask: true,
    controller: 'reportgrid',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    viewConfig: {
        emptyText: '<div style="width:auto; height:auto; text-align:center; color:red; font-weight:bold;">No data available.</div>',
        deferEmptyText: true
    },
    layout: {
        type: 'card'
    },
    mixins: [
        'Fiddle.mixin.CSVExport'
    ],
    constructor: function(config) {
        config.plugins = [{
            ptype: 'gridfilters'
        }];
        this.callParent([config]);
    }
});


Ext.define('Fiddle.reportgrid.ReportGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportgrid',
    isReportGridController: true,
    mixins: [
        'Fiddle.reportgrid.mixin.CSVExport'
    ]
});


Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ReportLeftPanel',
        'Fiddle.ReportHeader',
        'Fiddle.reportgrid.ReportGrid'
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
        scrollable: 'y',
        border: false,
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
        positionY = 115;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    window.setTimeout(function() {
        win.maximize(true);
        Ext.ComponentQuery.query('reportleftpanel')[0].collapse();
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
    console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
});
