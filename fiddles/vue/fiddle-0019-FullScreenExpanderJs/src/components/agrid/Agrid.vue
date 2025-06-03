<template>
  <div class="scrollable" ref="el">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      multiSortKey="ctrl"
      class="ag-theme-alpine"
      :detailRowAutoHeight="true"
      :columnDefs="columnDefs"
      :copyHeadersToClipboard="true"
      :suppressCopyRowsToClipboard="true"
      :enableRangeSelection="true"
      :enableCellTextSelection="true"
      :ensureDomOrder="true"
      :suppressServerSideInfiniteScroll="false"
      :components="components"
      :context="context"
      @grid-ready="onGridReady"
    />
  </div>
</template>
<script>
import { nextTick, ref } from 'vue'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import useElementSizeMixin from '../../mixins/elementSizeMixin'
import { ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import AgridContextLinkRenderer from './AgridContextLinkRenderer.vue'
import Api from '../../Api'



export default {
  components: {
    AgGridVue
  },
  data() {
    return {
      gridApi: null,
      columnApi: null,
      components: {
        iconRenderer: AgridContextLinkRenderer
      },
      context: {
        componentParent: this
      },
      isLoaded: false
    }
  },

  methods: {
    onGridReady({ api, columnApi }) {
      this.gridApi = api
      this.columnApi = columnApi
      api.setGridOption('rowData', this.rowData)
      nextTick(() => {
        this.resizeColumns()
      })
    },
    showContextMenu(params, event) {
      const rowNode = params.node
      const column = params.column
      const gridElement = params.context.componentParent.el
      const rowElement = gridElement.querySelector(`[row-id="${rowNode.id}"]`)
      const cellElement = rowElement.querySelector(`[col-id="${column.getId()}"]`)
      const cellRect = cellElement.getBoundingClientRect()
      const adjustedEvent = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: cellRect.left,
        clientY: cellRect.bottom
      })
      cellElement.dispatchEvent(adjustedEvent)
    },

    resizeColumns() {
      const fieldIds = this.columnDefs.filter((cd) => !cd.width).map((cd) => cd.field)
      if (this.columnApi) {
        this.columnApi.autoSizeColumns(fieldIds)
      }
    }
  },
  setup() {

    ModuleRegistry.registerModules([
      ClientSideRowModelModule
    ])
    const elGrid = ref(null)
    const api = new Api()
    const rowData = api.getMockData()
    const columnDefs = api.getMockSchema().map((field) => {
      return {
        headerName: field.replace('_', ' '),
        field: field
      }
    })
    const { el, elWidth, elHeight } = useElementSizeMixin()



    return {
      elGrid,
      el,
      elWidth,
      elHeight,
      rowData,
      columnDefs
    }
  }
}
</script>
<style scoped>
.scrollable {
  width: v-bind(elWidth);
  height: v-bind(elHeight);
  min-height: 300px;
}
.ag-theme-alpine {
  --ag-borders: none;
}
</style>
