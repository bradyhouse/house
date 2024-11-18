/**
 *
 * This class implements the config panel. It is used internally by the configurator plugin.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.plugin.configurator.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.pivot.plugin.configurator.Container'
    ],

    alias: 'widget.pivotconfigpanel',

    dock:       'right',

    weight:             50, // the column header container has a weight of 100 so we want to dock it before that.
    grid:               null,
    fields:             [],
    refreshDelay:       1000,
    defaultMinHeight:   70,
    defaultMinWidth:    250,

    header: false,
    title:              'Configurator',
    collapsible:        true,
    collapseMode:       'placeholder',

    /**
     * @cfg {String} panelAllFieldsText Text displayed in the container reserved for all available fields
     * when docked to top or bottom.
     */
    panelAllFieldsText:     'Drop Unused Fields Here',
    /**
     * @cfg {String} panelAllFieldsTitle Text displayed in the container reserved for all available fields
     * when docked to left or right.
     */
    panelAllFieldsTitle:    'All fields',

    /**
     * @cfg {String} panelTopFieldsText Text displayed in the container reserved for all top axis fields
     * when docked to top or bottom.
     */
    panelTopFieldsText:     'Drop Column Fields Here',
    /**
     * @cfg {String} panelTopFieldsTitle Text displayed in the container reserved for all top axis fields
     * when docked to left or right.
     */
    panelTopFieldsTitle:    'Column labels',

    /**
     * @cfg {String} panelLeftFieldsText Text displayed in the container reserved for all left axis fields
     * when docked to top or bottom.
     */
    panelLeftFieldsText:    'Drop Row Fields Here',
    /**
     * @cfg {String} panelLeftFieldsTitle Text displayed in the container reserved for all left axis fields
     * when docked to left or right.
     */
    panelLeftFieldsTitle:   'Row labels',

    /**
     * @cfg {String} panelAggFieldsText Text displayed in the container reserved for all aggregate fields
     * when docked to top or bottom.
     */
    panelAggFieldsText:     'Drop Agg Fields Here',
    /**
     * @cfg {String} panelAggFieldsTitle Text displayed in the container reserved for all aggregate fields
     * when docked to left or right.
     */
    panelAggFieldsTitle:    'Values',

    headerContainerCls: Ext.baseCSSPrefix + 'pivot-grid-config-container-header',

    initComponent: function(){
        var me = this,
            listeners = {
                configchange:   me.onConfigChanged,
                sortchange:     me.onSortChanged,
                filterchange:   me.onFilterChanged,
                scope:          me,
                destroyable:    true
            };

        Ext.apply(me, Ext.Array.indexOf(['top', 'bottom'], me.dock) >= 0 ? me.getHorizontalConfig() : me.getVerticalConfig());

        me.callParent(arguments);

        me.fieldsCt = me.down('#fieldsCt');
        me.fieldsTopCt = me.down('#fieldsTopCt');
        me.fieldsLeftCt = me.down('#fieldsLeftCt');
        me.fieldsAggCt = me.down('#fieldsAggCt');

        me.fieldsCtListeners = me.fieldsCt.on(listeners);
        me.fieldsLeftCtListeners = me.fieldsLeftCt.on(listeners);
        me.fieldsTopCtListeners = me.fieldsTopCt.on(listeners);
        me.fieldsAggCtListeners = me.fieldsAggCt.on(listeners);

        me.fieldsExtracted = false;

        me.gridListeners = me.grid.on({
            pivotdone:  me.initPivotFields,
            scope:      me,
            destroyable:true
        });

        me.task = new Ext.util.DelayedTask(function(){
            me.grid.reconfigurePivot({
                topAxis:    me.getFieldsFromContainer(me.fieldsTopCt),
                leftAxis:   me.getFieldsFromContainer(me.fieldsLeftCt),
                aggregate:  me.getFieldsFromContainer(me.fieldsAggCt)
            });
        });

    },

    destroy: function(){
        var me = this;

        delete(me.grid);
        Ext.destroy(me.relayers, me.fieldsCtListeners, me.fieldsLeftCtListeners, me.fieldsTopCtListeners, me.fieldsAggCtListeners, me.gridListeners);

        me.callParent();
    },

    enable: function(){
        var me = this;

        if(me.fieldsCt){
            me.fieldsCt.enable();
            me.fieldsTopCt.enable();
            me.fieldsLeftCt.enable();
            me.fieldsAggCt.enable();
            me.initPivotFields();
        }

        me.show();
    },

    disable: function(){
        var me = this;

        if(me.fieldsCt){
            me.fieldsCt.disable();
            me.fieldsTopCt.disable();
            me.fieldsLeftCt.disable();
            me.fieldsAggCt.disable();
        }
        me.hide();
    },

    getPanelConfigHeader: function(config){
        return Ext.apply({
            xtype:      'header',
            // make it look like a panel header but with a different padding
            baseCls:    Ext.baseCSSPrefix + 'panel-header',
            cls:        this.headerContainerCls,
            border:     1,
            width:      100
        }, config || {});
    },

    getHorizontalConfig: function(){
        var me = this;

        return {
            minHeight:  me.defaultMinHeight,
            headerPosition: me.dock == 'top' ? 'bottom' : 'top',
            collapseDirection: me.dock,
            defaults: {
                xtype: 'container',
                layout: {
                    type:   'hbox',
                    align:  'stretchmax'
                },
                minHeight:      me.defaultMinHeight/3
            },
            items: [{
                items: [me.getPanelConfigHeader({
                    title:          me.panelAllFieldsTitle,
                    tools: me.collapsible ? [{
                        type:       me.dock == 'top' ? 'up' : 'down',
                        handler:    me.collapseMe,
                        scope:      me
                    }] : []
                }),{
                    itemId:         'fieldsCt',
                    xtype:          'pivotconfigcontainer',
                    isCustomizable: false,
                    dragDropText:   me.panelAllFieldsText,
                    position:       me.dock,
                    flex: 1
                }]
            },{
                items: [me.getPanelConfigHeader({
                    title:          me.panelAggFieldsTitle
                }),{
                    itemId:         'fieldsAggCt',
                    xtype:          'pivotconfigcontainer',
                    isCustomizable: true,
                    isAgg:          true,
                    dragDropText:   me.panelAggFieldsText,
                    position:       me.dock,
                    flex:           1
                }]
            },{
                defaults: {
                    xtype:          'pivotconfigcontainer',
                    minHeight:      me.defaultMinHeight/3,
                    position:       me.dock
                },
                items: [me.getPanelConfigHeader({
                    title:          me.panelLeftFieldsTitle
                }),{
                    itemId:         'fieldsLeftCt',
                    pivotField:     'leftAxis',
                    isCustomizable: true,
                    dragDropText:   me.panelLeftFieldsText,
                    flex:           1
                },me.getPanelConfigHeader({
                    title:          me.panelTopFieldsTitle
                }),{
                    itemId:         'fieldsTopCt',
                    pivotField:     'topAxis',
                    isCustomizable: true,
                    dragDropText:   me.panelTopFieldsText,
                    flex:           1
                }]
            }]
        };
    },

    getVerticalConfig: function(){
        var me = this;

        return {
            layout: {
                type:   'hbox',
                align:  'stretch'
            },
            minWidth:           me.defaultMinWidth,
            headerPosition:     me.dock == 'right' ? 'left' : 'right',
            collapseDirection:  me.dock,
            defaults: {
                flex: 1
            },
            items: [{
                itemId:         'fieldsCt',
                xtype:          'pivotconfigcontainer',
                position:       me.dock,
                title:          me.panelAllFieldsTitle,
                isCustomizable: false,
                dragDropText:   me.panelAllFieldsText,
                autoScroll:     true,
                header: {
                    cls:        me.headerContainerCls
                },
                tools: me.collapsible ? [{
                    type:       me.dock,
                    handler:    me.collapseMe,
                    scope:      me
                }] : []
            },{
                xtype:      'container',
                defaults: {
                    xtype:          'pivotconfigcontainer',
                    flex:           1,
                    autoScroll:     true,
                    position:       me.dock,
                    header: {
                        cls:        me.headerContainerCls
                    }
                },
                layout: {
                    type:   'vbox',
                    align:  'stretch'
                },
                items: [{
                    itemId:         'fieldsAggCt',
                    title:          me.panelAggFieldsTitle,
                    isCustomizable: true,
                    isAgg:          true,
                    dragDropText:   me.panelAggFieldsText
                },{
                    itemId:         'fieldsLeftCt',
                    title:          me.panelLeftFieldsTitle,
                    pivotField:     'leftAxis',
                    isCustomizable: true,
                    dragDropText:   me.panelLeftFieldsText
                },{
                    itemId:         'fieldsTopCt',
                    title:          me.panelTopFieldsTitle,
                    pivotField:     'topAxis',
                    isCustomizable: true,
                    dragDropText:   me.panelTopFieldsText
                }]
            }]
        };
    },

    /**
     * This is the 'configchange' event handler raised by each sub container.
     *
     * @private
     */
    onConfigChanged: function(){
        var me = this,
            topAxis = [], leftAxis = [], agg = [];

        if(me.disabled) {
            // if the plugin is disabled don't do anything
            return;
        }

        if(me.grid.fireEvent('configchange', me, {
                topAxis:    me.getFieldsFromContainer(me.fieldsTopCt),
                leftAxis:   me.getFieldsFromContainer(me.fieldsLeftCt),
                aggregate:  me.getFieldsFromContainer(me.fieldsAggCt)
            }) !== false){
            me.task.delay(me.refreshDelay);
        }
    },

    collapseMe: function (){
        this.collapse(this.dock);
    },

    /**
     * This function is used to retrieve all configured fields in a fields container.
     *
     * @private
     */
    getFieldsFromContainer: function(ct, excludeWidth){
        var fields = [];

        ct.items.each(function(item){
            fields.push(item.dimension);
        });

        return fields;
    },

    /**
     * This is the 'sortchange' event handler raised by each sub container.
     *
     * @private
     */
    onSortChanged: function(column, direction){
        var me = this, fields;

        if(me.disabled) {
            // if the plugin is disabled don't do anything
            return;
        }

        fields = me.grid[column.ownerCt.pivotField];

        Ext.each(fields, function(field){
            if(field.dataIndex == column.dataIndex){
                field.direction = direction;
                return false;
            }
        });
        me.task.delay(me.refreshDelay);
    },

    onFilterChanged: function(column, filter){
        var me = this, fields;

        if(me.disabled) {
            // if the plugin is disabled don't do anything
            return;
        }

        me.task.delay(me.refreshDelay);
    },

    /**
     * Initialize all container fields fetching the configuration from the pivot grid.
     *
     * @private
     */
    initPivotFields: function(){
        var me = this,
            store = me.grid.getStore(),
            model = store ? store.model : null,
            fieldsTop, fieldsLeft, fieldsAgg, cFields;

        if(model != me.lastModel){
            Ext.destroy(me.lastFields);
            delete(me.lastFields);
            me.lastModel = model;
        }

        // let's collect all field configurations
        if(!me.lastFields){
            me.lastFields = me.fetchAllFieldConfigurations();
        }

        cFields = me.lastFields.clone();

        // remove all previously created columns
        me.fieldsCt.removeAll();
        me.fieldsTopCt.removeAll();
        me.fieldsLeftCt.removeAll();
        me.fieldsAggCt.removeAll();

        fieldsTop = me.getConfigFields(me.grid.topAxis);
        fieldsLeft = me.getConfigFields(me.grid.leftAxis);
        fieldsAgg = me.getConfigFields(me.grid.aggregate);

        // remove all config fields from the fieldsAll
        Ext.each(Ext.Array.merge(fieldsTop, fieldsLeft), function(item){
            var i, found = false;

            // if the dimension is filtered but there is no aggregate with that id then remove filter
            if(item.filter && item.filter.dimensionId){
                for(i = 0; i < fieldsAgg.length; i++){
                    if(fieldsAgg[i].id == item.filter.dimensionId){
                        found = true;
                        break;
                    }
                }

                if(!found){
                    delete item.filter;
                }
            }

            cFields.removeAtKey(item.header);
            me.mergeFieldConfig(item);
        });

        Ext.each(fieldsAgg, me.mergeFieldConfig, me);

        Ext.suspendLayouts();

        me.addFieldsToConfigurator(cFields.getRange(), me.fieldsCt);
        me.addFieldsToConfigurator(fieldsTop, me.fieldsTopCt);
        me.addFieldsToConfigurator(fieldsLeft, me.fieldsLeftCt);
        me.addFieldsToConfigurator(fieldsAgg, me.fieldsAggCt);

        me.fieldsTopCt.aggregateDimensions = fieldsAgg;
        me.fieldsLeftCt.aggregateDimensions = fieldsAgg;

        Ext.resumeLayouts(true);

    },

    mergeFieldConfig: function(item){
        var el = this.lastFields.getByKey(item.header),
            id;

        if(el){
            id = el.id;
            Ext.apply(el, item);
            el.id = id;
        }
    },

    fetchAllFieldConfigurations: function(){
        var me = this,
            store = me.grid.getStore(),
            fields = store ? store.model.getFields() : [],
            allFields = [], lastFields;

        lastFields = Ext.create('Ext.util.MixedCollection');
        lastFields.getKey = function(el){
            return el.header;
        }

        if(me.fields.length > 0){
            allFields = me.fields;
        }else{
            Ext.each(fields, function(field){
                allFields.push({
                    header:     Ext.String.capitalize(field.name),
                    dataIndex:  field.name,
                    direction:  field.sortDir
                });
            });
        }

        Ext.each(allFields, function(field){
            field.id = field.id || Ext.id();
        });

        lastFields.addAll(allFields);
        return lastFields;
    },

    /**
     * Easy function for assigning fields to a container.
     *
     * @private
     */
    addFieldsToConfigurator: function(fields, fieldsCt){
        Ext.each(fields, function(item, index, len){
            fieldsCt.addColumn(item, -1);
        });
    },

    /**
     * Build the fields array for each container by parsing all given fields or from the pivot config.
     *
     * @private
     */
    getConfigFields: function(dimension){
        var me = this,
            fields = [];

        Ext.each(dimension, function(obj){
            var field = Ext.clone(obj);

            field.id = field.id || Ext.id();

            if(!me.lastFields.getByKey(field.header)){
                me.lastFields.add(field);
            }

            fields.push(field);
        });

        return fields;
    },


    /**
     * This function is temporarily added here until the placeholder expanding/collpasing
     * is fixed for docked panels.
     *
     * @param direction
     * @param animate
     * @returns {Ext.pivot.plugin.configurator.Panel}
     * @private
     */
    placeholderCollapse: function(direction, animate) {
        var me = this,
            ownerCt = me.ownerCt,
            collapseDir = direction || me.collapseDirection,
            floatCls = Ext.panel.Panel.floatCls,
            placeholder = me.getPlaceholder(collapseDir),
            slideInDirection;

        me.isCollapsingOrExpanding = 1;

        // Upcoming layout run will ignore this Component
        me.setHiddenState(true);
        me.collapsed = collapseDir;

        if (placeholder.rendered) {
            // We may have been added to another Container from that in which we rendered the placeholder
            if (placeholder.el.dom.parentNode !== me.el.dom.parentNode) {
                me.el.dom.parentNode.insertBefore(placeholder.el.dom, me.el.dom);
            }

            placeholder.hidden = false;
            placeholder.setHiddenState(false);
            placeholder.el.show();
            ownerCt.updateLayout();
        } else {
            //ATE - this is the fix
            if(me.dock){
                placeholder.dock = me.dock;
                ownerCt.addDocked(placeholder);
            }else{
                ownerCt.insert(ownerCt.items.indexOf(me), placeholder);
            }
        }

        if (me.rendered) {
            // We assume that if collapse was caused by keyboard action
            // on focused collapse tool, the logical focus transition
            // is to placeholder's expand tool. Note that it may not be
            // the case when the user *clicked* collapse tool while focus
            // was elsewhere; in that case we dare not touch focus
            // to avoid sudden jumps.
            if (Ext.ComponentManager.getActiveComponent() === me.collapseTool) {
                me.focusPlaceholderExpandTool = true;
            }

            // We MUST NOT hide using display because that resets all scroll information.
            me.el.setVisibilityMode(me.placeholderCollapseHideMode);
            if (animate) {
                me.el.addCls(floatCls);
                placeholder.el.hide();
                slideInDirection = me.convertCollapseDir(collapseDir);

                me.el.slideOut(slideInDirection, {
                    preserveScroll: true,
                    duration: Ext.Number.from(animate, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        scope: me,
                        afteranimate: function() {
                            var me = this;

                            me.el.removeCls(floatCls);

                            /* We need to show the element so that slideIn will work correctly.
                             * However, if we leave it visible then it can be seen before
                             * the animation starts, causing a flicker. The solution,
                             * borrowed from date picker, is to hide it using display:none.
                             * The slideIn effect includes a call to fixDisplay() that will
                             * undo the display none at the appropriate time.
                             */
                            me.placeholder.el.show().setStyle('display', 'none').slideIn(slideInDirection, {
                                easing: 'linear',
                                duration: 100,
                                listeners: {
                                    afteranimate: me.doPlaceholderCollapse,
                                    scope: me
                                }
                            });
                        }
                    }
                });
            }
            else {
                me.el.hide();
                me.doPlaceholderCollapse();
            }
        }
        else {
            me.isCollapsingOrExpanding = 0;
            if (!me.preventCollapseFire) {
                me.fireEvent('collapse', me);
            }
        }

        return me;
    },

    /**
     * This function is temporarily added here until the placeholder expanding/collpasing
     * is fixed for docked panels.
     *
     * @param animate
     * @returns {Ext.pivot.plugin.configurator.Panel}
     * @private
     */
    placeholderExpand: function(animate) {
        var me = this,
            collapseDir = me.collapsed,
            expandTool = me.placeholder.expandTool,
            floatCls = Ext.panel.Panel.floatCls,
            center = me.ownerLayout ? me.ownerLayout.centerRegion: null,
            finalPos, floatedPos;

        // Layouts suspended - don't bother with animation shenanigans
        if (Ext.Component.layoutSuspendCount) {
            animate = false;
        }

        if (me.floatedFromCollapse) {
            floatedPos = me.getPosition(true);
            // these are the same cleanups performed by the normal slideOut mechanism:
            me.slideOutFloatedPanelBegin();
            me.slideOutFloatedPanelEnd();
            me.floated = false;
        }

        // We assume that if expand was caused by keyboard action on focused
        // placeholder expand tool, the logical focus transition is to the
        // panel header's collapse tool.
        // Note that it may not be the case when the user *clicked* expand tool
        // while focus was elsewhere; in that case we dare not touch focus to avoid
        // sudden jumps.
        if (Ext.ComponentManager.getActiveComponent() === expandTool) {
            me.focusHeaderCollapseTool = true;

            // There is an odd issue with JAWS screen reader: when expanding a panel,
            // it will announce Expand tool again before focus is forced to Collapse
            // tool. I'm not sure why that happens since focus does not move from
            // Expand tool during animation; this hack should work around
            // the problem until we come up with more understanding and a proper
            // solution. The attributes are restored below in doPlaceholderExpand.
            expandTool._ariaRole = expandTool.ariaEl.dom.getAttribute('role');
            expandTool._ariaLabel = expandTool.ariaEl.dom.getAttribute('aria-label');

            expandTool.ariaEl.dom.setAttribute('role', 'presentation');
            expandTool.ariaEl.dom.removeAttribute('aria-label');
        }

        if (animate) {
            // Expand me and hide the placeholder
            Ext.suspendLayouts();
            me.placeholder.hide();
            me.el.show();
            me.collapsed = false;
            me.setHiddenState(false);

            // Stop the center region from moving when laid out without the placeholder there.
            // Unless we are expanding from a floated out situation. In that case, it's laid out immediately.
            if (center && !floatedPos) {
                center.hidden = true;
            }

            Ext.resumeLayouts(true);
            //ATE - this is the fix
            if(center) {
                center.hidden = false;
            }
            me.el.addCls(floatCls);

            // At this point, this Panel is arranged in its correct, expanded layout.
            // The center region has not been affected because it has been flagged as hidden.
            //
            // If we are proceeding from floated, the center region has also been arranged
            // in its new layout to accommodate this expansion, so no further layout is needed, just
            // element animation.
            //
            // If we are proceeding from fully collapsed, the center region has *not* been relayed out because
            // the UI look and feel dictates that it stays stable until the expanding panel has slid in all the
            // way, and *then* it snaps into place.

            me.isCollapsingOrExpanding = 2;

            // Floated, move it back to the floated pos, and thence into the correct place
            if (floatedPos) {
                finalPos = me.getXY();
                me.setLocalXY(floatedPos[0], floatedPos[1]);
                me.setXY([finalPos[0], finalPos[1]], {
                    duration: Ext.Number.from(animate, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        scope: me,
                        afteranimate: function() {
                            var me = this;

                            me.el.removeCls(floatCls);
                            me.isCollapsingOrExpanding = 0;
                            me.fireEvent('expand', me);
                        }
                    }
                });
            }
            // Not floated, slide it in to the correct place
            else {
                me.el.hide();
                me.placeholder.el.show();
                me.placeholder.hidden = false;

                // Slide this Component's el back into place, after which we lay out AGAIN
                me.setHiddenState(false);
                me.el.slideIn(me.convertCollapseDir(collapseDir), {
                    preserveScroll: true,
                    duration: Ext.Number.from(animate, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: me.doPlaceholderExpand,
                        scope: me
                    }
                });
            }
        }
        else {
            me.floated = me.collapsed = false;
            me.doPlaceholderExpand(true);
        }

        return me;
    }


});
