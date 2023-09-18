<template>
<div class="scrollable">
    <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs" @grid-ready="onGridReady" :defaultColDef="defaultColDef" :rowData="rowData" :rowHeight="rowHeight" :rowDataChanged="onRowDataChanged" :popupParent="popupParent"></ag-grid-vue>
</div>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {
    ClientSideRowModelModule
} from '@ag-grid-community/client-side-row-model'
import 'ag-grid-enterprise'
import {
    ModuleRegistry
} from '@ag-grid-community/core'

ModuleRegistry.registerModules([
    ClientSideRowModelModule
])

import ScaleRenderer from '../components/ScaleRenderer.vue'

import Api from '../Api'

const api = new Api();

import {
    AgGridVue
} from 'ag-grid-vue3';

export default {
    name: 'FiddleView',
    components: {
        'ag-grid-vue': AgGridVue,
        'scaleRenderer': ScaleRenderer
    },
    data: () => {
        return {
            popupParent: null,
            columnDefs: [{
                    field: 'change',
                    headerName: 'Default Sparkline',
                    cellRenderer: 'agSparklineCellRenderer',
                    valueGetter: (params) => {
                        const elements = params.data[params.colDef.field]
                        const series = elements.map((element) => {
                            return [new Date(element[0]), element[1]]
                        })
                        return series
                    },

                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'line',
                            axis: {
                                type: 'time'
                            },

                            /*jmarker: {
                                formatter: (params) => {
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
                                        palette.green;

                                    if (last) return null

                                    return {
                                        size: highlighted || first || max || min ? 5 : 3,
                                        fill: color,
                                        stroke: color,
                                    }
                                }
                            },*/
                        },
                    },
                },

                {
                    field: 'scale',
                    headerName: 'Scale',
                    maxWidth: 200,
                    editable: true,
                    cellRenderer: 'scaleRenderer',
                    cellEditorPopup: true,
                    cellEditorParams: {
                        cellRenderer: 'scaleRenderer',
                        cellEditorPopup: true,
                    },
                },
                {
                    field: 'change',
                    headerName: 'Scaled Sparkline',
                    suppressCellFlash: true,
                    cellRenderer: 'agSparklineCellRenderer',
                    //valueGetter: scaledValues,
                    valueGetter: (params) => {
                        const elements = params.data[params.colDef.field]
                        const series = elements.map((element) => {
                            return [new Date(element[0]), element[1]]
                        })
                        let index = params.data[params.colDef.field].length - 1
                        let maxDate = new Date(series[index][0])
                        //add a gap
                        series.push([maxDate, null])
                        //add fixed scaling point
                        series.push([maxDate, params.data.scale])
                        return series
                    },
                    enableCellChangeFlash: true,
                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'line',
                            axis: {
                                type: 'time'
                            },
                            /*tooltip: {
                                renderer: (params) => {
                                    const {
                                        xValue,
                                        yValue
                                    } = params
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
                            },*/
                            /*marker: {
                                formatter: (params) => {
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
                                        palette.green;

                                    if (last) return null

                                    return {
                                        size: highlighted || first || max || min ? 5 : 3,
                                        fill: color,
                                        stroke: color,
                                    }
                                }
                            },
                            padding: {
                                top: 10,
                                right: 0,
                                bottom: 10,
                                left: 0
                            },*/
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
                sortable: true,
                suppressMenu: true
            },
            rowData: null,
            rowHeight: null
        }
    },

    created() {
        const rawData = api.getTimeSeries()
        this.rowData = rawData.map(item => {
            return Object.assign({}, item, {
                value: [0, 1]
            })
        })
        this.rowHeight = 75
        this.popupParent = document.querySelector('body');
    },
    methods: {

        getScaledSparklineParams(column) {
            const {
                marker,
                tooltip,
                ...sparklineBaseOptions
            } = (column.sparkline.config || {})
            return {
                sparklineOptions: {
                    type: column.sparkline.chart_type,
                    tooltip: {
                        renderer: (params) => {
                            const {
                                xValue,
                                yValue
                            } = params
                            const tag = String([xValue, yValue])
                            if (this.sparklineHiddenValues.indexOf(tag) !== -1) {
                                return {
                                    title: 'Scale:',
                                    content: yValue,
                                }
                            }
                            return tooltip || {
                                title: xValue,
                                content: yValue,
                            }
                        },
                    },
                    marker: {
                        formatter: (params) => {
                            const {
                                xValue,
                                yValue
                            } = params
                            const tag = String([xValue, yValue])
                            if (this.sparklineHiddenValues.indexOf(tag) !== -1) {
                                return {
                                    size: 0,
                                    fill: 'rgba(255, 99, 71, 0)', //transparent
                                    stroke: 'rgba(255, 99, 71, 0)', //transparent
                                    strokeWidth: 0,
                                }
                            }
                            return marker
                        }
                    },
                    ...sparklineBaseOptions
                }
            }
        },

        onGridReady(params) {
            window.gridApi = params.api
            window.gridColumnApi = params.columnApi
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridApi.sizeColumnsToFit()
            })
        },

    }

    ,

}

const palette = {
    blue: 'rgb(20,94,140)',
    lightBlue: 'rgb(182,219,242)',
    green: 'rgb(63,141,119)',
    lightGreen: 'rgba(75,168,142, 0.2)',
}
</script>

<style scoped>
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.scrollable {
    min-width: calc(100%);
    min-height: calc(100%);

}

@media(max-width:350px) {
    .scrollable {
        min-width: calc(100%);
        height: 100vh;
        width: 100vw;
    }
}
</style>
