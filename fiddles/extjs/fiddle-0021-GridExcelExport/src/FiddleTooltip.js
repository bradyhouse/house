Ext.define('FiddleTooltip', {
    extend: 'Ext.tip.ToolTip',
    alias: 'widget.fiddletooltip',
    requires: [
        'FiddleTooltipController'
    ],
    config: {
        controller: 'fiddletooltip',
        delegate: '.x-grid-cell',
        trackMouse: true
    }
});
