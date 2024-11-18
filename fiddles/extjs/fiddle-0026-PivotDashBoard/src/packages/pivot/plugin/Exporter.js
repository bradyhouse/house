/**
 * This plugin allows pivot grid data export using various exporters. Each exporter should extend
 * the {@link Ext.exporter.Base Base} class.
 *
 * Two new methods are created on the pivot grid by this plugin:
 *
 *  - saveDocumentAs(config): saves the document
 *  - getDocumentData(config): returns the document content
 *
 * Example usage:
 *
 *      {
 *          xtype: 'pivot',
 *          plugins: [{
 *              ptype: 'pivotexporter'
 *          }]
 *      }
 *
 *      pivot.saveDocumentAs({
 *          type: 'excel',
 *          title: 'My export',
 *          fileName: 'myExport.xml'
 *      });
 *
 */
Ext.define('Ext.pivot.plugin.Exporter', {
    alternateClassName: [
        'Mz.pivot.plugin.ExcelExport'
    ],

    alias: [
        'plugin.pivotexporter',
        'plugin.mzexcelexport'
    ],

    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.exporter.Excel'
    ],

    /**
     *  `"both"` (the default) - The plugin is added to both grids
     *  `"top"` - The plugin is added to the containing Panel
     *  `"locked"` - The plugin is added to the locked (left) grid
     *  `"normal"` - The plugin is added to the normal (right) grid
     *
     * @private
     */
    lockableScope:  'top',

    init: function (grid) {
        var me = this;

        //<debug>
        // this plugin is available only for the pivot grid
        if (!grid.isPivotGrid) {
            Ext.raise('This plugin is only compatible with Ext.pivot.Grid');
        }
        //</debug>

        grid.saveDocumentAs = Ext.bind(me.saveDocumentAs, me);
        grid.getDocumentData = Ext.bind(me.getDocumentData, me);
        me.pivot = grid;

        return me.callParent(arguments);
    },

    destroy: function () {
        var me = this;

        me.pivot.saveDocumentAs = me.pivot.getDocumentData = me.pivot = me.matrix = null;
        return me.callParent(arguments);
    },

    /**
     * Save the export file. This method is added to the grid panel as "saveDocumentAs".
     *
     * Pass in exporter specific configs to the config parameter.
     *
     * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
     * @param {String} config.type Type of the exporter as defined in the exporter alias. Default is `excel`.
     * @param {Boolean} [config.onlyExpandedNodes] True to export only what is visible in the grid. False to export everything.
     * @param {Boolean} [config.showSummary] True to export group summaries
     * @param {String} [config.title] Title added to the export document
     * @param {String} [config.author] Who exported the document?
     * @param {String} [config.fileName] Name of the exported file, including the extension
     * @param {String} [config.charset] Exported file's charset
     *
     */
    saveDocumentAs: function(config){
        var exporter;

        if(this.disabled){
            return;
        }

        exporter = this.getExporter.apply(this, arguments);
        exporter.saveAs();
        Ext.destroy(exporter);
    },

    /**
     * Fetch the export data. This method is added to the grid panel as "getDocumentData".
     *
     * Pass in exporter specific configs to the config parameter.
     *
     * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
     * @param {String} config.type Type of the exporter as defined in the exporter alias. Default is `excel`.
     * @param {Boolean} [config.onlyExpandedNodes] True to export only what is visible in the grid. False to export everything.
     * @param {Boolean} [config.showSummary] True to export group summaries
     * @param {String} [config.title] Title added to the export document
     * @param {String} [config.author] Who exported the document?
     * @returns {String}
     *
     */
    getDocumentData: function(config){
        var exporter, ret;

        if(this.disabled){
            return;
        }

        exporter = this.getExporter.apply(this, arguments);
        ret = exporter.getContent();
        Ext.destroy(exporter);

        return ret;
    },

    /**
     * Builds the exporter object and returns it.
     *
     * @param config
     * @returns {Ext.exporter.Base}
     *
     * @private
     */
    getExporter: function(config){
        var me = this;

        config = config || {};
        me.matrix = me.pivot.getMatrix();
        me.onlyExpandedNodes = config.onlyExpandedNodes;
        delete(config.onlyExpandedNodes);

        return Ext.Factory.exporter(Ext.apply({
            type: 'excel',
            data: me.prepareData()
        }, config));
    },

    /**
     * This method creates the data object that will be consumed by the exporter.
     * @returns {Object}
     *
     * @private
     */
    prepareData: function(){
        var me = this,
            matrix = me.matrix,
            group, columns, headers, record, i, dataIndexes;

        if(!me.onlyExpandedNodes){
            me.setColumnsExpanded(matrix.topAxis.getTree(), true);
        }

        columns = Ext.clone(matrix.getColumnHeaders());
        headers = me.getColumnHeaders(columns);
        dataIndexes = me.getDataIndexColumns(columns);

        if(!me.onlyExpandedNodes){
            me.setColumnsExpanded(matrix.topAxis.getTree());
        }

        group = me.extractGroups(matrix.leftAxis.getTree(), dataIndexes);

        Ext.apply(group, {
            summary:        [],
            text:           ''
        });

        group.summary.push(matrix.textGrandTotalTpl);
        record = matrix.preparePivotStoreRecordData({key: matrix.grandTotalKey});
        for(i = 1; i < dataIndexes.length; i++){
            group.summary.push(record[dataIndexes[i]] || '');
        }

        return {
            columns:    headers,
            groups:     [group]
        };
    },

    /**
     * If we have to export everything then expand all top axis tree nodes temporarily
     *
     * @param items
     * @param expanded
     *
     * @private
     */
    setColumnsExpanded: function(items, expanded){
        for(var i = 0; i < items.length; i++){
            if(Ext.isDefined(expanded)){
                items[i].backupExpanded = items[i].expanded;
                items[i].expanded = expanded;
            }else{
                items[i].expanded = items[i].backupExpanded;
                items[i].backupExpanded = null;
            }

            if(items[i].children){
                this.setColumnsExpanded(items[i].children, expanded);
            }
        }
    },

    /**
     * Returns an array of column headers to be used in the export file
     *
     * @param columns
     *
     * @returns {Array}
     *
     * @private
     */
    getColumnHeaders: function(columns){
        var cols = [],
            i, obj;

        for(i = 0; i < columns.length; i++){
            obj = {
                text:   columns[i].text
            };

            if(columns[i].columns){
                obj.columns = this.getColumnHeaders(columns[i].columns);
            }
            cols.push(obj);
        }

        return cols;
    },

    /**
     * Find all columns that have a dataIndex
     *
     * @param columns
     *
     * @returns {Array}
     *
     * @private
     */
    getDataIndexColumns: function(columns){
        var cols = [], i;

        for(i = 0; i < columns.length; i++){
            if(columns[i].dataIndex){
                cols.push(columns[i].dataIndex);
            }else if (Ext.isArray(columns[i].columns)){
                cols = Ext.Array.merge(cols, this.getDataIndexColumns(columns[i].columns));
            }
        }

        return cols;
    },

    /**
     * Extract data from left axis groups.
     *
     * @param items
     * @param columns
     *
     * @returns {Object}
     *
     * @private
     */
    extractGroups: function(items, columns){
        var me = this,
            group = {},
            i, j, doExtract, item, row, record;

        for(i = 0; i < items.length; i++){
            item = items[i];

            if(item.record){
                group.rows = group.rows || [];

                row = [];
                for(j = 0; j < columns.length; j++){
                    row.push(item.record.get(columns[j]) || '');
                }
                group.rows.push(row);

            }else if(item.children){
                group.groups = group.groups || [];
                row = {};

                doExtract = me.onlyExpandedNodes ? item.expanded : true;
                if(doExtract){
                    row = me.extractGroups(item.children, columns);
                }

                Ext.apply(row, {
                    summary:    [],
                    text:       item.name
                });

                row.summary.push(item.getTextTotal());
                record = me.matrix.preparePivotStoreRecordData(item);
                for(j = 1; j < columns.length; j++){
                    row.summary.push(record[columns[j]] || '');
                }

                group.groups.push(row);
            }

        }

        return group;
    }


});
