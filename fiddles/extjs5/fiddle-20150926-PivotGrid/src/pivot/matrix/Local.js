/**
 * This type of matrix does all calculations in the browser.
 *
 * You need to provide at least a store that contains the records
 * that need to be processed.
 *
 * The store records are processed in batch jobs to avoid freezing the browser.
 * You can also configure how many records should be processed per job
 * and time to wait between jobs.
 *
 *
 * Example:
 *
 *      {
 *          xtype: 'pivotgrid',
 *          matrixConfig: {
 *              type: 'local',
 *              store: 'yourStore'
 *          },
 *
 *          leftAxis: [...],
 *          topAxis: [...],
 *          aggregate: [...]
 *      }
 *
 */
Ext.define('Ext.pivot.matrix.Local', {
    alternateClassName: [
        'Mz.aggregate.matrix.Local'
    ],

    extend: 'Ext.pivot.matrix.Base',

    alias:  'pivotmatrix.local',

    requires: [
        'Ext.pivot.matrix.Base',
        'Ext.pivot.axis.Local',
        'Ext.pivot.result.Local'
    ],

    resultType:     'local',
    leftAxisType:   'local',
    topAxisType:    'local',

    /**
     * Fires before updating the matrix data due to a change in the bound store.
     *
     * @event beforeupdate
     * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
     * @private
     */

    /**
     * Fires after updating the matrix data due to a change in the bound store.
     *
     * @event afterupdate
     * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
     * @private
     */

    /**
     * @cfg {Ext.data.Store/String} store (required)
     *
     * This is the store that needs to be processed. The store should contain all records
     * and cannot be paginated or buffered.
     */
    store:              null,

    /**
     * @cfg {Number} recordsPerJob
     *
     * The matrix processes the records in multiple jobs.
     * Specify here how many records should be processed in a single job.
     */
    recordsPerJob:      1000,

    /**
     * @cfg {Number} timeBetweenJobs
     *
     * How many milliseconds between processing jobs?
     */
    timeBetweenJobs:    2,

    onInitialize: function(){
        var me = this;

        me.localDelayedTask = new Ext.util.DelayedTask(me.delayedProcess, me);
        me.newRecordsDelayedTask = new Ext.util.DelayedTask(me.onOriginalStoreAddDelayed, me);
        me.updateRecordsDelayedTask = new Ext.util.DelayedTask(me.onOriginalStoreUpdateDelayed, me);

        me.callParent(arguments);
    },

    onReconfigure: function(config){
        var me = this,
            store, newStore;

        if(config.store){
            // a new store was passed to
            newStore = config.store;
        }else{
            if(me.store){
                if(me.store.isStore && !me.storeListeners){
                    // we have a store but no listeners were attached to it
                    store = me.store;
                }else{
                    // we need to initialize the store that we got
                    newStore = me.store;
                }
            }
        }

        if(newStore){
            store = Ext.getStore(newStore || '');
            if(Ext.isEmpty(store) && Ext.isString(newStore)){
                store = Ext.create(newStore);
            }
        }

        if(store && store.isStore){
            Ext.destroy(me.storeListeners);

            if(me.store && me.store.autoDestroy && store != me.store){
                Ext.destroy(me.store);
            }

            // let's initialize the store (if needed)
            me.store = store;
            // add listeners to the store
            me.storeListeners = me.store.on({
                refresh:        me.startProcess,
                //datachanged:    me.startProcess,
                beforeload:     me.onOriginalStoreBeforeLoad,
                add:            me.onOriginalStoreAdd,
                update:         me.onOriginalStoreUpdate,
                remove:         me.onOriginalStoreRemove,
                clear:          me.startProcess,
                scope:          me,
                destroyable:    true
            });
        }

        me.callParent(arguments);
    },

    onDestroy: function(){
        var me = this;

        me.localDelayedTask.cancel();
        me.localDelayedTask = null;
        me.newRecordsDelayedTask.cancel();
        me.newRecordsDelayedTask = null;
        me.updateRecordsDelayedTask.cancel();
        me.updateRecordsDelayedTask = null;

        if(Ext.isArray(me.records)){
            me.records.length = 0;
        }
        me.records = null;

        Ext.destroy(me.storeListeners);
        if(me.store && me.store.isStore && me.store.autoDestroy){
            Ext.destroy(me.store);
        }
        me.store = me.storeListeners = null;

        me.callParent(arguments);
    },

    /**
     * @private
     */
    onOriginalStoreBeforeLoad: function(store){
        this.fireEvent('start', this);
    },

    /**
     * @private
     */
    onOriginalStoreAdd: function(store, records){
        var me = this;

        me.newRecords = me.newRecords || [];
        me.newRecords = Ext.Array.merge(me.newRecords, Ext.Array.from(records));

        me.newRecordsDelayedTask.delay(100);
    },

    /**
     * @private
     */
    onOriginalStoreAddDelayed: function(){
        var me = this,
            i, records;

        records = Ext.Array.from(me.newRecords || []);
        for(i = 0; i < records.length; i++){
            me.processRecord(records[i], i, records.length);
        }
        me.newRecords = [];

        me.leftAxis.tree = null;
        me.leftAxis.buildTree();

        me.topAxis.tree = null;
        me.topAxis.buildTree();

        me.recalculateResults(me.store, records);
    },

    /**
     * @private
     */
    onOriginalStoreUpdate: function(store, records){
        var me = this;

        me.updateRecords = me.updateRecords || [];
        me.updateRecords = Ext.Array.merge(me.updateRecords, Ext.Array.from(records));

        me.updateRecordsDelayedTask.delay(100);
    },

    /**
     * @private
     */
    onOriginalStoreUpdateDelayed: function(){
        var me = this;

        me.recalculateResults(me.store, me.updateRecords);
        me.updateRecords.length = 0;
    },

    /**
     * @private
     */
    onOriginalStoreRemove: function(store, record, index, isMove){
        if(isMove){
            //don't do anything. nothing changed in the data
            return;
        }

        // this can also be optimized to just remove axis items if necessary
        this.startProcess();
    },

    /**
     * @private
     */
    isReallyDirty: function(store, records){
        var found = true;

        records = Ext.Array.from(records);
        // for all records find out if there's a new axis value
        this.leftAxis.dimensions.each(function(dimension){
            Ext.Array.forEach(records, function(record){
                found = (record && record.isModel && dimension.values.containsKey(record.get(dimension.dataIndex)));
                return found;
            });
            return found;
        });

        return !found;
    },

    /**
     * @private
     */
    recalculateResults: function(store, records){
        var me = this;

        if(me.isReallyDirty(store, records)){
            me.startProcess();
            return;
        }

        me.fireEvent('beforeupdate', me);

        // recalculate all results
        me.results.calculate();
        // now update the pivot store records
        Ext.Array.each(me.leftAxis.getTree(), me.updateRecordToPivotStore, me);
        // update all grand totals
        me.updateGrandTotalsToPivotStore();

        me.fireEvent('afterupdate', me);
    },

    /**
     * @private
     */
    updateGrandTotalsToPivotStore: function(){
        var me = this,
            totals = [],
            i;

        if(me.totals.length <= 0){
            return;
        }

        totals.push({
            title:      me.textGrandTotalTpl,
            values:     me.preparePivotStoreRecordData({key: me.grandTotalKey})
        });

        // additional grand totals can be added. collect these using events or
        if(Ext.isFunction(me.onBuildTotals)){
            me.onBuildTotals(totals);
        }
        me.fireEvent('buildtotals', me, totals);

        // update records to the pivot store for each grand total
        if(me.totals.length === totals.length){
            for(i = 0; i < me.totals.length; i++){
                if(Ext.isObject(totals[i]) && Ext.isObject(totals[i].values) && (me.totals[i].record instanceof Ext.data.Model) ){
                    delete(totals[i].values.id);
                    me.totals[i].record.set(totals[i].values);
                }
            }
        }
    },

    /**
     * @private
     */
    updateRecordToPivotStore: function(item){
        if(!item.children){
            if(item.record){
                item.record.set(this.preparePivotStoreRecordData(item));
            }
        }else{
            Ext.Array.each(item.children, function(child){
                this.updateRecordToPivotStore(child);
            }, this);
        }
    },

    startProcess: function(){
        var me = this;

        // if we don't have a store then do nothing
        if(!me.store || (me.store && !me.store.isStore) || me.isDestroyed){
            // nothing to do
            return;
        }

        me.clearData();

        me.localDelayedTask.delay(50);
    },

    delayedProcess: function(){
        var me = this;

        // let's start the process
        me.fireEvent('start', me);

        me.records = me.store.getRange();

        if(me.records.length == 0){
            me.endProcess();
            return;
        }

        me.statusInProgress = false;

        me.processRecords(0);
    },

    processRecords: function(position){
        var me = this,
            i = position,
            totalLength;

        // don't do anything if the matrix was destroyed while doing calculations.
        if(me.isDestroyed){
            return;
        }

        totalLength = me.records.length;

        me.statusInProgress = true;

        while(i < totalLength && i < position + me.recordsPerJob && me.statusInProgress){
            me.processRecord(me.records[i], i, totalLength);
            i++;
        }

        // if we reached the last record then stop the process
        if(i >= totalLength){
            me.statusInProgress = false;

            // now that the cells matrix was built let's calculate the aggregates
            me.results.calculate();

            // let's build the trees and apply value filters
            me.leftAxis.buildTree();
            me.topAxis.buildTree();

            // recalculate everything after applying the value filters
            if(me.filterApplied){
                me.results.calculate();
            }

            me.records = null;
            me.endProcess();
            return;
        }

        // if the matrix was not reconfigured meanwhile then start a new job
        if(me.statusInProgress && totalLength > 0){
            Ext.defer(me.processRecords, me.timeBetweenJobs, me, [i]);
        }
    },

    /**
     * Process the specified record and fire the 'progress' event
     *
     * @private
     */
    processRecord: function(record, index, length){
        var me = this,
            grandTotalKey = me.grandTotalKey,
            leftItems, topItems, i, j;

        // if null is returned that means it was filtered out
        // if array was returned that means it is valid
        leftItems = me.leftAxis.processRecord(record);
        topItems = me.topAxis.processRecord(record);

        // left and top items are added to their respective axis if the record
        // is not filtered out on both axis
        if(leftItems && topItems){
            me.results.add(grandTotalKey, grandTotalKey).addRecord(record);

            for (i = 0; i < topItems.length; i++) {
                me.topAxis.addItem(topItems[i]);
                me.results.add(grandTotalKey, topItems[i].key).addRecord(record);
            }

            for (i = 0; i < leftItems.length; i++) {
                me.leftAxis.addItem(leftItems[i]);

                me.results.add(leftItems[i].key, grandTotalKey).addRecord(record);

                for (j = 0; j < topItems.length; j++) {
                    me.results.add(leftItems[i].key, topItems[j].key).addRecord(record);
                }
            }
        }

        me.fireEvent('progress', me, index + 1, length);
    },

    /**
     * Fetch all records that belong to the specified row group
     *
     * @param {String} key Row group key
     */
    getRecordsByRowGroup: function(key){
        var results = this.results.getByLeftKey(key),
            length = results.length,
            records = [],
            i;

        for(i = 0; i < length; i++){
            records = Ext.Array.merge(records, results[i].records || []);
        }

        return records;
    },

    /**
     * Fetch all records that belong to the specified col group
     *
     * @param {String} key Col group key
     */
    getRecordsByColGroup: function(key){
        var results = this.results.getByTopKey(key),
            length = results.length,
            records = [],
            i;

        for(i = 0; i < length; i++){
            records = Ext.Array.merge(records, results[i].records || []);
        }

        return records;
    },

    /**
     * Fetch all records that belong to the specified row/col group
     *
     * @param {String} rowKey Row group key
     * @param {String} colKey Col group key
     */
    getRecordsByGroups: function(rowKey, colKey){
        var result = this.results.get(rowKey, colKey);

        return ( result ? result.records || [] : []);
    }

});
