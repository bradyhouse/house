Ext.define('FiddleTooltipMixin', {
    extend: 'Ext.Mixin',
    isFiddleTooltipMixin: true,
    mixinConfig: {
        id: 'FiddleToolTip',
        after: {
            init: 'init'
        }
    },
    init: function () {
        this.listen({
            component: {
                fiddletooltip: {
                    beforeshow: 'onBeforeShow'
                }
            }
        })
    },
    onBeforeShow: function (tip) {
        var columns = tip.view.ownerGrid.columns,
            record = tip.view.getRecord(tip.triggerElement.parentNode),
            tooltipValue = this.table(columns, record, this);
        tip.update(tooltipValue);
    },
    privates: {
        tr: function (label, value) {
            return '<tr><td>' + label + ':&nbsp;</td><td>' + value + '</td></tr>';
        },
        table: function (columns, record, scope) {
            var html = '<table width="100%">';
            columns.forEach(function (column) {
                html += scope.tr(column.text, record.get(column.dataIndex));
            });
            return html + '</table>';
        }
    }
});
