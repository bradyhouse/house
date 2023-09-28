<template>
<div ref="GridContainer" class="scrollable">
    <div id="base-card" :style="cssVars">
        <ag-grid-vue style="width: 100%; height: 100%;"  class="ag-theme-alpine" :columnDefs="columnDefs" 
        @grid-ready="onGridReady" 
        :defaultColDef="defaultColDef" :rowData="rowData"></ag-grid-vue>
    </div>
   
</div>
</template>
<script lang="ts">
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    AgGridVue
} from 'ag-grid-vue3';
import ResizeObserver from 'resize-observer-polyfill';
import { ref, reactive, nextTick } from "vue";

const numberToPixels = (value: number): string => {
	return value.toString(10) + "px";
};




export default {
    name: 'GridComponent',
    components: {
        'ag-grid-vue': AgGridVue
    },
    props: ['gridHeight', 'id'],
    data: () => {
        return {
            boxObserver: null,
            boxWidth: null,
            boxHeight: null,
            columnDefs: [{
                    field: 'athlete',
                    minWidth: 150,
                    filter: 'PersonFilter'
                },
                {
                    field: 'age',
                    filter: 'agNumberColumnFilter'
                },
                {
                    field: 'country',
                    minWidth: 150
                },
                {
                    field: 'year',
                    filter: 'agNumberColumnFilter'
                },
                {
                    field: 'date',
                    minWidth: 130,
                    filter: 'agDateColumnFilter',
                    filterParams: {
                        comparator: (filterLocalDateAtMidnight, cellValue) => {
                            const dateAsString = cellValue;
                            const dateParts = dateAsString.split('/');
                            const cellDate = new Date(
                                Number(dateParts[2]),
                                Number(dateParts[1]) - 1,
                                Number(dateParts[0])
                            );
                            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                                return 0;
                            }
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            }
                            if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            }
                        },
                    },
                },
                {
                    field: 'sport'
                },
                {
                    field: 'gold',
                    filter: 'agNumberColumnFilter'
                },
                {
                    field: 'silver',
                    filter: 'agNumberColumnFilter'
                },
                {
                    field: 'bronze',
                    filter: 'agNumberColumnFilter'
                },
                {
                    field: 'total',
                    filter: 'agNumberColumnFilter'
                },
            ],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
                editable: true,
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true,
            },
            rowData: null,
        };
    },
    computed: {
      cssVars () {
        return {
            '--card-height': this.boxHeight
        }       
      }
    }, 

    setup() {
        const GridContainer = ref(null)
        // ...
        return {
            GridContainer
        }
    },

    mounted() {
        const box = this.$refs.GridContainer as HTMLElement
        const boxSize = box.getBoundingClientRect()
        this.boxWidth = boxSize.width + 'px'
        this.boxHeight = boxSize.height + 'px'
        
        this.initObserver()

        const ro = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const {left, top, width, height} = entry.contentRect;    
                this.boxHeight = numberToPixels(height)

            }
        });

        nextTick(() => {
            if (this.GridContainer) {
            const el = this.GridContainer as HTMLElement
            ro.observe(el)   
        }
        })

    },
    beforeDestroy() {
      if (this.boxObserver) 
        this.boxObserver.disconnect()
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            this.columnApi = params.columnApi;
            const updateData = (data) => {
                this.rowData = data;
            };
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then((resp) => resp.json())
                .then((data) => updateData(data));
        },
        onRowDataChanged() {
            nextTick(() => {
                this.gridApi.sizeColumnsToFit();
            });
        },
        initObserver() {
            const config = {
                attributes: true,
            },
            vm = this

            // create the observer
            const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // check if the mutation is attributes and
                // update the width and height data if it is.
                if (mutation.type === 'attributes') {
                // call resize handler on mutation
                vm.onResize()
                }
            })
            })
            // observe element's specified mutations
            observer.observe(this.$refs.GridContainer, config)
            // add the observer to data so we can disconnect it later
            this.boxObserver = observer
        },
        onResize() {
            const box = this.$refs.GridContainer
            vm = this
            let { width, height } = box.style
            debugger
            this.boxWidth = width
            this.boxHeight = height
            // Optionally, emit event with dimensions
            this.$emit('resize', { width, height })
      },
    },
};

const palette = {
    blue: 'rgb(20,94,140)',
    lightBlue: 'rgb(182,219,242)',
    green: 'rgb(63,141,119)',
    lightGreen: 'rgba(75,168,142, 0.2)',
};
</script>
  
  
<style scoped>

#base-card{
    height: var(--card-height);
}

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}

.scrollable {
    box-sizing: border-box;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden !important;
      background: black;
}

@media (max-width: 350px) {
    .scrollable {
        min-width: calc(100%);
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
}
</style>
