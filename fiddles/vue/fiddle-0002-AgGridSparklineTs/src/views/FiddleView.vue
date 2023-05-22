<template>
<div class="scrollable">
    <ag-grid-vue style="width: 100%; height: 100%;" 
    class="ag-theme-alpine" 
    :columnDefs="columnDefs"
     @grid-ready="onGridReady" 
     :defaultColDef="defaultColDef" 
     :getMainMenuItems="getMainMenuItems" 
     :postProcessPopup="postProcessPopup" 
     :rowData="rowData" 
     :rowHeight="rowHeight" 
     :rowDataChanged="onRowDataChanged"
     :popupParent="popupParent"
     ></ag-grid-vue>
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
            contextMenu: {
                enabled: true,
            },
            postProcessPopup: null,
            popupParent: null,
            columnDefs: [{
                    field: 'change',
                    headerName: 'Default Sparkline',
                    cellRenderer: 'agSparklineCellRenderer',
                    cellRendererParams: {
                        sparklineOptions: {
                            type: 'line',
                            xKey: 'xVal',
                            yKey: 'yVal',
                            axis: {
                                type: 'number'
                            },

                            padding: {
                                top: 10,
                                right: 0,
                                bottom: 10,
                                left: 0
                            },

                            marker: {
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
                        let index = params.data[params.colDef.field].length
                        const scaledChange = params.data[params.colDef.field].map((val, i) => [i, val])
                        //add a gap
                        scaledChange.push([index, null])
                        //add fixed scaling point
                        scaledChange.push([index++, params.data.scale])
                        return scaledChange
                    },
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
                            },
                            marker: {
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
                sortable: true,
                suppressMenu: true
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
        this.rowHeight = 75
        this.popupParent = document.querySelector('body');
        this.postProcessPopup = (params) => {
            // check callback is for menu
            if (params.type !== 'columnMenu') {
                return;
            }
            const columnId = params.column ? params.column.getId() : undefined;
            if (columnId === 'gold') {
                const ePopup = params.ePopup;
                let oldTopStr = ePopup.style.top;
                // remove 'px' from the string (AG Grid uses px positioning)
                oldTopStr = oldTopStr.substring(0, oldTopStr.indexOf('px'));
                const oldTop = parseInt(oldTopStr);
                const newTop = oldTop + 25;
                ePopup.style.top = newTop + 'px';
            }
        };
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
        },
        getMainMenuItems(params) {
            // you don't need to switch, we switch below to just demonstrate some different options
            // you have on how to build up the menu to return
            switch (params.column.getId()) {
                // return the defaults, put add some extra items at the end
                case 'change':
                    const athleteMenuItems = params.defaultItems.slice(0);
                    athleteMenuItems.push({
                        name: 'AG Grid Is Great',
                        action: () => {
                            console.log('AG Grid is great was selected');
                        },
                    });
                    athleteMenuItems.push({
                        name: 'Casio Watch',
                        action: () => {
                            console.log('People who wear casio watches are cool');
                        },
                    });
                    athleteMenuItems.push({
                        name: 'Custom Sub Menu',
                        subMenu: [{
                                name: 'Black',
                                action: () => {
                                    console.log('Black was pressed');
                                },
                            },
                            {
                                name: 'White',
                                action: () => {
                                    console.log('White was pressed');
                                },
                            },
                            {
                                name: 'Grey',
                                action: () => {
                                    console.log('Grey was pressed');
                                },
                            },
                        ],
                    });
                    return athleteMenuItems;
                    // return some dummy items
                case 'age':
                    return [{
                            // our own item with an icon
                            name: 'Joe Abercrombie',
                            action: () => {
                                console.log('He wrote a book');
                            },
                            icon: '<img src="https://www.ag-grid.com/example-assets/lab.png" style="width: 14px;" />',
                        },
                        {
                            // our own icon with a check box
                            name: 'Larsson',
                            action: () => {
                                console.log('He also wrote a book');
                            },
                            checked: true,
                        },
                        'resetColumns', // a built in item
                    ];
                    // return all the default items, but remove app separators and the two sub menus
                case 'country':
                    const countryMenuItems = [];
                    const itemsToExclude = ['separator', 'pinSubMenu', 'valueAggSubMenu'];
                    params.defaultItems.forEach((item) => {
                        if (itemsToExclude.indexOf(item) < 0) {
                            countryMenuItems.push(item);
                        }
                    });
                    return countryMenuItems;
                default:
                    // make no changes, just accept the defaults
                    return params.defaultItems;
            }
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
