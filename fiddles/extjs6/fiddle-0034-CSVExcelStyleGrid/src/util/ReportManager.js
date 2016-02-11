Ext.define('Fiddle.ReportManager', {

    config: {
        request: null
    },

    constructor: function (config) {
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
                longestLine = lines.reduce(function(lineA, lineB){
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
                fieldQuotient = (Math.floor(cnt / fields.length)) -1;
                fieldRemainder = cnt % fields.length;
                cols = alphabet.split(',');
                if(fieldQuotient > 0) {
                    for (; i < fieldQuotient; i++) {
                        fields.map(function(field) {
                            cols.push(field + (i+1));
                        });
                    }
                }
                fields.slice(0, fieldRemainder).map(function(field) {
                    cols.push(field + (i+1));
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
