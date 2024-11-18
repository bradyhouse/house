/**
 * Base implementation of a filter. It handles common type of filters.
 *
 */
Ext.define('Ext.pivot.filter.Base', {
    alternateClassName: [
        'Mz.aggregate.filter.Abstract'
    ],

    alias: 'pivotfilter.base',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    /**
     * @cfg {String} mztype
     *
     * @deprecated 6.0 Use {@link #type} instead. The old type config was renamed to {@link #operator}.
     */

    /**
     * @cfg {String} operator (required)
     *
     * Operator to use to compare labels/values to this Filter's {@link #value}.
     *
     * The `between` and `not between` operators expect this filter's {@link #value} to be an array with two values.
     *
     * Possible values are:
     *
     *    * `<`
     *    * `<=`
     *    * `=`
     *    * `>=`
     *    * `>`
     *    * `!=`
     *    * `between`
     *    * `not between`
     */
    operator:       null,

    /**
     * @cfg {String} from
     * @deprecated 6.0 Use {@link #value} instead as an array with 2 values.
     *
     * Used in case of a 'between/not between' type of filter
     *
     */

    /**
     * @cfg {String} to
     * @deprecated 6.0 Use {@link #value} instead as an array with 2 values.
     *
     * Used in case of a 'between/not between' operator
     *
     */

    /**
     * @cfg {String/Array} value (required)
     *
     * Value to filter by. For 'between' and 'not between' operators this should be an array of values.
     */
    value:          null,

    /**
     * @cfg {Boolean} [caseSensitive=true]
     *
     * During filtering should we use case sensitive comparison?
     *
     */
    caseSensitive:  true,

    /**
     * @property {Ext.pivot.dimension.Item} parent Reference to the parent dimension object.
     * @readonly
     *
     * @private
     */
    parent:         null,

    constructor: function(config){
        Ext.apply(this, config || {});
        return this.callParent(arguments);
    },

    destroy: function(){
        this.parent = null;
        return this.callParent(arguments);
    },

    /**
     * Returns the serialized filter data as an object.
     *
     * @returns {Object}
     */
    serialize: function(){
        var me = this;

        return Ext.apply({
            type:           me.type,
            operator:       me.operator,
            value:          me.value,
            caseSensitive:  me.caseSensitive
        }, me.getSerialArgs() || {});
    },

    /**
     * Template method to be implemented by all subclasses that is used to
     * get and return serialized filter data.
     *
     * Defaults to Ext.emptyFn.
     *
     */
    getSerialArgs: Ext.emptyFn,

    /**
     * Check if the specified value matches the filter.
     *
     * @returns Boolean True if the value matches the filter
     * @param value
     *
     */
    isMatch: function(value){
        var me = this,
            sorter = Ext.pivot.matrix.Base.prototype.naturalSort,
            v = me.value,
            ret, retFrom, retTo, from, to;

        v = (Ext.isArray(v) ? v[0] : v) || '';
        ret = (me.caseSensitive ? sorter(value || '', v) : sorter(String(value || '').toLowerCase(), String(v).toLowerCase()));

        if(me.operator == '='){
            return (ret === 0);
        }

        if(me.operator == '!='){
            return (ret !== 0);
        }

        if(me.operator == '>'){
            return (ret > 0);
        }

        if(me.operator == '>='){
            return (ret >= 0);
        }

        if(me.operator == '<'){
            return (ret < 0);
        }

        if(me.operator == '<='){
            return (ret <= 0);
        }

        v = me.value;
        from = (Ext.isArray(v) ? v[0] : v) || '';
        to = (Ext.isArray(v) ? v[1] : v) || '';
        retFrom = (me.caseSensitive ? sorter(String(value || '').toLowerCase(), String(from).toLowerCase()) : sorter(value || '', from));
        retTo = (me.caseSensitive ? sorter(String(value || '').toLowerCase(), String(to).toLowerCase()) : sorter(value || '', to));

        if(me.operator == 'between'){
            return (retFrom >= 0 && retTo <= 0);
        }

        if(me.operator == 'not between'){
            return !(retFrom >= 0 && retTo <= 0);
        }

        // no valid operator was specified. ignore filtering
        return true;
    }
});
