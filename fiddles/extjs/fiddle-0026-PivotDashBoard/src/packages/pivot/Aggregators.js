/**
 * This class contains all predefined aggregator functions for the pivot grid.
 * @singleton
 *
 */
Ext.define('Ext.pivot.Aggregators', {
    alternateClassName: [
        'Mz.aggregate.Aggregators'
    ],

    singleton: true,

    /**
     * Calculates the sum of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    sum: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var length = records.length,
            total  = 0,
            i;

        for (i = 0; i < length; i++) {
            total += Ext.Number.from(records[i].get(measure), 0);
        }

        return total;
    },

    /**
     * Calculates the avg of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    avg: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var length = records.length,
            total  = 0,
            i;

        for (i = 0; i < length; i++) {
            total += Ext.Number.from(records[i].get(measure), 0);
        }

        return length > 0 ? (total / length) : 0;
    },

    /**
     * Calculates the min of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    min: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var data   = [],
            length = records.length,
            i, v;

        for (i = 0; i < length; i++) {
            data.push(records[i].get(measure));
        }

        v = Ext.Array.min(data);
        return v;
    },

    /**
     * Calculates the max of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    max: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var data   = [],
            length = records.length,
            i;

        for (i = 0; i < length; i++) {
            data.push(records[i].get(measure));
        }

        v = Ext.Array.max(data);
        return v;
    },

    /**
     * Calculates the count of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    count: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        return records.length;
    },

    /**
     * Calculates the percentage from the row group sum.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    groupSumPercentage: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var sumFn = Ext.pivot.Aggregators.sum,
            length = records.length,
            result, resultParent,
            sum = 0, sumParent = 0,
            keys = rowGroupKey.split(matrix.keysSeparator);

        if(length == 0) return 0;

        keys.pop();
        keys = keys.join(matrix.keysSeparator);
        if(Ext.isEmpty(keys)){
            keys = matrix.grandTotalKey;
        }

        result = matrix.results.get(rowGroupKey, colGroupKey);
        if(result){
            sum = result.getValue('groupSum');
            if(!Ext.isDefined(sum)){
                sum = result.calculateByFn('groupSum', measure, sumFn);
            }
        }

        resultParent = matrix.results.get(keys, colGroupKey);
        if(resultParent){
            sumParent = resultParent.getValue('groupSum');
            if(!Ext.isDefined(sumParent)){
                sumParent = resultParent.calculateByFn('groupSum', measure, sumFn);
            }
        }

        return (sumParent > 0 && sum > 0) ? sum/sumParent * 100 : 0;
    },

    /**
     * Calculates the percentage from the row group count.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    groupCountPercentage: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var countFn = Ext.pivot.Aggregators.count,
            length = records.length,
            result, resultParent,
            sum = 0, sumParent = 0,
            keys = rowGroupKey.split(matrix.keysSeparator);

        if(length == 0) return 0;

        keys.pop();
        keys = keys.join(matrix.keysSeparator);
        if(Ext.isEmpty(keys)){
            keys = matrix.grandTotalKey;
        }

        result = matrix.results.get(rowGroupKey, colGroupKey);
        if(result){
            sum = result.getValue('groupCount');
            if(!Ext.isDefined(sum)){
                sum = result.calculateByFn('groupCount', measure, countFn);
            }
        }

        resultParent = matrix.results.get(keys, colGroupKey);
        if(resultParent){
            sumParent = resultParent.getValue('groupCount');
            if(!Ext.isDefined(sumParent)){
                sumParent = resultParent.calculateByFn('groupCount', measure, countFn);
            }
        }

        return (sumParent > 0 && sum > 0) ? sum/sumParent * 100 : 0;
    },

    /**
     * Calculates the sample variance of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    variance: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var me = Ext.pivot.Aggregators,
            length = records.length,
            avg = me.avg.apply(me, arguments),
            total  = 0,
            i;

        if(avg > 0){
            for (i = 0; i < length; i++) {
                total += Math.pow( Ext.Number.from(records[i].get(measure), 0) - avg, 2 );
            }
        }

        return (total > 0 && length > 1) ? (total / (length - 1)) : 0;
    },

    /**
     * Calculates the population variance of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    varianceP: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var me = Ext.pivot.Aggregators,
            length = records.length,
            avg = me.avg.apply(me, arguments),
            total  = 0,
            i;

        if(avg > 0){
            for (i = 0; i < length; i++) {
                total += Math.pow( Ext.Number.from(records[i].get(measure), 0) - avg, 2 );
            }
        }

        return (total > 0 && length > 0) ? (total / length) : 0;
    },

    /**
     * Calculates the sample standard deviation of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    stdDev: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var me = Ext.pivot.Aggregators,
            v = me.variance.apply(me, arguments);

        return v > 0 ? Math.sqrt(v) : 0;
    },

    /**
     * Calculates the population standard deviation of all records using the measure field.
     *
     * @param {Array} records Records to process.
     * @param {String} measure Field to aggregate by.
     * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
     * @param {String} rowGroupKey Key of the left axis item.
     * @param {String} colGroupKey Key of the top axis item.
     *
     * @return {Number}
     */
    stdDevP: function(records, measure, matrix, rowGroupKey, colGroupKey) {
        var me = Ext.pivot.Aggregators,
            v = me.varianceP.apply(me, arguments);

        return v > 0 ? Math.sqrt(v) : 0;
    }

});
