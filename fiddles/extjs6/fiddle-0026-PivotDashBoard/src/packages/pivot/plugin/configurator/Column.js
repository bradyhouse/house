/**
 *
 * This class is used for creating a configuration field.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.plugin.configurator.Column',{
    extend: 'Ext.Component',

    requires: [
        'Ext.menu.Menu',
        'Ext.pivot.plugin.configurator.FilterLabelWindow',
        'Ext.pivot.plugin.configurator.FilterValueWindow',
        'Ext.pivot.plugin.configurator.FilterTopWindow'
    ],

    alias: 'widget.pivotconfigcolumn',

    childEls: ['textCol', 'filterCol', 'sortCol'],

    renderTpl:
    '<div id="{id}-configCol" class="' + Ext.baseCSSPrefix + 'pivot-grid-config-column-inner">' +
    '<tpl if="isCustomizable">' +
    '<span id={id}-customCol class="' + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-customize ' + Ext.baseCSSPrefix + 'border-box ' + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn ' + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-image"></span>' +
    '</tpl>' +
    '<span id={id}-sortCol data-ref="sortCol" class="' + Ext.baseCSSPrefix + 'border-box ' + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn"></span>' +
    '<span id={id}-filterCol data-ref="filterCol" class="' + Ext.baseCSSPrefix + 'border-box ' + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn"></span>' +
    '<span id="{id}-textCol" data-ref="textCol" data-qtip="{header}{aggregator}" class="' + Ext.baseCSSPrefix + 'pivot-grid-config-column-text ' + Ext.baseCSSPrefix + 'column-header-text ' + Ext.baseCSSPrefix + 'border-box">' +
    '{header}{aggregator}' +
    '</span>' +
    '</div>',

    header:         '&#160;',
    isCustomizable: false,
    dimension:      null,
    isAgg:          false,

    sumText:                    'Sum',
    avgText:                    'Avg',
    countText:                  'Count',
    minText:                    'Min',
    maxText:                    'Max',
    groupSumPercentageText:     'Group sum percentage',
    groupCountPercentageText:   'Group count percentage',
    varText:                    'Var',
    varPText:                   'Varp',
    stdDevText:                 'StdDev',
    stdDevPText:                'StdDevp',

    sortAscText:                'Sort A to Z',
    sortDescText:               'Sort Z to A',
    sortClearText:              'Disable sorting',
    clearFilterText:            'Clear filter from "{0}"',
    labelFiltersText:           'Label filters',
    valueFiltersText:           'Value filters',
    equalsText:                 'Equals...',
    doesNotEqualText:           'Does not equal...',
    beginsWithText:             'Begins with...',
    doesNotBeginWithText:       'Does not begin with...',
    endsWithText:               'Ends with...',
    doesNotEndWithText:         'Does not end with...',
    containsText:               'Contains...',
    doesNotContainText:         'Does not contain...',
    greaterThanText:            'Greater than...',
    greaterThanOrEqualToText:   'Greater than or equal to...',
    lessThanText:               'Less than...',
    lessThanOrEqualToText:      'Less than or equal to...',
    betweenText:                'Between...',
    notBetweenText:             'Not between...',
    top10Text:                  'Top 10...',

    equalsLText:                'equals',
    doesNotEqualLText:          'does not equal',
    beginsWithLText:            'begins with',
    doesNotBeginWithLText:      'does not begin with',
    endsWithLText:              'ends with',
    doesNotEndWithLText:        'does not end with',
    containsLText:              'contains',
    doesNotContainLText:        'does not contain',
    greaterThanLText:           'is greater than',
    greaterThanOrEqualToLText:  'is greater than or equal to',
    lessThanLText:              'is less than',
    lessThanOrEqualToLText:     'is less than or equal to',
    betweenLText:               'is between',
    notBetweenLText:            'is not between',
    top10LText:                 'Top 10...',
    topOrderTopText:            'Top',
    topOrderBottomText:         'Bottom',
    topTypeItemsText:           'Items',
    topTypePercentText:         'Percent',
    topTypeSumText:             'Sum',

    baseCls:            Ext.baseCSSPrefix + 'pivot-grid-config-column',
    btnIconCls:         Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-image',
    setFilterIconCls:   Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-filter-set',
    clearFilterIconCls: Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-filter-clear',
    ascSortIconCls:     Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-sort-asc',
    descSortIconCls:    Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-sort-desc',
    clearSortIconCls:   Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-sort-clear',

    /**
     * Fires when user changes sorting on this field
     *
     * @event sortchange
     * @param {Ext.pivot.plugin.configurator.Column} col
     * @param {String} direction
     * @private
     */

    /**
     * Fires when user changes the filter on this field
     *
     * @event filterchange
     * @param {Ext.pivot.plugin.configurator.Column} col
     * @param {Object} filter
     * @private
     */


    destroy: function(){
        var me = this;

        Ext.destroyMembers(me, 'relayers', 'menu');
        me.dimension = me.relayers = me.menu = null;

        me.callParent(arguments);
    },

    initRenderData: function() {
        var me = this;

        return Ext.apply(me.callParent(arguments), {
            header:         me.dimension.header,
            aggregator:     me.isAgg ? ' (' + me.dimension.aggregator + ')' : '',
            dimension:      me.dimension,
            isCustomizable: me.isCustomizable
        });
    },

    afterRender: function(){
        var me = this;

        me.callParent();

        if(me.isCustomizable){
            if( !me.isAgg && ( !Ext.isDefined(me.dimension.sortable) || me.dimension.sortable) ){
                me.addSortCls(me.dimension.direction);
            }

            if(me.dimension.filter){
                me.addFilterCls();
            }

            me.mon(me.getTargetEl(), {
                scope: me,
                click: me.handleColClick
            });
        }

    },

    handleColClick: function(e, t){
        // handles grid column sorting
        var me = this;

        if(me.isAgg){
            me.showAggMenu();
            e.stopEvent();
        }else{
            me.showColMenu();
        }
    },

    handleMenuClick: function(item, e){
        var me = this,
            method;

        me.dimension.aggregator = item.aggregator;
        if(me.textCol){
            method = me.textCol.setHtml ? 'setHtml' : 'setHTML';
            me.textCol[method](me.header + ' (' + me.dimension.aggregator + ')');
        }
        me.ownerCt.updateLayout();
        me.fireEvent('configchange');
    },

    addSortCls: function(direction){
        var me = this;

        if(!me.sortCol){
            return;
        }

        if(direction === 'ASC' || !direction){
            me.sortCol.addCls(me.ascSortIconCls);
            me.sortCol.removeCls(me.descSortIconCls);
        }else{
            me.sortCol.addCls(me.descSortIconCls);
            me.sortCol.removeCls(me.ascSortIconCls);
        }
        me.sortCol.addCls(me.btnIconCls);
    },

    removeSortCls: function(direction){
        var me = this;

        if(!me.sortCol){
            return;
        }

        if(direction === 'ASC'){
            me.sortCol.removeCls(me.ascSortIconCls);
        }else{
            me.sortCol.removeCls(me.descSortIconCls);
        }
        me.sortCol.removeCls(me.btnIconCls);

    },

    addFilterCls: function(){
        var me = this;

        if(me.filterCol && !me.filterCol.hasCls(me.setFilterIconCls)){
            me.filterCol.addCls(me.setFilterIconCls);
            me.filterCol.addCls(me.btnIconCls);
        }
    },

    removeFilterCls: function(){
        var me = this;

        if(me.filterCol){
            me.filterCol.removeCls(me.setFilterIconCls);
            me.filterCol.removeCls(me.btnIconCls);
        }
    },

    serialize: function(){
        var me = this;

        return Ext.applyIf({
            idColumn:       me.id
        }, me.initialConfig);
    },

    showAggMenu: function(){
        var me = this,
            aggregator = me.dimension.aggregator;

        //create a menu with possible aggregate functions
        Ext.destroy(me.menu);
        me.menu = Ext.create('Ext.menu.Menu', {
            floating:   true,
            defaults: {
                handler:    me.handleMenuClick,
                scope:      me,
                xtype:      'menucheckitem',
                group:      'aggregator'
            },
            items: [{
                text:       me.sumText,
                aggregator: 'sum',
                checked:    aggregator == 'sum'
            },{
                text:       me.avgText,
                aggregator: 'avg',
                checked:    aggregator == 'avg'
            },{
                text:       me.countText,
                aggregator: 'count',
                checked:    aggregator == 'count'
            },{
                text:       me.maxText,
                aggregator: 'max',
                checked:    aggregator == 'max'
            },{
                text:       me.minText,
                aggregator: 'min',
                checked:    aggregator == 'min'
            },{
                text:       me.groupSumPercentageText,
                aggregator: 'groupSumPercentage',
                checked:    aggregator == 'groupSumPercentage'
            },{
                text:       me.groupCountPercentageText,
                aggregator: 'groupCountPercentage',
                checked:    aggregator == 'groupCountPercentage'
            },{
                text:       me.stdDevText,
                aggregator: 'stdDev',
                checked:    aggregator == 'stdDev'
            },{
                text:       me.stdDevPText,
                aggregator: 'stdDevP',
                checked:    aggregator == 'stdDevP'
            },{
                text:       me.varText,
                aggregator: 'variance',
                checked:    aggregator == 'variance'
            },{
                text:       me.varPText,
                aggregator: 'varianceP',
                checked:    aggregator == 'varianceP'
            }]
        });
        me.menu.showBy(me);
    },

    showColMenu: function(){
        var me = this,
            items = [],
            labelItems, valueItems, commonItems, i,
            filter = me.dimension.filter;

        Ext.destroy(me.menu);

        // check if the dimension is sortable
        items.push({
            text:       me.sortAscText,
            direction:  'ASC',
            iconCls:    me.ascSortIconCls,
            handler:    me.sortMe
        }, {
            text:       me.sortDescText,
            direction:  'DESC',
            iconCls:    me.descSortIconCls,
            handler:    me.sortMe
        }, {
            text:       me.sortClearText,
            direction:  '',
            disabled:   me.dimension.sortable === false,
            iconCls:    me.clearSortIconCls,
            handler:    me.sortMe
        },{
            xtype:  'menuseparator'
        });

        commonItems = [{
            text:       me.equalsText,
            operator:   '='
        },{
            text:       me.doesNotEqualText,
            operator:   '!='
        },{
            xtype:  'menuseparator'
        },{
            text:       me.greaterThanText,
            operator:   '>'
        },{
            text:       me.greaterThanOrEqualToText,
            operator:   '>='
        },{
            text:       me.lessThanText,
            operator:   '<'
        },{
            text:       me.lessThanOrEqualToText,
            operator:   '<='
        },{
            xtype:  'menuseparator'
        },{
            text:       me.betweenText,
            operator:   'between'
        },{
            text:       me.notBetweenText,
            operator:   'not between'
        }];

        labelItems = Ext.clone(commonItems);
        Ext.Array.insert(labelItems, 3, [{
            text:       me.beginsWithText,
            operator:   'begins'
        },{
            text:       me.doesNotBeginWithText,
            operator:   'not begins'
        },{
            text:       me.endsWithText,
            operator:   'ends'
        },{
            text:       me.doesNotEndWithText,
            operator:   'not ends'
        },{
            xtype:  'menuseparator'
        },{
            text:       me.containsText,
            operator:   'contains'
        },{
            text:       me.doesNotContainText,
            operator:   'not contains'
        },{
            xtype:  'menuseparator'
        }]);

        for(i = 0; i < labelItems.length; i++){
            labelItems[i]['checked'] = (filter && filter.type == 'label' && filter.operator == labelItems[i].operator);
        }

        valueItems = Ext.clone(commonItems);
        valueItems.push({
            xtype:  'menuseparator'
        },{
            text:       me.top10Text,
            operator:   'top10'
        });

        for(i = 0; i < valueItems.length; i++){
            valueItems[i]['checked'] = (filter && filter.type == 'value' && filter.operator == valueItems[i].operator);
        }

        items.push({
            text:       Ext.String.format(me.clearFilterText, me.header),
            iconCls:    me.clearFilterIconCls,
            disabled:   !filter,
            handler:    me.onRemoveFilter
        },{
            text:   me.labelFiltersText,
            menu: {
                defaults: {
                    handler:    me.onShowFilter,
                    scope:      me,
                    xtype:      'menucheckitem',
                    group:      'filterlabel',
                    type:       'label'
                },
                items: labelItems
            }
        },{
            text:   me.valueFiltersText,
            menu: {
                defaults: {
                    handler:    me.onShowFilter,
                    scope:      me,
                    xtype:      'menucheckitem',
                    group:      'filtervalue',
                    type:       'value'
                },
                items: valueItems
            }
        });

        me.menu = Ext.create('Ext.menu.Menu', {
            floating:   true,
            defaults: {
                scope:      me
            },
            items: items
        });
        me.menu.showBy(me);
    },

    sortMe: function(btn){
        var me = this;

        if(Ext.isEmpty(btn.direction)){
            //disable sorting
            me.dimension.sortable = false;
            me.removeSortCls(me.dimension.direction);
        }else{
            me.dimension.sortable = true;
            me.addSortCls(btn.direction);
            me.dimension.direction = btn.direction;
        }
        me.fireEvent('sortchange', me, btn.direction);
    },

    onShowFilter: function(btn){
        var me = this,
            win, winClass, winCfg = {}, data, dataAgg,
            filter = me.dimension.filter,
            values = {
                type:           btn.type,
                operator:       btn.operator,
                value:          (filter ? filter.value : ''),
                from:           (filter ? (Ext.isArray(filter.value) ? filter.value[0] : '') : ''),
                to:             (filter ? (Ext.isArray(filter.value) ? filter.value[1] : '') : ''),
                caseSensitive:  (filter ? filter.caseSensitive : false),
                topSort:        (filter ? filter.topSort : false)
            };

        dataAgg = [];
        Ext.each(me.ownerCt.aggregateDimensions, function(field){
            dataAgg.push([field.header, field.id]);
        });

        if(btn.type == 'label' || (btn.type == 'value' && btn.operator != 'top10')){
            data = [
                [me.equalsLText, '='],
                [me.doesNotEqualLText, '!='],
                [me.greaterThanLText, '>'],
                [me.greaterThanOrEqualToLText, '>='],
                [me.lessThanLText, '<'],
                [me.lessThanOrEqualToLText, '<='],
                [me.betweenLText, 'between'],
                [me.notBetweenLText, 'not between']
            ];

            if(btn.type == 'label'){
                Ext.Array.insert(data, 3, [
                    [me.beginsWithLText, 'begins'],
                    [me.doesNotBeginWithLText, 'not begins'],
                    [me.endsWithLText, 'ends'],
                    [me.doesNotEndWithLText, 'not ends'],
                    [me.containsLText, 'contains'],
                    [me.doesNotContainLText, 'not contains']
                ]);
                winClass = 'Ext.pivot.plugin.configurator.FilterLabelWindow';
            }else{
                winClass = 'Ext.pivot.plugin.configurator.FilterValueWindow';
                Ext.apply(values, {
                    dimensionId:    (filter ? filter.dimensionId : '')
                });

                winCfg.storeAgg = Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:   dataAgg
                });
            }

            winCfg.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['text', 'value'],
                data:   data
            });
        }else{
            winClass = 'Ext.pivot.plugin.configurator.FilterTopWindow';
            data = [];

            Ext.apply(winCfg, {
                storeTopOrder: Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:[
                        [me.topOrderTopText, 'top'],
                        [me.topOrderBottomText, 'bottom']
                    ]
                }),
                storeTopType: Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:[
                        [me.topTypeItemsText, 'items'],
                        [me.topTypePercentText, 'percent'],
                        [me.topTypeSumText, 'sum']
                    ]
                }),
                storeAgg: Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:   dataAgg
                })
            });

            Ext.apply(values, {
                operator:       'top10',
                dimensionId:    (filter ? filter.dimensionId : ''),
                topType:        (filter ? filter.topType : 'items'),
                topOrder:       (filter ? filter.topOrder : 'top')
            });
        }

        win = Ext.create(winClass, Ext.apply(winCfg || {}, {
            title:      me.header,
            listeners: {
                filter: me.onApplyFilter,
                scope:  me
            }
        }));

        win.down('form').getForm().setValues(values);
        win.show();
    },

    onApplyFilter: function(win, filter){
        var me = this;

        filter.caseSensitive = (filter.caseSensitive === 'on');
        filter.topSort = (filter.topSort === 'on');
        win.close();
        me.addFilterCls();
        me.dimension.filter = filter;
        me.fireEvent('filterchange', me, filter);
    },

    onRemoveFilter: function(){
        var me = this;

        me.removeFilterCls();
        me.dimension.filter = null;
        me.fireEvent('filterchange', me, null);
    }


});
