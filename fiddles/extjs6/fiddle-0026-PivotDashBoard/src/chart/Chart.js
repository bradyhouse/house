Ext.define('Fiddle.Chart', {
    extend: 'Ext.chart.CartesianChart',
    requires: [
        'Fiddle.ChartController'
    ],
    controller: 'fiddlechart',
    alias: 'widget.fiddlechart',
    store: fiddleStore,
    insetPadding: 40,
    axes: [{
        type: 'numeric',
        position: 'left',
        grid: true,
        fields: ['Buy', 'Sell'],
        label: {
            renderer: 'onAxisLabelRender'
        },
    }, {
        type: 'category',
        position: 'bottom',
        grid: true,
        fields: ['MemberFirmId'],
        label: {
            rotate: {
                degrees: -45
            }
        }
    }],
    series: [{
        type: 'bar',
        stacked: true,
        xField: 'MemberFirmId',
        yField: ['Buy', 'Sell'],
        style: {
            opacity: 0.80
        },
        highlightCfg: {
            opacity: 1,
            strokeStyle: 'black'
        }
        /*tooltip: {
            trackMouse: true,
            renderer: 'onSeriesTooltipRender'
        }*/
    }]
})
