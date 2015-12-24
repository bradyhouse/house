Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.Panel'
    ],
    constructor() {
        var config = {};
        config.items = this.buildItems();
        config.scrollable = true;
        this.callParent([config]);
    },
    privates: {
        buildItems: function() {
            var i = 1,
                items = [];
            for (; i <= 10; i++) {
                items.push({
                    xtype: 'dummypanel',
                    title: i == 10 ? 'MouseOver the tool buttons =>' : null,
                    collapsed: i > 3 ? true : false,
                });
            }
            return items;
        }
    }
});
