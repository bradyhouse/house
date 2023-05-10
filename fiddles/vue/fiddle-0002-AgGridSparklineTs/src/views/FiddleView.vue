<template>
<div style="height: 100%; width: 100%;">
    <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs" @grid-ready="onGridReady" :defaultColDef="defaultColDef" :rowData="rowData" :rowHeight="rowHeight" :animateRows="true" :rowDataChanged="onRowDataChanged"></ag-grid-vue>
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
                    field: 'name',
                    minWidth: 250
                },
                {
                    field: 'change',
                    headerName: 'floor(Max-Min)',
                    maxWidth: 150,
                    cellRenderer: 'agSparklineCellRenderer',
                    valueGetter: (params) => {
                        const delta = parseDelta(params)
                        const per = Math.floor(delta)
                        return [per]
                    },
                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'bar',
                            valueAxisDomain: [0, 10],
                            label: {
                                enabled: true,
                                placement: 'outsideEnd',
                                formatter: (params) => {
                                    return `${params.value}`;
                                },
                                fontWeight: 'bold',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                            },
                            highlightStyle: {
                                strokeWidth: 0
                            },
                            padding: {
                                top: 5,
                                bottom: 5
                            },
                            formatter: barFormatter,
                        },
                    },
                }, {
                    field: 'change',
                    headerName: 'Sparkline',
                    cellRenderer: 'agSparklineCellRenderer',
                    cellStyle: cellStyle,
                    valueGetter: scaledValues,
                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'line',
                            xKey: 'xVal',
                            yKey: 'yVal',
                            axis: {
                                type: 'number'
                            },
                            marker: { formatter: lineMarkerFormatter },
                        },
                    },
                },

                {
                    field: 'volume',
                    type: 'numericColumn',
                    maxWidth: 140
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
        this.rowData = api.getData()
        this.rowHeight = 50;
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridApi.sizeColumnsToFit();
            });
        }

    },

}


window.barFormatter = function barFormatter(params) {
  const { yValue, highlighted } = params;
  if (highlighted) {
    return;
  }
  return { fill: yValue <= 50 ? palette.lightBlue : palette.blue };
};

window.scaledValues = function scaledValues(params) {
    const delta = parseDelta(params)
    let i = 0
    if (Math.floor(delta) <= 1) {
        return params.data.change.map((val, i) => [i, 1])
    } else {
        return params.data.change.map((val, i) => [i, val])
    }
}

window.parseDelta = function parseDelta(params) {
    const min = Math.min(...params.data.change)
    const max = Math.max(...params.data.change)
    return Math.abs(max - min)

}

window.numberToColor = function numberToColor(val) {
    if (val <= 1)
        return '#fff';
    else
        return '#aaffaa';
};

window.cellStyle = function cellStyle(params) {
    const delta = parseDelta(params)
    const color = numberToColor(Math.floor(delta))
    return {
        backgroundColor: color,
    };
};

window.lineMarkerFormatter = function lineMarkerFormatter(params) {
    const {
        first,
        last,
        min,
        max,
        highlighted
    } = params;
    const color = highlighted ?
        palette.blue :
        last ?
        palette.lightBlue :
        palette.green;
    if (first === last && min === max) 
        return {
            size: 0,
            fill: color,
            stroke: color
        }

    return {
        size: highlighted || first || last || max || min ? 5 : 0,
        fill: color,
        stroke: color,
    };
};

const palette = {
    blue: 'rgb(20,94,140)',
    lightBlue: 'rgb(182,219,242)',
    green: 'rgb(63,141,119)',
    lightGreen: 'rgba(75,168,142, 0.2)',
};
</script>

<style>
</style>
