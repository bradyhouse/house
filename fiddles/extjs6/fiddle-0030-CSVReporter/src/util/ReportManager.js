Ext.define('Fiddle.ReportManager', {

    config: {
        request: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    fields: function (id) {
        return this.modelSchema()[id]();
    },

    url: function (id) {
        return this.urlSchema()[id];
    },

    filters: function (id) {
        return this.filterSchema()[id]();
    },

    columns: function (id) {
        return this.columnSchema()[id]();
    },

    load: function (id, callback, scope, includeColumns) {
        var url = this.url(id),
            fields = this.fields(id),
            cols = includeColumns ? this.columns(id) : null;
        this.setRequest(this.requestCSV(url, fields, cols, callback, scope));
    },

    statics: {
        reportNames: function () {
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

        requestCSV: function (url, fields, cols, callback, scope) {
            var request = Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: function (response, options) {
                    var root = {};
                    root.data = $.csv.toObjects(response.responseText);
                    Ext.callback(callback, scope, [root, fields, cols]);
                },
                failure: function (response, options) {
                    Ext.callback(callback, scope, [false]);
                }
            });
            return request;
        },

        urlSchema: function () {
            return {
                a: meta.urls.a,
                b: meta.urls.b
            }
        },

        modelSchema: function () {
            return {
                a: function () {
                    return ['a', 'b', 'c', 'd']
                },
                b: function () {
                    return ['Timestamp', 'close', 'high', 'low', 'open', 'volume']
                }
            }
        },

        columnSchema: function () {
            return {
                a: function () {
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
                b: function () {
                    return [{
                        dataIndex: 'Timestamp',
                        align: 'center',
                        text: 'Time',
                        tooltip: 'Time',
                        renderer: function (value) {
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

        filterSchema: function () {
            return {
                a: function () {
                    return ['Fiddle.FieldsFilter']
                },
                b: function () {
                    return [
                        'Fiddle.FieldsFilter']
                }
            }
        }


    }

});
