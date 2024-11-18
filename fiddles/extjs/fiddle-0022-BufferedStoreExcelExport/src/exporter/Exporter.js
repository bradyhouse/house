/**
 * This plugin allows grid data export using various exporters. Each exporter should extend
 * the {@link Ext.exporter.Base Base} class.
 *
 * Two new methods are created on the grid panel by this plugin:
 *
 *  - saveDocumentAs(config): saves the document
 *  - getDocumentData(config): returns the document content
 *
 *  The grid data is exported for all grid columns that have the flag {@link Ext.grid.column.Column#ignoreExport ignoreExport} as false.
 *  If columns have formatters then these are applied to the exported data.
 *
 * Example usage:
 *
 *      {
 *          xtype: 'grid',
 *          plugins: [{
 *              ptype: 'gridexporter'
 *          }]
 *      }
 *
 *      grid.saveDocumentAs({
 *          type: 'excel',
 *          title: 'My export',
 *          fileName: 'myExport.xml'
 *      });
 *
 */
Ext.define('Ext.grid.plugin.Exporter', {
    alias: [
        'plugin.gridexporter'
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

        grid.saveDocumentAs = Ext.bind(me.saveDocumentAs, me);
        grid.getDocumentData = Ext.bind(me.getDocumentData, me);
        me.grid = grid;

        return me.callParent(arguments);
    },

    destroy: function(){
        var me = this;

        me.grid.saveDocumentAs = me.grid.getDocumentData = me.grid = null;
        return me.callParent(arguments);
    },

    /**
     * Save the export file. This method is added to the grid panel as "saveDocumentAs".
     *
     * Pass in exporter specific configs to the config parameter.
     *
     * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
     * @param {String} config.type Type of the exporter as defined in the exporter alias. Default is `excel`.
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
     * @param {String} [config.type] Type of the exporter as defined in the exporter alias. Default is `excel`.
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
     * @param {Object} config
     * @returns {Ext.exporter.Base}
     *
     * @private
     */
    getExporter: function(config){
        return Ext.Factory.exporter(Ext.apply({
            type: 'excel',
            data: this.prepareData()
        }, config || {} ));
    },

    /**
     * This method creates the data object that will be consumed by the exporter.
     * @returns {Object}
     *
     * @private
     */
    prepareData: function(){
        var me = this,
            grid = me.grid,
            headers, group;

        group = me.extractGroups(grid.getColumnManager().getColumns());
        if(grid.lockedGrid){
            headers = Ext.Array.merge(me.getColumnHeaders(grid.lockedGrid.headerCt.items), me.getColumnHeaders(grid.normalGrid.headerCt.items));
        }else{
            headers = me.getColumnHeaders(grid.headerCt.items);
        }

        return {
            columns: headers,
            groups: [group]
        };
    },

    /**
     * Fetch all columns that will be exported
     * @param columns
     * @returns {Array}
     *
     * @private
     */
    getColumnHeaders: function(columns){
        var cols = [],
            i, obj, col;

        for(i = 0; i < columns.length; i++){
            col = columns.get(i);
            // each column has a config 'ignoreExport' that can tell us to ignore the column on export
            if(!col.ignoreExport) {
                obj = {
                    text: col.text
                };

                if (col.isGroupHeader) {
                    obj.columns = this.getColumnHeaders(col.items);
                    if(obj.columns.length === 0){
                        // all children columns are ignored for export so there's no need to export this grouped header
                        obj = null;
                    }
                }

                if(obj) {
                    cols.push(obj);
                }
            }
        }

        return cols;
    },

    /**
     * Generate the data that the exporter can consume
     *
     * @param columns
     * @returns {Object}
     *
     * @private
     */
    extractGroups: function(columns){
        var store = this.grid.getStore(),
            len = store.getCount(),
            lenCols = columns.length,
            group = {
                rows: []
            },
            i, j, record, row, col, useRenderer, v;

        // we could also export grouped stores
        for(i = 0; i < len; i++){
            record = store.getAt(i);
            row = [];

            for(j = 0; j < lenCols; j++){
                col = columns[j];
                // each column has a config 'ignoreExport' that can tell us to ignore the column on export
                if(!col.ignoreExport) {
                    useRenderer = !Ext.isEmpty(col.initialConfig.formatter) && Ext.isEmpty(col.formatter);
                    v = record.get(col.dataIndex) || '';

                    row.push(useRenderer ? col.renderer(v) : v);
                }
            }

            group.rows.push(row);
        }

        return group;
    }

});
