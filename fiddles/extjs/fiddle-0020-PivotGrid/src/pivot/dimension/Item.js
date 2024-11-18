/**
 * This class is used to initialize the dimensions defined on the pivot grid leftAxis,
 * topAxis and aggregate.
 *
 *
 */
Ext.define('Ext.pivot.dimension.Item', {
    alternateClassName: [
        'Mz.aggregate.dimension.Item'
    ],

    requires: [
        'Ext.pivot.MixedCollection',
        'Ext.pivot.filter.Label',
        'Ext.pivot.filter.Value'
    ],

    /**
     * @cfg {String} header (required)
     *
     * This text is visible in the pivot grid in the following cases:
     *
     * - the dimension is defined on the left axis. The pivot grid will generate one grid column per dimension and
     * this header will go into the grid column header.
     *
     * - the dimension is defined on the aggregate. The pivot grid will generate one grid column per dimension per top
     * axis label. If there are at least 2 aggregate dimensions then this header will be visible. When only one is
     * defined the aggregate dimension header is replaced by the top axis label.
     *
     * - if the {@link Ext.pivot.plugin.Configurator Configurator plugin} is used then this header will be visible
     * in the axis panels.
     *
     */
    header:             '',

    /**
     * @cfg {String} dataIndex (required)
     * The field name on the record from where this dimension extracts data.
     */
    dataIndex:          '',

    /**
     * @cfg {String} sortIndex
     * Field name on the record used when sorting this dimension results. Defaults to {@link #dataIndex} if
     * none is specified.
     */
    sortIndex:          '',

    /**
     * @cfg {Number} [width=100]
     * Default column width when this dimension is used on the top/left axis.
     * Used by the generated columns.
     */
    width:              100,

    /**
     * @cfg {Number} [flex=0]
     * Column flex when this dimension is used on the top/left axis.
     * Used by the generated columns.
     */
    flex:               0,

    /**
     * @cfg {String} [align="left"]
     * Column alignment when this dimension is used on the top/left axis.
     * Used by the generated columns.
     */
    align:              'left',

    /**
     * @cfg {Boolean} [sortable=true]
     * Is this dimension sortable when the pivot is generated?
     */
    sortable:           true,

    /**
     * @cfg {"ASC"/"DESC"} [direction="ASC"]
     * If this dimension is sortable then this is the type of sorting.
     */
    direction:          'ASC',

    /**
     * @cfg {Function} sorterFn
     * Provide here your own sorting function for this dimension.
     * If none is specified then the defaultSorterFn is used.
     */
    sorterFn:           null,

    /**
     * @cfg {Boolean} [caseSensitiveSort=true]
     * If this dimension is sortable, should we do a case sensitive sort?
     */
    caseSensitiveSort:  true,

    /**
     * @cfg {Ext.pivot.filter.Base} filter
     * Provide a filter configuration to filter your axis items.
     * This works only on left/top axis dimensions.
     *
     * Example for a label filter:
     *
     *      {
     *          dataIndex:  'year',
     *          header:     'Year',
     *          filter: {
     *              type:       'label',
     *              operator:   '=',
     *              value:      2012
     *          }
     *      }
     *
     *
     * Example for a value filter:
     *
     *      {
     *          dataIndex:  'year',
     *          header:     'Year',
     *          filter: {
     *              type:       'value',
     *              operator:   'between',
     *              value:      [2012, 2015]
     *          }
     *      }
     *
     *
     * Example for a top 10 value filter:
     *
     *      {
     *          dataIndex:  'year',
     *          header:     'Year',
     *          filter: {
     *              type:           'value',
     *              operator:       'top10',
     *              dimensionId:    'value',   // this is the id of an aggregate dimension
     *              topType:        'items',
     *              topOrder:       'bottom'
     *          }
     *      }
     */
    filter:             null,

    /**
     * @cfg {String/Function} renderer
     * Default renderer for this dimension. This renderer is used when displaying the data in the pivot table.
     * You can either provide a string value with a number format or your own function.
     * The renderer function will have only one parameter and that is the value that need to be formatted.
     * The renderer function is running in the Dimension scope.
     *
     * If a renderer function is defined for a left or top axis dimension then this is NOT used in the grid.
     * It is instead used for formatting the value as you wish.
     *
     * On the other hand if you define a renderer function on an aggregate dimension then this will be
     * used in the grid and allows you to change cell formatting as well.
     */
    renderer:           null,

    /**
     * @cfg {Function} grouperFn
     * This function is used when the groups are generated for the axis.
     * It will return the value that will uniquely identify a group on the axis.
     * ie: you have a Date field that you want to group by year.
     * This renderer could return the year from that Date value.
     *
     * The function receives one parameter and that is the record.
     */
    grouperFn:          null,

    /**
     * @cfg {Strinbg} [blankText="(blank)"]
     * Default text to use when a group name is blank. This value is applied even if you set your own group renderer.
     */
    blankText:          '(blank)',

    /**
     * @cfg {Boolean} [showZeroAsBlank=false]
     * Should 0 values be displayed as blank? This config is used when
     * this is an aggregate dimension.
     */
    showZeroAsBlank:    false,

    /**
     * @cfg {String/Function} [aggregator="sum"]
     * This is the function that should be used to aggregate when this is an aggregate dimension.
     * You can either provide a function name available in {@link Ext.pivot.Aggregators} or
     * set your own function.
     *
     * It's probably best to override {@link Ext.pivot.Aggregators} to add you own function
     * and use that function name on this config. This way the stateles pivot will save this value.
     */
    aggregator:         'sum',

    /**
     * @property {Boolean} isAggregate
     * True to identify a dimension of an aggregate configuration.
     */
    isAggregate:        false,

    /**
     * @cfg {String} id
     * Unique id of this dimension.
     */
    id:                 '',

    /**
     * @cfg {Object[]} values
     * Collection of unique values on this dimension; each item has a "value" and a "display".
     */
    values:             null,

    /**
     * @property {Ext.pivot.matrix.Base} matrix
     * @readonly
     * Reference to the matrix object.
     */
    matrix:             null,

    constructor: function(config){
        var me = this,
            aggregators = Ext.pivot.Aggregators;

        me.initialConfig = config || {};

        if(config.isAggregate === true && Ext.isEmpty(config.align)){
            config.align = 'left';
        }
        Ext.apply(me, config || {});

        if(Ext.isEmpty(me.id)){
            // generate an internal id used by the matrix
            me.id = Ext.id();
        }

        if(me.isAggregate){
            if(Ext.isEmpty(me.dataIndex) && Ext.isDefined(me.measure)){
                me.dataIndex = me.measure;
                delete me.measure;
            }
            if(Ext.isEmpty(me.aggregator)){
                me.aggregator = 'sum';
            }
            if(Ext.isString(me.aggregator) && Ext.isFunction(aggregators[me.aggregator])) {
                me.aggregatorFn = Ext.bind(aggregators[me.aggregator], aggregators);
            }else if(Ext.isFunction(me.aggregator)){
                me.aggregatorFn = me.aggregator;
            }
            me.filter = false;
        }else{
            if(Ext.isObject(me.filter)){
                Ext.applyIf(me.filter, {
                    type:   'label',
                    parent: me
                });
                me.filter = Ext.Factory.pivotfilter(me.filter);
            }else{
                me.filter = false;
            }
        }

        if(!Ext.isFunction(me.grouperFn)){
            me.grouperFn = me.defaultGrouperFn;
        }
        if(me.sortable && !me.sorterFn){
            me.sorterFn = me.defaultSorterFn;
        }
        if(Ext.isEmpty(me.sortIndex)){
            me.sortIndex = me.dataIndex;
        }

        if(!me.renderer){
            me.renderer = me.getDefaultFormatRenderer(me.isAggregate ? '0,000.00' : '');
        }else if(Ext.isString(me.renderer)){
            me.renderer = me.getDefaultFormatRenderer(me.renderer);
        }

        me.values = Ext.create('Ext.pivot.MixedCollection');
        me.values.getKey = function(item){
            return item.value;
        };

        me.callParent(arguments);
    },

    destroy: function(){
        var me = this;

        Ext.destroyMembers(me, 'values', 'filter');
        me.matrix = me.values = me.filter = null;
    },

    /**
     * Returns the serialized dimension data.
     */
    serialize: function(){
        var me = this;

        return {
            id:                 me.id,
            header:             me.header,
            dataIndex:          me.dataIndex,
            sortIndex:          me.sortIndex,
            width:              me.width,
            flex:               me.flex,
            align:              me.align,
            sortable:           me.sortable,
            direction:          me.direction,
            caseSensitiveSort:  me.caseSensitiveSort,
            filter:             me.filter ? me.filter.serialize() : null,
            aggregator:         Ext.isString(me.aggregator) ? me.aggregator : 'sum', // functions cannot be serialized
            showZeroAsBlank:    me.showZeroAsBlank
        };
    },

    /**
     * Add unique values available for this dimension. These are used when filtering.
     *
     * @param value
     * @param display
     */
    addValue: function(value, display){
        if(!this.values.getByKey(value)){
            this.values.add({
                value:      value,
                display:    display
            });
        }
    },

    /**
     * Returns the collection of unique values available for this dimension.
     */
    getValues: function(){
        return this.values;
    },

    /**
     * Returns the internal id of this dimension.
     */
    getId: function(){
        return this.id;
    },

    /**
     * Default sorter function used to sort the axis dimensions on the same tree level.
     *
     * @param o1
     * @param o2
     *
     * @returns {Number}
     */
    defaultSorterFn: function(o1, o2){
        var me = this,
            s1 = o1.sortValue,
            s2 = o2.sortValue,
            result;

        if(s1 instanceof Date){
            s1 = s1.getTime();
        }
        if(s2 instanceof Date){
            s2 = s2.getTime();
        }
        if(!me.caseSensitiveSort){
            s1 = String(s1).toUpperCase();
            s2 = String(s2).toUpperCase();
        }
        result = Ext.pivot.matrix.Base.prototype.naturalSort(s1, s2);

        if(result < 0 && me.direction === 'DESC'){
            return 1;
        }
        if(result > 0 && me.direction === 'DESC'){
            return -1;
        }
        return result;
    },

    /**
     * Builds a renderer function by using the specified format.
     *
     * @param format Could be either a function or a string
     */
    getDefaultFormatRenderer: function(format){
        var me = this;

        return function(v){
            var positive;

            if(Ext.isEmpty(format)){
                return v;
            }

            if(Ext.isFunction(format)){
                return format.apply(me, arguments);
            }

            if(!Ext.isNumber(v)) {
                return v;
            }

            if(me.isAggregate && v === 0 && me.showZeroAsBlank){
                return '';
            }

            positive = (v >= 0);
            v = Math.abs(v);
            v = Ext.util.Format.number(v, format);

            return positive ? v : '-' + v;
        }
    },

    /**
     * Default grouper function used for rendering axis item values.
     * The grouper function can be used to group together multiple items.
     * Returns a group value
     *
     * @param record
     */
    defaultGrouperFn: function(record) {
        return record.get(this.dataIndex);
    }

});
