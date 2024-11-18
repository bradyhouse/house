/**
 * This class remodels the grid store when required.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.feature.PivotStore', {
    constructor: function(config) {
        Ext.apply(this, config);

        this.bindStore(config.store);
    },

    destroy: function(){
        var me = this;

        Ext.destroy(me.storeListeners);

        me.store = me.matrix = me.pivotFeature = null;
        me.storeInfo = me.storeListeners = me.store = null;

        me.callParent(arguments);
    },

    bindStore: function(store) {
        var me = this;

        if (me.store) {
            Ext.destroy(me.storeListeners);
            me.store = null;
        }
        if (store) {
            me.storeListeners = store.on({
                // this event is fired by the pivot grid for private use
                pivotstoreremodel:  me.processStore,
                scope:              me,
                destroyable:        true
            });
            me.store = store;
        }
    },

    processStore: function(){
        if(!this.matrix){
            return;
        }

        var me = this,
            fn = me['processGroup' + Ext.String.capitalize(me.matrix.viewLayoutType)],
            fields = me.matrix.getColumns(),
            outputFn;

        me.store.model.replaceFields(fields, true);
        me.store.removeAll(true);
        me.store.suspendEvents(false);

        me.storeInfo = {};

        if(!Ext.isFunction(fn)){
            // specified view type doesn't exist so let's use the outline view
            fn = me.processGroupOutline;
        }
        outputFn = Ext.Function.bind(fn, me);

        if(me.matrix.rowGrandTotalsPosition == 'first'){
            me.processGrandTotal();
        }

        Ext.Array.each(me.matrix.leftAxis.getTree(), function(group, index, all){
            me.store.add(outputFn({
                group:              group,
                previousExpanded:   (index > 0 ? all[index-1].expanded : false)
            }));
        }, me);

        if(me.matrix.rowGrandTotalsPosition == 'last'){
            me.processGrandTotal();
        }

        me.store.resumeEvents();
        me.store.fireEvent('refresh', me.store);
    },

    processGroup: function(config){
        var me = this,
            fn = me['processGroup' + Ext.String.capitalize(me.matrix.viewLayoutType)],
            outputFn;

        if(!Ext.isFunction(fn)){
            // specified view type doesn't exist so let's use the outline view
            fn = me.processGroupOutline;
        }
        outputFn = Ext.Function.bind(fn, me);

        return outputFn(config);
    },

    createGridStoreRecord: function(values){
        var me = this,
            data = me.matrix.preparePivotStoreRecordData(values || {}),
            record;

        data.id = '';
        record = new me.store.model(data);
        if(Ext.isEmpty(values)){
            Ext.Object.each(data, function(field){
                if(field != 'id'){
                    record.set(field, null);
                }
            });
            record.commit();
        }

        record.isPlaceholder = true;
        //record.internalId = values.key;

        return record;
    },

    processGrandTotal: function(){
        var me = this,
            found = false,
            group = {
                key:    me.matrix.grandTotalKey
            };

        Ext.Array.forEach(me.matrix.totals || [], function(total){
            var record = total.record,
                i = me.matrix.leftAxis.dimensions.getCount();

            if(!(record instanceof Ext.data.Model)){
                return;
            }

            me.storeInfo[record.internalId] = {
                leftKey:        group.key,
                rowStyle:       '',
                rowClasses:    [me.pivotFeature.gridMaster.clsGrandTotal, me.pivotFeature.summaryDataCls],
                rendererParams: {}
            };

            me.matrix.leftAxis.dimensions.each(function(column, index){
                var key;

                if(me.matrix.viewLayoutType == 'compact' || index === 0){
                    if(me.matrix.viewLayoutType == 'compact'){
                        key = me.matrix.compactViewKey;
                        i = 1;
                    }else{
                        key = column.getId();
                    }
                    record.set(key, total.title);
                    record.commit(false, [key]);
                    me.storeInfo[record.internalId].rendererParams[key] = {
                        fn:                 'groupOutlineRenderer',
                        group:              group,
                        colspan:            i,
                        hidden:             false,
                        subtotalRow:        true
                    };
                    found = true;
                }else{
                    me.storeInfo[record.internalId].rendererParams[column.getId()] = {
                        fn:                 'groupOutlineRenderer',
                        group:              group,
                        colspan:            0,
                        hidden:             found,
                        subtotalRow:        true
                    };
                    i--;
                }
                // for all top axis columns use a new renderer
                me.storeInfo[record.internalId].rendererParams['topaxis'] = {
                    fn: 'topAxisRenderer'
                };
            });

            me.store.add(record);
        });
    },

// Outline view functions

    processGroupOutline: function(config){
        var me = this,
            group = config['group'],
            results = [];

        if(group.record){
            me.processRecordOutline({
                results:            results,
                group:              group
            });
        }else{
            me.processGroupOutlineWithChildren({
                results:            results,
                group:              group,
                previousExpanded:   config.previousExpanded
            });
        }

        return results;
    },

    processGroupOutlineWithChildren: function(config){
        var me = this,
            group = config['group'],
            previousExpanded = config['previousExpanded'],
            hasSummaryData = false,
            record, i;

        if(!group.expanded || (group.expanded && me.matrix.rowSubTotalsPosition == 'first')){
            // summary row is on the group header
            hasSummaryData = true;
            record = me.createGridStoreRecord(group);
        }else if(me.matrix.rowSubTotalsPosition == 'last' || me.matrix.rowSubTotalsPosition == 'none'){
            record = me.createGridStoreRecord();
            record.set(group.dimension.getId(), group.name);
        }
        record.commit();

        me.processGroupHeaderRecordOutline({
            results:            config.results,
            group:              group,
            record:             record,
            previousExpanded:   previousExpanded,
            hasSummaryData:     hasSummaryData
        });

        if(group.expanded){
            if(group.children){
                for(i = 0; i < group.children.length; i++){
                    if(group.children[i]['children']){
                        me.processGroupOutlineWithChildren({
                            results:    config.results,
                            group:      group.children[i]
                        });
                    }else{
                        me.processRecordOutline({
                            results:    config.results,
                            group:      group.children[i]
                        });
                    }
                }
            }
            if(me.matrix.rowSubTotalsPosition == 'last'){
                record = me.createGridStoreRecord(group);
                record.set(group.dimension.getId(), group.getTextTotal());
                record.commit();
                me.processGroupHeaderRecordOutline({
                    results:            config.results,
                    group:              group,
                    record:             record,
                    previousExpanded:   previousExpanded,
                    subtotalRow:        true,
                    hasSummaryData:     true
                });
            }
        }
    },

    processGroupHeaderRecordOutline: function(config){
        var me = this,
            group = config['group'],
            record = config['record'],
            previousExpanded = config['previousExpanded'],
            subtotalRow = config['subtotalRow'],
            hasSummaryData = config['hasSummaryData'],
            i = me.matrix.leftAxis.dimensions.getCount(),
            found = false;

        me.storeInfo[record.internalId] = {
            leftKey:        group.key,
            rowStyle:       '',
            rowClasses:    [me.pivotFeature.gridMaster.clsGroupTotal, hasSummaryData ? me.pivotFeature.summaryDataCls : ''],
            rendererParams: {}
        };

        me.matrix.leftAxis.dimensions.each(function(column, index){
            if(column.getId() == group.dimension.getId()){
                me.storeInfo[record.internalId].rendererParams[column.getId()] = {
                    fn:                 'groupOutlineRenderer',
                    group:              group,
                    colspan:            i,
                    hidden:             false,
                    previousExpanded:   previousExpanded,
                    subtotalRow:        subtotalRow
                };
                found = true;
            }else{
                me.storeInfo[record.internalId].rendererParams[column.getId()] = {
                    fn:                 'groupOutlineRenderer',
                    group:              group,
                    colspan:            0,
                    hidden:             found,
                    previousExpanded:   previousExpanded,
                    subtotalRow:        subtotalRow
                };
                i--;
            }
        });

        // for all top axis columns use a new renderer
        me.storeInfo[record.internalId].rendererParams['topaxis'] = {
            fn: (hasSummaryData ? 'topAxisRenderer' : 'topAxisNoRenderer')
        };

        config.results.push(record);
    },

    processRecordOutline: function(config){
        var me = this,
            group = config['group'],
            found = false,
        //record = me.createGridStoreRecord(group);
            record = group.record;

        me.storeInfo[record.internalId] = {
            leftKey:        group.key,
            rowStyle:       '',
            rowClasses:    [me.pivotFeature.rowCls, me.pivotFeature.summaryDataCls],
            rendererParams: {}
        };

        me.matrix.leftAxis.dimensions.each(function(column, index){
            if(column.getId() == group.dimension.getId()){
                found = true;
            }

            me.storeInfo[record.internalId].rendererParams[column.getId()] = {
                fn:                 'recordOutlineRenderer',
                group:              group,
                hidden:             !found
            };
        });

        // for all top axis columns use a new renderer
        me.storeInfo[record.internalId].rendererParams['topaxis'] = {
            fn: 'topAxisRenderer'
        };

        config.results.push(record);
    },


// Compact view functions

    processGroupCompact: function(config){
        var me = this,
            group = config['group'],
            previousExpanded = config['previousExpanded'],
            results = [];

        if(group.record){
            me.processRecordCompact({
                results:            results,
                group:              group
            });
        }else{
            me.processGroupCompactWithChildren({
                results:            results,
                group:              group,
                previousExpanded:   previousExpanded
            });
        }

        return results;
    },

    processGroupCompactWithChildren: function(config){
        var me = this,
            group = config['group'],
            previousExpanded = config['previousExpanded'],
            hasSummaryData = false,
            record, i;

        if(!group.expanded || (group.expanded && me.matrix.rowSubTotalsPosition == 'first')){
            // summary row is on the group header
            hasSummaryData = true;
            record = me.createGridStoreRecord(group);
        }else if(me.matrix.rowSubTotalsPosition == 'last' || me.matrix.rowSubTotalsPosition == 'none'){
            record = me.createGridStoreRecord();
            record.set(me.matrix.compactViewKey, group.name);
        }
        record.commit();

        me.processGroupHeaderRecordCompact({
            results:            config.results,
            group:              group,
            record:             record,
            previousExpanded:   previousExpanded,
            hasSummaryData:     hasSummaryData
        });

        if(group.expanded){
            if(group.children){
                for(i = 0; i < group.children.length; i++){
                    if(group.children[i]['children']){
                        me.processGroupCompactWithChildren({
                            results:    config.results,
                            group:      group.children[i]
                        });
                    }else{
                        me.processRecordCompact({
                            results:    config.results,
                            group:      group.children[i]
                        });
                    }
                }
            }
            if(me.matrix.rowSubTotalsPosition == 'last'){
                record = me.createGridStoreRecord(group);
                record.set(me.matrix.compactViewKey, group.getTextTotal());
                record.commit();
                me.processGroupHeaderRecordCompact({
                    results:            config.results,
                    group:              group,
                    record:             record,
                    previousExpanded:   previousExpanded,
                    subtotalRow:        true,
                    hasSummaryData:     true
                });
            }
        }
    },

    processGroupHeaderRecordCompact: function(config){
        var me = this,
            group = config['group'],
            record = config['record'],
            previousExpanded = config['previousExpanded'],
            subtotalRow = config['subtotalRow'],
            hasSummaryData = config['hasSummaryData'],
            i = me.matrix.leftAxis.dimensions.getCount(),
            found = false;

        me.storeInfo[record.internalId] = {
            leftKey:        group.key,
            rowStyle:       '',
            rowClasses:    [me.pivotFeature.gridMaster.clsGroupTotal, hasSummaryData ? me.pivotFeature.summaryDataCls : ''],
            rendererParams: {}
        };

        me.storeInfo[record.internalId].rendererParams[me.matrix.compactViewKey] = {
            fn:                 'groupCompactRenderer',
            group:              group,
            colspan:            0,
            previousExpanded:   previousExpanded,
            subtotalRow:        subtotalRow
        };

        // for all top axis columns use a new renderer
        me.storeInfo[record.internalId].rendererParams['topaxis'] = {
            fn: (hasSummaryData ? 'topAxisRenderer' : 'topAxisNoRenderer')
        };

        config.results.push(record);
    },

    processRecordCompact: function(config){
        var me = this,
            group = config['group'],
            found = false,
            record = me.createGridStoreRecord(group);

        me.storeInfo[record.internalId] = {
            leftKey:        group.key,
            rowStyle:       '',
            rowClasses:    [me.pivotFeature.rowCls, me.pivotFeature.summaryDataCls],
            rendererParams: {}
        };

        me.storeInfo[record.internalId].rendererParams[me.matrix.compactViewKey] = {
            fn:         'recordCompactRenderer',
            group:      group
        };

        // for all top axis columns use a new renderer
        me.storeInfo[record.internalId].rendererParams['topaxis'] = {
            fn: 'topAxisRenderer'
        };

        config.results.push(record);
    },

    doExpandCollapse: function(key, oldRecord){
        var me = this,
            gridMaster = me.pivotFeature.gridMaster,
            group;

        group = me.matrix.leftAxis.findTreeElement('key', key);
        if(!group){
            return;
        }

        me.doExpandCollapseInternal(group, oldRecord);

        gridMaster.fireEvent((group.node.expanded ? 'pivotgroupexpand' : 'pivotgroupcollapse'), gridMaster, 'row', group.node);
    },

    doExpandCollapseInternal: function(group, oldRecord){
        var me = this,
            items, oldItems, startIdx, len;

        oldItems = me.processGroup({
            group:              group.node,
            previousExpanded:   false
        });

        group.node.expanded = !group.node.expanded;

        items = me.processGroup({
            group:              group.node,
            previousExpanded:   false
        });


        if(items.length && (startIdx = me.store.indexOf(oldRecord)) !== -1){
            me.store.suspendEvents();

            if(group.node.expanded){
                me.store.remove(me.store.getAt(startIdx));
                me.store.insert(startIdx, items);

                oldItems = [oldRecord];
            }else{
                len = oldItems.length;
                oldItems = me.store.getRange(startIdx, startIdx + len - 1);

                me.store.remove(oldItems);
                me.store.insert(startIdx, items);

            }

            me.removeStoreInfoData(oldItems);

            me.store.resumeEvents();
            me.store.fireEvent('replace', me.store, startIdx, oldItems, items);
        }

    },

    removeStoreInfoData: function(records){
        Ext.Array.each(records, function(record){
            if(this.storeInfo[record.internalId]){
                delete this.storeInfo[record.internalId];
            }
        }, this);
    }
});
