/**
 * This exporter produces XML Excel files for the supplied data.
 */
Ext.define('Ext.exporter.Excel', {
    extend: 'Ext.exporter.Base',

    alias:  'exporter.excel',

    requires: [
        'Ext.exporter.file.excel.Workbook'
    ],

    config: {
        /**
         * @cfg {Number} windowHeight
         *
         * Excel window height
         */
        windowHeight: 9000,

        /**
         * @cfg {Number} windowWidth
         *
         * Excel window width
         */
        windowWidth: 50000,

        /**
         * @cfg {Boolean} protectStructure
         *
         * Protect structure
         */
        protectStructure: false,

        /**
         * @cfg {Boolean} protectWindows
         *
         * Protect windows
         */
        protectWindows: false,

        /**
         * @cfg {Ext.exporter.file.excel.Style} defaultStyle
         *
         * Default style applied to all cells
         */
        defaultStyle: {
            alignment: {
                Vertical: 'Top'
            },
            font: {
                FontName: 'Calibri',
                Family: 'Swiss',
                Size: 11,
                Color: '#000000'
            }
        },

        /**
         * @cfg {Ext.exporter.file.excel.Style} titleStyle
         *
         * Default style applied to the title
         */
        titleStyle: {
            name: 'Title',
            alignment: {
                Horizontal: 'Center',
                Vertical: 'Center'
            },
            font: {
                FontName: 'Cambria',
                Family: 'Swiss',
                Size: 18,
                Color: '#1F497D'
            }
        },

        /**
         * @cfg {Ext.exporter.file.excel.Style} groupHeaderStyle
         *
         * Default style applied to the group headers
         */
        groupHeaderStyle: {
            name: 'Group Header',
            borders: [{
                Position: 'Bottom',
                LineStyle: 'Continuous',
                Weight: 1,
                Color: '#4F81BD'
            }]
        },

        /**
         * @cfg {Ext.exporter.file.excel.Style} groupFooterStyle
         *
         * Default style applied to the group footers
         */
        groupFooterStyle: {
            name: 'Total Footer',
            borders: [{
                Position: 'Top',
                LineStyle: 'Continuous',
                Weight: 1,
                Color: '#4F81BD'
            }]
        },

        /**
         * @cfg {Ext.exporter.file.excel.Style} tableHeaderStyle
         *
         * Default style applied to the table headers
         */
        tableHeaderStyle: {
            name: 'Heading 1',
            alignment: {
                Horizontal: 'Center',
                Vertical: 'Center'
            },
            borders: [{
                Position: 'Bottom',
                LineStyle: 'Continuous',
                Weight: 1,
                Color: '#4F81BD'
            }],
            font: {
                FontName: 'Calibri',
                Family: 'Swiss',
                Size: 11,
                Color: '#1F497D'
            }
        }
    },

    fileName: 'export.xml',

    destroy: function(){
        Ext.destroyMembers(this, 'workbook', 'table');
        this.workbook = this.table = null;
        return this.callParent(arguments);
    },

    applyDefaultStyle: function(newValue){
        // the default style should always have the id Default and name Normal
        return Ext.applyIf({
            id: 'Default',
            name: 'Normal'
        }, newValue || {});
    },

    getContent: function(){
        var me = this,
            config = this.getConfig(),
            data = config.data,
            colMerge;

        me.workbook = Ext.create('Ext.exporter.file.excel.Workbook',{
            title:              config.title,
            author:             config.author,
            windowHeight:       config.windowHeight,
            windowWidth:        config.windowWidth,
            protectStructure:   config.protectStructure,
            protectWindows:     config.protectWindows
        });
        me.table = me.workbook.addWorksheet({
            name: config.title
        }).addTable();

        me.workbook.addStyle(config.defaultStyle);
        me.tableHeaderStyleId = me.workbook.addStyle(config.tableHeaderStyle).getId();
        me.groupHeaderStyleId = me.workbook.addStyle(config.groupHeaderStyle).getId();
        me.groupFooterStyleId = me.workbook.addStyle(config.groupFooterStyle).getId();

        colMerge = me.getColumnCount(data.columns);

        me.addTitle(config, colMerge);
        me.buildHeader();
        me.buildRows(colMerge);

        return me.workbook.render();
    },

    addTitle: function(config, colMerge){
        if(!Ext.isEmpty(config.title)) {
            this.table.addRow({
                autoFitHeight: 1,
                height: 22.5,
                styleId: this.workbook.addStyle(config.titleStyle).getId()
            }).addCell({
                mergeAcross: colMerge - 1,
                value: config.title
            });
        }
    },

    buildRows: function (colMerge) {
        var me = this,
            data = me.getData(),
            groups = Ext.isDefined(data.groups) ? data.groups : Ext.Array.from(data),
            row;

        me.buildSummaryRows(groups, colMerge, 1);

        if(me.getShowSummary() !== false && Ext.isDefined(data.groups) && data.summary && data.summary.length > 0){
            row = me.table.addRow({
                styleId: me.groupFooterStyleId
            });
            for (var j = 0; j < data.summary.length; j++) {
                row.addCell({
                    value: data.summary[j]
                })
            }
        }

    },

    buildSummaryRows: function (groups, colMerge, level) {
        var me = this,
            showSummary = me.getShowSummary(),
            g, row, styleH, styleF;

        if (!groups) {
            return;
        }

        styleH = me.workbook.addStyle({
            parentId: me.groupHeaderStyleId,
            alignment: {
                Horizontal: 'Left',
                Indent: level - 1
            }
        });
        styleF = me.workbook.addStyle({
            parentId: me.groupFooterStyleId,
            alignment: {
                Horizontal: 'Left',
                Indent: level - 1
            }
        });

        for (var i = 0; i < groups.length; i++) {
            g = groups[i];

            if(showSummary !== false && !Ext.isEmpty(g.text)){
                me.table.addRow({
                    styleId: me.groupHeaderStyleId
                }).addCell({
                    mergeAcross: colMerge - 1,
                    value: g.text,
                    styleId: styleH.getId()
                });
            }

            me.buildSummaryRows(g.groups, colMerge, level + 1);
            me.buildGroupRows(g.rows);

            if(showSummary !== false && g.summary && g.summary.length > 0){
                // that's the summary footer
                row = me.table.addRow({
                    styleId: me.groupFooterStyleId
                });
                for (var j = 0; j < g.summary.length; j++) {
                    row.addCell({
                        value: g.summary[j],
                        styleId: (j === 0 ? styleF.getId() : null)
                    });
                }
            }

        }
    },

    buildGroupRows: function(lines){
        var l, row, i, j;

        if (!lines) {
            return;
        }

        for (i = 0; i < lines.length; i++) {
            row = this.table.addRow();
            l = lines[i];
            for (j = 0; j < l.length; j++) {
                row.addCell({
                    value: l[j]
                });
            }
        }
    },

    buildHeader: function () {
        var me = this,
            ret = {},
            keys, row, i, j, len, lenCells;

        me.buildHeaderRows(me.getData().columns, ret);

        keys = Ext.Object.getKeys(ret);
        len = keys.length;

        for(i = 0; i < len; i++){
            row = me.table.addRow({
                height: 20.25,
                autoFitHeight: 1,
                styleId: me.tableHeaderStyleId
            });
            lenCells = ret[keys[i]].length;

            for(j = 0; j < lenCells; j++){
                row.addCell(ret[keys[i]][j]);
            }
        }
    },

    buildHeaderRows: function (columns, result) {
        var col, count, s;

        if (!columns) {
            return;
        }

        for (var i = 0; i < columns.length; i++) {
            col = columns[i];
            count = this.getColumnCount(col.columns);
            result['s' + col.level] = result['s' + col.level] || [];

            s = {
                value: this.sanitizeHtml(col.text)
            };
            if (count > 1) {
                Ext.apply(s, {
                    mergeAcross: count - 1
                });
            }

            result['s' + col.level].push(s);

            this.buildHeaderRows(col.columns, result);
        }
    },

    sanitizeHtml: function(value){
        value = String(value).replace('<br>', " ");
        value = value.replace('<br/>', " ");
        // strip html tags
        return value.replace(/<\/?[^>]+>/gi, '');
    }

});
