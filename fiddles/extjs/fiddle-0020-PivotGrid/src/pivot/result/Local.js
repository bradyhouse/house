/**
 * The Result object stores all calculated values for the aggregate dimensions
 * for a left/top item pair and all records that are used to calculate
 * those values.
 *
 * It is used by the {@link Ext.pivot.matrix.Local Local} matrix class.
 *
 */
Ext.define('Ext.pivot.result.Local', {
    extend: 'Ext.pivot.result.Base',

    alias: 'pivotresult.local',

    alternateClassName: [
        'Mz.aggregate.matrix.Result'
    ],

    /**
     * @property {Ext.data.Model[]} records
     *
     * Array of records for the left/top axis keys pair. Only available for a {@link Ext.pivot.matrix.Local Local} matrix.
     */
    records:        null,

    constructor: function(config){
        this.records = [];

        return this.callParent(arguments);
    },

    destroy: function(){
        this.records.length = 0;
        this.records = null;

        return this.callParent(arguments);
    },

    /**
     * Calculate all pivot aggregate dimensions for the internal records. Useful when using a
     * {@link Ext.pivot.matrix.Local Local} matrix.
     *
     */
    calculate: function(){
        var me = this,
            i, dimension,
            length = me.matrix.aggregate.getCount();

        // for each pivot aggregate dimension calculate the value and call addValue
        for(i = 0; i < length; i++){
            dimension = me.matrix.aggregate.getAt(i);
            me.addValue(dimension.getId(), dimension.aggregatorFn(me.records, dimension.dataIndex, me.matrix, me.leftKey, me.topKey));
        }
    },

    /**
     * Besides the calculation functions defined on your aggregate dimension you could
     * calculate values based on other store fields and custom functions.
     *
     * @param key The generated value will be stored in the result under this key for later extraction
     * @param dataIndex The dataIndex that should be used on the records for doing calculations
     * @param aggFn Your custom function
     */
    calculateByFn: function(key, dataIndex, aggFn){
        var me = this,
            v = aggFn(me.records, dataIndex, me.matrix, me.leftKey, me.topKey);

        me.addValue(key, v);

        return v;
    },

    /**
     * Add the specified record to the internal records storage.
     * These records will be used for calculating the pivot aggregate dimension values.
     * This should be used only when all calculations are done locally and not remotely.
     *
     * @param {Ext.data.Model} record
     */
    addRecord: function(record){
        this.records.push(record);
    }
});
