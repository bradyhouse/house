Ext.define('FiddleTooltipController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddletooltip',
    isFiddleTooltip: true,
    mixins: [
        'FiddleTooltipMixin'
    ]
});
