Ext.define('Fiddle.Tooltip', {
    extend: 'Ext.tip.ToolTip',
    alias: 'widget.fiddletooltip',
    html: 'Smart tooltip',
    listeners: {
        beforeshow: function(tooltip) {
             console.log('beforeshow');

        }
    }
});
