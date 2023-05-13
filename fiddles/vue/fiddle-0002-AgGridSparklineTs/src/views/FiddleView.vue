<template>
<div style="height: 100%; width: 100%;">
    <ag-grid-vue style="width: 100%; height: 100%;" 
    class="ag-theme-alpine" :columnDefs="columnDefs" @grid-ready="onGridReady" 
    :defaultColDef="defaultColDef" :rowData="rowData" :rowHeight="rowHeight" :animateRows="true" :rowDataChanged="onRowDataChanged"></ag-grid-vue>
</div>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import Api from '../Api';

const api = new Api();

import {
    AgGridVue
} from 'ag-grid-vue3';

export default {
    name: 'FiddleView',
    components: {
        'ag-grid-vue': AgGridVue
    },
    data: () => {
        return {
            columnDefs: [{
                    field: 'symbol',
                    maxWidth: 120
                },
                {
                    field: 'change',
                    headerName: 'Default',
                    cellRenderer: 'agSparklineCellRenderer',
                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'line',
                            xKey: 'xVal',
                            yKey: 'yVal',
                            axis: {
                                type: 'number'
                            },
                            marker: {
                                formatter: lineMarkerFormatter
                            },
                            padding: {
                                top: 10,
                                right: 0,
                                bottom: 10,
                                left: 0
                            },
                        },
                    },
                },
                {
                    field: 'scale',
                    headerName: 'Scale',
                    type: 'numericColumn',
                    maxWidth: 100,
                    editable: true,
                    valueSetter: onScaleChange

                },
                {
                    field: 'change',
                    headerName: 'Scaled',
                    cellRenderer: 'agSparklineCellRenderer',
                    cellStyle: cellStyle,
                    valueGetter: scaledValues,
                    enableCellChangeFlash: true,
                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'line',
                            xKey: 'xVal',
                            yKey: 'yVal',
                            axis: {
                                type: 'number'
                            },
                            tooltip: {
                                renderer: tooltipRenderer
                            },
                            marker: {
                                formatter: lineMarkerFormatter
                            },
                            padding: {
                                top: 10,
                                right: 0,
                                bottom: 10,
                                left: 0
                            },
                        },
                    },
                },

            ],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                resizable: true,
                sortable: true
            },
            rowData: null,
            rowHeight: null
        }
    },
    created() {
        const rawData = api.getData()
        this.rowData = rawData.map(item => {
            return Object.assign({}, item, {
                scale: 10
            })
        })
        this.rowHeight = 50
    },
    methods: {

        onGridReady(params) {
            window.gridApi = params.api
            window.gridColumnApi = params.columnApi
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridApi.sizeColumnsToFit()
            })
        }

    },

}

window.onScaleChange = function onScaleChange(params) {
    if (isNaN(params.newValue)) return false
    const index = params.node.rowIndex
    const row = gridApi.getDisplayedRowAtIndex(index)
    row.data.scale = params.newValue
    window.setTimeout(()=> {
        gridApi.refreshCells({ force: true, rowNodes: [row]  })
    }, 500)

    return true;
}
window.scaledValues = function scaledValues(params) {
    const delta = parseDelta(params)
    let index = params.data.change.length
    const scaledChange = params.data.change.map((val, i) => [i, val])
    //add a gap
    scaledChange.push([index, null])
    //add fixed scaling point
    scaledChange.push([index++, params.data.scale])
    return scaledChange
}

window.parseDelta = function parseDelta(params) {
    const min = Math.min(...params.data.change)
    const max = Math.max(...params.data.change)
    return Math.abs(max - min)

}

window.tooltipRenderer = (params) => {
    const delta = parseDelta(params.context);
    const {
        xValue,
        yValue
    } = params;
    if (xValue === 12)
        return {
            title: 'Scale:',
            content: yValue
        }

    return {
        title: null,
        content: yValue
    }
}

window.numberToColor = function numberToColor(val) {
    if (val <= 1)
        return '#fff'
    else
        return '#aaffaa'
}

window.cellStyle = function cellStyle(params) {
    const delta = parseDelta(params)
    const color = numberToColor(Math.floor(delta))
    return {
        backgroundColor: color,
    }
}

window.lineMarkerFormatter = function lineMarkerFormatter(params) {
    const {
        first,
        last,
        min,
        max,
        highlighted
    } = params
    const color = highlighted ?
        palette.blue :
        last ?
        palette.lightBlue :
        palette.green


    if (Math.floor(params.datum.point.x) >= 11)
        return {

        }

    return {
        size: highlighted || first || max || min ? 5 : 3,
        fill: color,
        stroke: color,
    }
}

const palette = {
    blue: 'rgb(20,94,140)',
    lightBlue: 'rgb(182,219,242)',
    green: 'rgb(63,141,119)',
    lightGreen: 'rgba(75,168,142, 0.2)',
}
</script>

<style>
</style>
