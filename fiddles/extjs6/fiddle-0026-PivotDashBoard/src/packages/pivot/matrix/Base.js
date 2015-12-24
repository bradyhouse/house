/**
 * Base implementation of a pivot matrix.
 *
 * This class contains basic methods that are used to generate the pivot data. It
 * needs to be extended by other classes to properly generate the results.
 *
 *
 */
Ext.define('Ext.pivot.matrix.Base', {
    alternateClassName: [
        'Mz.aggregate.matrix.Abstract'
    ],

    extend: 'Ext.util.Observable',

    alias:  'pivotmatrix.base',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    requires: [
        'Ext.util.DelayedTask',
        'Ext.data.ArrayStore',
        'Ext.XTemplate',
        'Ext.pivot.Aggregators',
        'Ext.pivot.MixedCollection',
        'Ext.pivot.axis.Base',
        'Ext.pivot.dimension.Item',
        'Ext.pivot.result.Collection'
    ],

    /**
     * @cfg {String} mztype
     *
     * @deprecated 6.0 Use {@link #type} instead.
     */

    /**
     * @cfg {String} resultType
     *
     * Define the type of Result this class uses. Specify here the pivotresult alias.
     */
    resultType:     'base',

    /**
     * @cfg {String} leftAxisType
     *
     * Define the type of left Axis this class uses. Specify here the pivotaxis alias.
     */
    leftAxisType:     'base',

    /**
     * @cfg {String} mztypeLeftAxis
     * @deprecated 6.0 Use {@link #leftAxisType} instead.
     *
     * Define the type of left Axis this class uses. Specify here the pivotaxis alias.
     */

    /**
     * @cfg {String} topAxisType
     *
     * Define the type of top Axis this class uses. Specify here the pivotaxis alias.
     */
    topAxisType:      'base',

    /**
     * @cfg {String} mztypeTopAxis
     * @deprecated 6.0 Use {@link #topAxisType} instead.
     *
     * Define the type of top Axis this class uses. Specify here the pivotaxis alias.
     */

    /**
     * @cfg {String} textRowLabels
     *
     * In compact layout only one column is generated for the left axis dimensions.
     * This is value of that column header.
     */
    textRowLabels:      'Row labels',

    /**
     * @cfg {String} textTotalTpl Configure the template for the group total. (i.e. '{name} ({rows.length} items)')
     * @cfg {String}           textTotalTpl.groupField         The field name being grouped by.
     * @cfg {String}           textTotalTpl.name               Group name
     * @cfg {Ext.data.Model[]} textTotalTpl.rows               An array containing the child records for the group being rendered.
     */
    textTotalTpl:       'Total ({name})',

    /**
     * @cfg {String} textGrandTotalTpl Configure the template for the grand total.
     */
    textGrandTotalTpl:  'Grand total',

    /**
     * @cfg {String} keysSeparator
     *
     * An axis item has a key that is a combination of all its parents keys. This is the keys separator.
     *
     * Do not use regexp special chars for this.
     */
    keysSeparator:      '#_#',

    /**
     * @cfg {String} grandTotalKey
     *
     * Generic key used by the grand total records.
     */
    grandTotalKey:      'grandtotal',

    /**
     * @cfg {String} compactViewKey
     *
     * In compact view layout mode the matrix generates only one column for all left axis dimensions.
     * This is the 'dataIndex' field name on the pivot store model.
     */
    compactViewKey:     '_compactview_',

    /**
     * @cfg {String} viewLayoutType Type of layout used to display the pivot data.
     * Possible values: outline, compact.
     */
    viewLayoutType:             'outline',

    /**
     * @cfg {String} rowSubTotalsPosition Possible values: `first`, `none`, `last`
     */
    rowSubTotalsPosition:       'first',

    /**
     * @cfg {String} rowGrandTotalsPosition Possible values: `first`, `none`, `last`
     */
    rowGrandTotalsPosition:     'first',

    /**
     * @cfg {String} colSubTotalsPosition Possible values: `first`, `none`, `last`
     */
    colSubTotalsPosition:       'first',

    /**
     * @cfg {String} colGrandTotalsPosition Possible values: `first`, `none`, `last`
     */
    colGrandTotalsPosition:     'first',

    /**
     * @cfg {Boolean} showZeroAsBlank Should 0 values be displayed as blank?
     *
     */
    showZeroAsBlank:            false,

    /**
     * @cfg {Ext.pivot.axis.Base} leftAxis
     *
     * Left axis object stores all generated groups for the left axis dimensions
     */
    leftAxis:       null,

    /**
     * @cfg {Ext.pivot.axis.Base} topAxis
     *
     * Top axis object stores all generated groups for the top axis dimensions
     */
    topAxis:        null,

    /**
     * @cfg {Ext.pivot.MixedCollection} aggregate
     *
     * Collection of configured aggregate dimensions
     */
    aggregate:      null,

    /**
     * @property {Ext.pivot.result.Collection} results
     * @readonly
     *
     * Stores the calculated results
     */
    results:        null,

    /**
     * @property {Ext.data.ArrayStore} pivotStore
     * @readonly
     *
     * The generated pivot store
     *
     * @private
     */
    pivotStore:     null,

    /**
     * @property {Boolean} isDestroyed
     * @readonly
     *
     * This property is set to true when the matrix object is destroyed.
     * This is useful to check when functions are deferred.
     */
    isDestroyed:    false,

    constructor: function(config){
        var ret = this.callParent(arguments);

        /**
         * Fires before the generated data is destroyed.
         * The components that uses the matrix should unbind this pivot store before is destroyed.
         * The grid panel will trow errors if the store is destroyed and the grid is refreshed.
         *
         * @event cleardata
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         */

        /**
         * Fires when the matrix starts processing the records.
         *
         * @event start
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         */

        /**
         * Fires during records processing.
         *
         * @event progress
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         * @param {Integer} index Current index of record that is processed
         * @param {Integer} total Total number of records to process
         */

        /**
         * Fires when the matrix finished processing the records
         *
         * @event done
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         */

        /**
         * Fires after the matrix built the store model.
         *
         * @event modelbuilt
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         * @param {Ext.data.Model} model The built model
         */

        /**
         * Fires after the matrix built the columns.
         *
         * @event columnsbuilt
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         * @param {Array} columns The built columns
         */

        /**
         * Fires after the matrix built a pivot store record.
         *
         * @event recordbuilt
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         * @param {Ext.data.Model} record The built record
         */

        /**
         * Fires before grand total records are created in the pivot store.
         * Push additional objects to the array if you need to create additional grand totals.
         *
         * @event buildtotals
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         * @param {Array} totals Array of objects that will be used to create grand total records in the pivot store. Each object should have:
         * @param {String} totals.title Name your grand total
         * @param {Object} totals.values Values used to generate the pivot store record
         */

        /**
         * Fires after the matrix built the pivot store.
         *
         * @event storebuilt
         * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
         * @param {Ext.data.Store} store The built store
         */

        this.initialize(true, config);

        return ret;
    },

    destroy: function(){
        var me = this;

        me.delayedTask.cancel();
        me.delayedTask = null;

        if(Ext.isFunction(me.onDestroy)){
            me.onDestroy();
        }

        Ext.destroy(me.results, me.leftAxis, me.topAxis, me.aggregate, me.pivotStore);
        me.results = me.leftAxis = me.topAxis = me.aggregate = me.pivotStore = null;

        if(Ext.isArray(me.columns)){
            me.columns.length = 0;
        }
        if(Ext.isArray(me.model)){
            me.model.length = 0;
        }
        if(Ext.isArray(me.totals)){
            me.totals.length = 0;
        }
        me.columns = me.model = me.totals = me.keysMap = null;

        me.isDestroyed = true;

        me.callParent(arguments);
    },

    /**
     * The arguments are combined in a string and the function returns the crc32
     * for that key
     *
     * @deprecated 6.0
     * @method formatKeys
     * @returns {String}
     */

    /**
     * Return a unique id for the specified value. The function builds a keys map so that same values get same ids.
     *
     * @param value
     * @returns {String}
     *
     * @private
     */
    getKey: function(value){
        var me = this;

        me.keysMap = me.keysMap || {};
        if(!Ext.isDefined(me.keysMap[value])){
            me.keysMap[value] = Ext.id();
        }
        return me.keysMap[value];
    },

    /**
     * Natural Sort algorithm for Javascript - Version 0.8 - Released under MIT license
     * Author: Jim Palmer (based on chunking idea from Dave Koelle)
     * https://github.com/overset/javascript-natural-sort/blob/master/naturalSort.js
     *
     * @private
     */
    naturalSort: (function () {
        var re = /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,
            sre = /^\s+|\s+$/g,   // trim pre-post whitespace
            snre = /\s+/g,        // normalize all whitespace to single ' ' character
            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            hre = /^0x[0-9a-f]+$/i,
            ore = /^0/,
            normChunk = function(s, l) {
                // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
                s = s || '';
                return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
            };

        return function (a, b) {
            // convert all to strings strip whitespace
            var x = String(a instanceof Date ? a.getTime() : (a || '')).replace(sre, ''),
                y = String(b instanceof Date ? b.getTime() : (b || '')).replace(sre, ''),
            // chunk/tokenize
                xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
                yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
            // numeric, hex or date detection
                xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
                yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
                oFxNcL, oFyNcL;
            // first try and sort Hex codes or Dates
            if (yD) {
                if ( xD < yD ) { return -1; }
                else if ( xD > yD ) { return 1; }
            }
            // natural sorting through split numeric strings and default strings
            for(var cLoc=0, xNl = xN.length, yNl = yN.length, numS=Math.max(xNl, yNl); cLoc < numS; cLoc++) {
                oFxNcL = normChunk(xN[cLoc], xNl);
                oFyNcL = normChunk(yN[cLoc], yNl);
                // handle numeric vs string comparison - number < string - (Kyle Adams)
                if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
                // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
                else if (typeof oFxNcL !== typeof oFyNcL) {
                    oFxNcL += '';
                    oFyNcL += '';
                }
                if (oFxNcL < oFyNcL) { return -1; }
                if (oFxNcL > oFyNcL) { return 1; }
            }
            return 0;
        };
    }()),

    /**
     *
     * Initialize the matrix with the new config object
     *
     * @param firstTime
     * @param config
     *
     * @private
     *
     */
    initialize: function(firstTime, config){
        var me = this,
            props = [
                'viewLayoutType', 'rowSubTotalsPosition', 'rowGrandTotalsPosition',
                'colSubTotalsPosition', 'colGrandTotalsPosition', 'showZeroAsBlank'
            ], i;

        // initialize the results object
        me.initResults();

        // initialize aggregates
        me.initAggregates(config.aggregate || []);

        // initialize dimensions and build axis tree
        me.initAxis(config.leftAxis || [], config.topAxis || []);

        for(i = 0; i < props.length; i++){
            if(config.hasOwnProperty(props[i])){
                me[props[i]] = config[props[i]];
            }
        }
        me.totals = [];
        me.keysMap = null;

        if(firstTime){
            me.pivotStore = Ext.create('Ext.data.ArrayStore', {
                autoDestroy:    false,
                fields:         []
            });

            me.delayedTask = new Ext.util.DelayedTask(me.startProcess, me);

            if(Ext.isFunction(me.onInitialize)){
                me.onInitialize();
            }
        }
    },

    /**
     * Template method called to do your internal initialization when you extend this class.
     */
    onInitialize: Ext.emptyFn,

    /**
     * Template method called before destroying the instance.
     */
    onDestroy: Ext.emptyFn,

    /**
     * Call this function to reconfigure the matrix with a new set of configs
     *
     * @param {Object} config Config object which has all configs that you want to change on this instance
     */
    reconfigure: function(config){
        var me = this,
            config = Ext.clone(config || {});

        me.initialize(false, config);

        me.clearData();

        if(Ext.isFunction(me.onReconfigure)){
            me.onReconfigure(config);
        }

        me.delayedTask.delay(5);
    },

    /**
     * Template function called when the matrix has to be reconfigured with a new set of configs.
     *
     * @param {Object} config Config object which has all configs that need to be changed on this instance
     */
    onReconfigure: Ext.emptyFn,

    /**
     * Initialize the Results object
     *
     * @private
     */
    initResults: function(){
        Ext.destroy(this.results);
        this.results = Ext.create('Ext.pivot.result.Collection', {
            resultType: this.resultType,
            matrix:     this
        });
    },

    /**
     * @private
     */
    initAggregates: function(aggregates){
        var me = this,
            i, item;

        Ext.destroy(me.aggregate);
        me.aggregate = Ext.create('Ext.pivot.MixedCollection');
        me.aggregate.getKey = function(item){
            return item.getId();
        };

        if(Ext.isEmpty(aggregates)){
            return;
        }

        aggregates = Ext.Array.from(aggregates);

        for(i = 0; i < aggregates.length; i++){
            item = aggregates[i];
            Ext.applyIf(item, {
                isAggregate:        true,
                align:              'right',
                showZeroAsBlank:    me.showZeroAsBlank
            });
            me.aggregate.add(Ext.create('Ext.pivot.dimension.Item', item));
        }
    },

    /**
     * @private
     */
    initAxis: function(leftAxis, topAxis){
        var me = this;

        leftAxis = Ext.Array.from(leftAxis || []);
        topAxis = Ext.Array.from(topAxis || []);

        Ext.destroy(me.leftAxis);
        me.leftAxis = Ext.Factory.pivotaxis({
            type:       me.leftAxisType,
            matrix:     me,
            dimensions: leftAxis,
            isLeftAxis:   true
        });

        Ext.destroy(me.topAxis);
        me.topAxis = Ext.Factory.pivotaxis({
            type:       me.topAxisType,
            matrix:     me,
            dimensions: topAxis,
            isLeftAxis:   false
        });
    },

    /**
     * This function clears any data that was previously calculated/generated.
     *
     */
    clearData: function(){
        var me = this;

        me.fireEvent('cleardata', me);

        me.leftAxis.clear();
        me.topAxis.clear();
        me.results.clear();

        if(Ext.isArray(me.columns)){
            me.columns.length = 0;
        }

        if(Ext.isArray(me.model)){
            me.model.length = 0;
        }

        me.totals = [];
        me.keysMap = null;

        if(me.pivotStore){
            me.pivotStore.removeAll(true);
        }
    },

    /**
     * Template function called when the calculation process is started.
     * This function needs to be implemented in the subclass.
     */
    startProcess: Ext.emptyFn,

    /**
     * Call this function after you finished your matrix processing.
     * This function will build up the pivot store and column headers.
     */
    endProcess: function(){
        var me = this;

        // force tree creation on both axis
        me.leftAxis.getTree();
        me.topAxis.getTree();

        // build pivot store model and column headers
        me.buildModelAndColumns();

        // build pivot store rows
        me.buildPivotStore();
        if(Ext.isFunction(me.onBuildStore)){
            me.onBuildStore(me.pivotStore);
        }
        me.fireEvent('storebuilt', me, me.pivotStore);

        me.fireEvent('done');
    },

    /**
     * Template function called after the pivot store model was created.
     * You could extend the model in a subclass if you implement this method.
     *
     * @param {Array} model
     */
    onBuildModel: Ext.emptyFn,

    /**
     * Template function called after the pivot columns were created.
     * You could extend the columns in a subclass if you implement this method.
     *
     * @param {Array} columns
     */
    onBuildColumns: Ext.emptyFn,

    /**
     * Template function called after a pivot store record was created.
     * You can use this to populate the record with your data.
     *
     * @param {Ext.data.Model} record
     */
    onBuildRecord: Ext.emptyFn,

    /**
     * Template function called before building grand total records.
     * Use it to add additional grand totals to the pivot grid.
     * You have to push objects into the totals array with properties for each matrix.model fields.
     * For each object that you add a new record will be added to the pivot store
     * and will be styled as a grand total.
     *
     * @param {Array} totals
     */
    onBuildTotals: Ext.emptyFn,

    /**
     * Template function called after the pivot store was created.
     *
     * @param {Ext.data.ArrayStore} store
     */
    onBuildStore: Ext.emptyFn,

    /**
     * This function dynamically builds the model of the pivot records.
     *
     * @private
     */
    buildModelAndColumns: function(){
        var me = this;

        me.model = [
            {name: 'id', type: 'string'}
            //{name: 'info', type: 'object'}
        ];

        me.buildColumnHeaders(false);
    },

    /**
     * @private
     */
    buildColumnHeaders: function(disableChangeModel){
        var me = this;

        me.internalCounter = 0;
        me.columns = [];

        if(me.viewLayoutType == 'compact'){
            me.generateCompactLeftAxis(disableChangeModel);
        }else{
            me.leftAxis.dimensions.each(function(item){
                this.parseLeftAxisDimension(item, disableChangeModel);
            }, me);
        }

        if(me.colGrandTotalsPosition == 'first'){
            me.columns.push(me.parseAggregateForColumn(null, {
                text:       me.textGrandTotalTpl,
                grandTotal: true
            }, disableChangeModel));
        }
        Ext.Array.each(me.topAxis.getTree(), function(item){
            this.parseTopAxisItem(item, disableChangeModel);
        }, me);

        if(me.colGrandTotalsPosition == 'last'){
            me.columns.push(me.parseAggregateForColumn(null, {
                text:       me.textGrandTotalTpl,
                grandTotal: true
            }, disableChangeModel));
        }

        // call the hook functions
        if(!disableChangeModel){
            if(Ext.isFunction(me.onBuildModel)){
                me.onBuildModel(me.model);
            }
            me.fireEvent('modelbuilt', me, me.model);
        }
        if(Ext.isFunction(me.onBuildColumns)){
            me.onBuildColumns(me.columns);
        }
        me.fireEvent('columnsbuilt', me, me.columns);
    },

    /**
     * @private
     */
    parseLeftAxisDimension: function(dimension, disableChangeModel){
        if(!disableChangeModel){
            this.model.push({
                name:   dimension.getId(),
                type:   'string'
            });
        }
        this.columns.push({
            dataIndex:  dimension.getId(),
            text:       dimension.header,
            dimension:  dimension,
            leftAxis:   true
        });
    },

    /**
     * @private
     */
    generateCompactLeftAxis: function(disableChangeModel){
        var me = this;

        if(!disableChangeModel){
            me.model.push({
                name:   me.compactViewKey,
                type:   'string'
            });
        }
        me.columns.push({
            dataIndex:  me.compactViewKey,
            text:       me.textRowLabels,
            leftAxis:   true,
            width:      200
        });
    },

    /**
     * @private
     */
    parseTopAxisItem: function(item, disableChangeModel){
        var me = this,
            columns = [],
            retColumns = [],
            o1, o2, doAdd = false;

        if(!item.children){
            columns = me.parseAggregateForColumn(item, null, disableChangeModel);
            if(item.level === 0){
                me.columns.push(columns);
            }else{
                // we reached the deepest level so we can add to the model now
                return columns;
            }
        }else{
            if(me.colSubTotalsPosition == 'first'){
                o2 = me.addColSummary(item, disableChangeModel, true);
                if(o2){
                    retColumns.push(o2);
                }
            }

            // this part has to be done no matter if the column is added to the grid or not
            // the dataIndex is generated incrementally
            Ext.Array.each(item.children, function(child){
                var ret = me.parseTopAxisItem(child, disableChangeModel);

                if(Ext.isArray(ret)){
                    columns = Ext.Array.merge(columns, ret);
                }else{
                    columns.push(ret);
                }
            });

            if(item.expanded || !disableChangeModel){
                o1 = {
                    text:           item.name,
                    columns:        columns,
                    key:            item.key,
                    xcollapsible:   item.expanded,
                    xexpanded:      item.expanded,
                    xexpandable:    true
                };
                if(item.level === 0){
                    me.columns.push(o1);
                }
                retColumns.push(o1);
            }

            if(me.colSubTotalsPosition == 'last'){
                o2 = me.addColSummary(item, disableChangeModel, true);
                if(o2){
                    retColumns.push(o2);
                }
            }

            if(me.colSubTotalsPosition == 'none'){
                o2 = me.addColSummary(item, disableChangeModel, false);
                if(o2){
                    retColumns.push(o2);
                }
            }

            return retColumns;
        }
    },

    /**
     * @private
     */
    addColSummary: function(item, disableChangeModel, addColumns){
        var me = this,
            o2, doAdd = false;

        // add subtotal columns if required
        o2 = me.parseAggregateForColumn(item, {
            text:           item.expanded ? item.getTextTotal() : item.name,
            subTotal:       true
        }, disableChangeModel);

        if(addColumns){
            doAdd = true;
        }else{
            // this has to change since we want to show the totals
            // when the column is collapsed but hide them when is expanded
            /*o2 = {
             text:           item.expanded ? item.getTextTotal() : item.name,
             dimension:      item.dimension,
             subTotal:       true
             };*/
            doAdd = !item.expanded;
        }

        if(doAdd){
            if(item.level === 0){
                me.columns.push(o2);
            }

            Ext.apply(o2, {
                key:            item.key,
                xcollapsible:   !item.expanded,
                xexpanded:      item.expanded,
                xexpandable:    !item.expanded
            });
            return o2;
        }
    },

    /**
     * @private
     */
    parseAggregateForColumn: function(item, config, disableChangeModel){
        var me = this,
            columns = [],
            column = {};

        me.aggregate.each(function(agg){
            me.internalCounter++;
            if(!disableChangeModel){
                me.model.push({
                    name:           'c' + me.internalCounter,
                    type:           'auto',
                    defaultValue:   undefined,
                    useNull:        true,
                    col:            item ? item.key : me.grandTotalKey,
                    agg:            agg.getId()
                });
            }

            columns.push({
                dataIndex:  'c' + me.internalCounter,
                text:       agg.header,
                topAxis:    true,   // generated based on the top axis
                subTotal:   (config ? config.subTotal === true : false),
                grandTotal: (config ? config.grandTotal === true : false),
                dimension:  agg
            });
        });

        if(columns.length == 0 && me.aggregate.getCount() == 0){
            me.internalCounter++;
            column = Ext.apply({
                text:       item ? item.name : '',
                dataIndex:  'c' + me.internalCounter
            }, config || {});
        }else if(columns.length == 1){
            column = Ext.applyIf({
                text:   item ? item.name : ''
            }, columns[0]);
            Ext.apply(column, config || {});
            // if there is only one aggregate available then don't show the grand total text
            // use the aggregate header instead.
            if(config && config.grandTotal && me.aggregate.getCount() == 1){
                column.text = me.aggregate.getAt(0).header || config.text;
            }
        }else{
            column = Ext.apply({
                text:       item ? item.name : '',
                columns:    columns
            }, config || {});
        }
        return column;
    },

    /**
     * @private
     */
    buildPivotStore: function(){
        var me = this;

        if(Ext.isFunction(me.pivotStore.model.setFields)){
            me.pivotStore.model.setFields(me.model);
        }else{
            // ExtJS 5 has no "setFields" anymore so fallback to "replaceFields"
            me.pivotStore.model.replaceFields(me.model, true);
        }
        me.pivotStore.removeAll(true);

        Ext.Array.each(me.leftAxis.getTree(), me.addRecordToPivotStore, me);
        me.addGrandTotalsToPivotStore();
    },

    /**
     * @private
     */
    addGrandTotalsToPivotStore: function(){
        var me = this,
            totals = [];

        // first of all add the grand total
        totals.push({
            title:      me.textGrandTotalTpl,
            values:     me.preparePivotStoreRecordData({key: me.grandTotalKey})
        });

        // additional grand totals can be added. collect these using events or
        if(Ext.isFunction(me.onBuildTotals)){
            me.onBuildTotals(totals);
        }
        me.fireEvent('buildtotals', me, totals);

        // add records to the pivot store for each grand total
        Ext.Array.forEach(totals, function(t){
            if(Ext.isObject(t) && Ext.isObject(t.values)){
                //t.values.id = '';
                me.totals.push({
                    title:      t.title || '',
                    record:     me.pivotStore.add(t.values)[0]
                });
            }
        });
    },

    /**
     * @private
     */
    addRecordToPivotStore: function(item){
        var me = this,
            record;

        if(!item.children){
            // we are on the deepest level so it's time to build the record and add it to the store
            record = me.pivotStore.add(me.preparePivotStoreRecordData(item));
            item.record = record[0];
            // this should be moved into the function "preparePivotStoreRecordData"
            if(Ext.isFunction(me.onBuildRecord)){
                me.onBuildRecord(record[0]);
            }
            me.fireEvent('recordbuilt', me, record[0]);
        }else{
            Ext.Array.each(item.children, function(child){
                me.addRecordToPivotStore(child);
            });
        }
    },

    /**
     * Create an object using the pivot model and data of an axis item.
     * This object is used to create a record in the pivot store.
     *
     * @private
     */
    preparePivotStoreRecordData: function(group){
        var me = this,
            data = {};

        data['id'] = group.key;
        Ext.apply(data, group.data || {}); // merge the left axis data

        Ext.Array.each(me.model, function(field){
            var result;

            if(field.col && field.agg){
                result = me.results.get(group.key, field.col);
                if(result){
                    data[field.name] = result.getValue(field.agg);
                }
            }
        });

        if(me.viewLayoutType == 'compact'){
            data[me.compactViewKey] = group.name;
        }

        // @TODO this function is used intensively in the pivot grid when the pivot grid store is generated
        // there is a need for a "recordbuild" event so that the developer can add
        // additional data to the record that will be added to the pivot store.
        // the matrix should fire "recordbuild" and the pivot grid should relay that event

        return data;
    },

    /**
     * Returns the generated model fields
     *
     * @returns {Object[]} Array of config objects used to build the pivot store model fields
     */
    getColumns: function(){
        return this.model;
    },

    /**
     * Returns all generated column headers
     *
     * @returns {Object[]} Array of config objects used to build the pivot grid columns
     */
    getColumnHeaders: function(){
        var me = this;

        if(!me.model){
            me.buildModelAndColumns();
        }else{
            me.buildColumnHeaders(true);
        }
        return me.columns;
    },

    /**
     *    Find out if the specified key belongs to a row group.
     *
     *    Returns FALSE if the key is not found.
     *
     *    Returns 0 if the current key doesn't belong to a group. That means that group children items will always be 0.
     *
     *    If it'a a group then it returns the level number which is always > 0.
     *
     * @param {String} key
     * @returns {Number/Boolean}
     */
    isGroupRow: function(key) {
        var obj = this.leftAxis.findTreeElement('key', key);

        if(!obj) return false;
        return (obj.node.children && obj.nodel.children.length == 0) ? 0 : obj.level;
    },

    /**
     *    Find out if the specified key belongs to a col group.
     *
     *    Returns FALSE if the key is not found.
     *
     *    Returns 0 if the current key doesn't belong to a group. That means that group children items will always be 0.
     *
     *    If it'a a group then it returns the level number which is always > 0.
     *
     * @param {String} key
     * @returns {Number/Boolean}
     */
    isGroupCol: function(key) {
        var obj = this.topAxis.findTreeElement('key', key);

        if(!obj) return false;
        return (obj.node.children && obj.node.children.length == 0) ? 0 : obj.level;
    },

    deprecated: {
        '6.0': {
            properties: {
                mztype: 'type',
                mztypeLeftAxis: 'leftAxisType',
                mztypeTopAxis: 'topAxisType'
            }
        }
    }
});
